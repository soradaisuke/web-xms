/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { upperFirst, isFunction } from 'lodash';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';
import RecordModal from '../components/RecordModal';

function generateService({ apiPath, mutable = {} }) {
  if (!apiPath) {
    throw new Error('dynamicRecords generateService: apiPath is required');
  }

  const service = {
    fetch: async ({ pageNum = 1, pageSize = 20 }) => (
      request.get(apiPath, { params: { pageNum, pageSize } })
    ),
  };

  if (mutable.create) {
    service.create = async ({ body }) => request.post(`${apiPath}`, { body });
  }

  if (mutable.patch) {
    service.patch = async ({ id, body }) => request.patch(`${apiPath}/${id}`, { body });
  }

  if (mutable.remove) {
    service.remove = async ({ id }) => request.remove(`${apiPath}/${id}`);
  }

  return service;
}

function generateModel({ service, namespace, mutable = {} }) {
  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }
  const model = {
    namespace,
    state: Immutable.fromJS({
      records: [],
      total: null,
      pageNum: null,
      pageSize: null,
    }),
    reducers: {
      save(state, {
        payload: {
          records, total, pageNum, pageSize,
        },
      }) {
        return state.merge(Immutable.fromJS({
          records, total, pageNum, pageSize,
        }));
      },
    },
    effects: {
      * fetch({ payload: { pageNum = 1, pageSize = 20 } }, { call, put }) {
        const { rooms, total } = yield call(service.fetch, { pageNum, pageSize });
        yield put({
          type: 'save',
          payload: {
            pageNum, pageSize, total, records: rooms,
          },
        });
      },
    },
  };

  if (mutable.create) {
    model.create = function* create({ payload: { body } }, { call }) {
      yield call(service.create, { body });
    };
  }

  if (mutable.patch) {
    model.patch = function* patch({ payload: { id, body } }, { call }) {
      yield call(service.patch, { id, body });
    };
  }

  if (mutable.remove) {
    model.remove = function* remove({ payload: { id } }, { call }) {
      yield call(service.remove, { id });
    };
  }

  return model;
}

function generateModal({ namespace, schema, mutable = {} }) {
  if (!mutable.create || !mutable.patch) {
    return null;
  }

  class Modal extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Modal`;

    static propTypes = {
      children: PropTypes.node.isRequired,
      record: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
      onOk: PropTypes.func.isRequired,
    };

    render() {
      const { children, onOk, record } = this.props;

      return (
        <RecordModal
          activator={children}
          record={record}
          schema={schema}
          onOk={onOk}
        />
      );
    }
  }

  return Modal;
}

function generateRecordsPage({
  namespace, schema, mutable = {}, Modal,
}) {
  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordsPage Modal={Modal} {...this.props} schema={schema} />
      );
    }
  }

  const mapStateToProps = state => ({
    records: state[namespace].get('records'),
    total: state[namespace].get('total'),
  });

  const mapDispatchToProps = (dispatch) => {
    const props = {
      fetch: async ({ pageNum, pageSize }) => dispatch({ type: `${namespace}/fetch`, payload: { pageNum, pageSize } }),
    };

    if (mutable.create) {
      props.create = async ({ body }) => dispatch({ type: `${namespace}/create`, payload: { body } });
    }

    if (mutable.patch) {
      props.patch = async ({ id, body }) => dispatch({ type: `${namespace}/patch`, payload: { id, body } });
    }

    if (mutable.remove) {
      props.remove = async ({ id }) => dispatch({ type: `${namespace}/remove`, payload: { id } });
    }

    return props;
  };

  return connect(mapStateToProps, mapDispatchToProps)(Page);
}

function generateDynamicRecordsComponent({ app, config }) {
  const service = generateService(config);
  const model = generateModel({ ...config, service });
  const Modal = generateModal(config);
  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () => Promise.resolve(generateRecordsPage({ ...config, Modal })),
  });
}

export default function dynamicRecordsComponent({ app, config }) {
  if (!app) {
    throw new Error('dynamicRecords: app is required');
  }
  if (!config) {
    throw new Error('dynamicRecords: config is required');
  }

  if (isFunction(config)) {
    return dynamic({
      app,
      resolve: () => config().then(c => generateDynamicRecordsComponent({ app, config: c.default || c })),
    });
  }

  return generateDynamicRecordsComponent({ app, config });
}
