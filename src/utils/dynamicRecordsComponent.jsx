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

function generateService({
  path, create, edit, remove,
} = {}) {
  if (!path) {
    throw new Error('dynamicRecordsComponent generateService: path is required');
  }

  const service = {
    fetch: async ({ page = 1, pagesize = 10, filter = {} }) => (
      request.get(path, {
        params: {
          page, pagesize, filter,
        },
      })
    ),
  };

  if (create) {
    service.create = async body => request.post(`${path}`, { body });
  }

  if (edit) {
    service.edit = async body => request.put(`${path}/${body.id}`, { body });
  }

  if (remove) {
    service.remove = async id => request.remove(`${path}/${id}`);
  }

  return service;
}

function generateModel({ service, namespace, api: { defaultFilter = {} } = {} }) {
  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }
  const model = {
    namespace,
    state: Immutable.fromJS({
      records: [],
      total: 0,
      page: 0,
      pagesize: 0,
    }),
    reducers: {
      save(state, {
        payload: {
          records, total, page, pagesize,
        },
      }) {
        return state.merge(Immutable.fromJS({
          records, total, page, pagesize,
        }));
      },
    },
    effects: {
      * fetch({
        payload: {
          page = 1, pagesize = 10, filter = {}, params,
        },
      }, { call, put }) {
        let f = filter;
        if (isFunction(defaultFilter)) {
          f = { ...f, ...defaultFilter(params) };
        } else if (defaultFilter) {
          f = { ...f, ...defaultFilter };
        }

        const { items: records, total } = yield call(service.fetch, {
          page, pagesize, filter: JSON.stringify(f),
        });
        yield put({
          type: 'save',
          payload: {
            page, pagesize, total, records,
          },
        });
      },
    },
  };

  if (service.create) {
    model.effects.create = function* create({ payload: { body } }, { call }) {
      yield call(service.create, body);
    };
  }

  if (service.edit) {
    model.effects.edit = function* edit({ payload: { body } }, { call }) {
      yield call(service.edit, body);
    };
  }

  if (service.remove) {
    model.effects.remove = function* remove({ payload: { id } }, { call }) {
      yield call(service.remove, id);
    };
  }

  return model;
}

function generateModal({ namespace, schema, api: { create, edit } }) {
  if (!create && !edit) {
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
  namespace, schema, api: { create, edit, remove }, Modal,
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
      fetch: async ({ page, pagesize, params }) => dispatch({ type: `${namespace}/fetch`, payload: { page, pagesize, params } }),
    };

    if (create) {
      props.create = async body => dispatch({ type: `${namespace}/create`, payload: { body } });
    }

    if (edit) {
      props.edit = async body => dispatch({ type: `${namespace}/edit`, payload: { body } });
    }

    if (remove) {
      props.remove = async id => dispatch({ type: `${namespace}/remove`, payload: { id } });
    }

    return props;
  };

  return connect(mapStateToProps, mapDispatchToProps)(Page);
}

function generateDynamicRecordsComponent({ app, config }) {
  const service = generateService(config.api);
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
      resolve: () => config().then(c => (
        generateDynamicRecordsComponent({ app, config: c.default || c })
      )),
    });
  }

  return generateDynamicRecordsComponent({ app, config });
}
