/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { upperFirst, isFunction, forEach } from 'lodash';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';
import RecordModal from '../components/RecordModal';

function generateService({ api: { path }, action: { create, edit, remove } = {} }) {
  if (!path) {
    throw new Error('dynamicRecordsComponent generateService: path is required');
  }

  const service = {
    fetch: async params => request.get(path, { params }),
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

function generateModel({
  namespace, api: { defaultFilter = {} } = {}, action: { create, edit, remove }, schema,
}, service) {
  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }
  let defaultSort;
  forEach(schema, (definition) => {
    if (definition.sort && definition.sort.default) {
      defaultSort = { key: definition.key, order: definition.sort.default };
    }
  });
  const model = {
    namespace,
    state: Immutable.fromJS({
      records: [],
      total: 0,
      page: 0,
      pagesize: 0,
      sort: defaultSort,
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
      saveSort(state, { payload: { key, order } }) {
        return state.set('sort', Immutable.fromJS({ key, order }));
      },
    },
    effects: {
      * fetch({
        payload: {
          page = 1, pagesize = 10, filter = {}, params,
        },
      }, { call, put, select }) {
        let f = filter;
        if (isFunction(defaultFilter)) {
          f = { ...f, ...defaultFilter(params) };
        } else if (defaultFilter) {
          f = { ...f, ...defaultFilter };
        }

        const { sort } = yield select(state => ({
          sort: state[namespace].get('sort'),
        }));

        const { items: records, total } = yield call(service.fetch, {
          page, pagesize, filter: JSON.stringify(f), order: sort ? `${sort.get('key')} ${sort.get('order')}` : null,
        });
        yield put({
          type: 'save',
          payload: {
            page, pagesize, total, records,
          },
        });
      },
      * changeSort({ payload: { key, order } }, { put }) {
        let canSort = false;
        let title;
        forEach(schema, (definition) => {
          if (definition.key === key) {
            const { sort, title: t } = definition;
            canSort = sort && sort[order];
            title = t;

            return true;
          }

          return false;
        });

        if (canSort) {
          yield put({ type: 'saveSort', payload: { key, order } });
        } else {
          throw new Error(`${title}不支持${order === 'asc' ? '升序' : '降序'}排序`);
        }
      },
    },
  };

  if (create) {
    model.effects.create = function* modelCreate({ payload: { body } }, { call }) {
      yield call(service.create, body);
    };
  }

  if (edit) {
    model.effects.edit = function* modelEdit({ payload: { body } }, { call }) {
      yield call(service.edit, body);
    };
  }

  if (remove) {
    model.effects.remove = function* modelRemove({ payload: { id } }, { call }) {
      yield call(service.remove, id);
    };
  }

  return model;
}

function generateModal({ namespace, schema, action: { create, edit } }) {
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
  namespace, schema, action: {
    create, edit, remove, order: orderAction,
  },
}, Modal) {
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
    sort: state[namespace].get('sort').toJS(),
    total: state[namespace].get('total'),
  });

  const mapDispatchToProps = (dispatch) => {
    const props = {
      fetch: async ({ page, pagesize, params }) => dispatch({ type: `${namespace}/fetch`, payload: { page, pagesize, params } }),
      changeSort: async ({ key, order }) => dispatch({ type: `${namespace}/changeSort`, payload: { key, order } }),
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

    if (orderAction) {
      props.order = props.edit;
    }

    return props;
  };

  return connect(mapStateToProps, mapDispatchToProps)(Page);
}

function generateDynamicRecordsComponent({ app, config }) {
  const service = generateService(config);
  const model = generateModel(config, service);
  const Modal = generateModal(config);
  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () => Promise.resolve(generateRecordsPage(config, Modal)),
  });
}

export default function dynamicRecordsComponent({ app, config }) {
  if (!app) {
    throw new Error('dynamicRecordsComponent: app is required');
  }
  if (!config) {
    throw new Error('dynamicRecordsComponent: config is required');
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
