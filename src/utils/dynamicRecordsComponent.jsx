/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { parse } from 'query-string';
import {
  upperFirst, isFunction, forEach, toInteger, find,
} from 'lodash';
import generateUri from './generateUri';
import request from '../services/request';
import RecordsPage from '../pages/RecordsPage';
import RecordModal from '../components/RecordModal';
import DataType from '../constants/DataType';

const { ORDER } = DataType;

function generateService({ api: { path }, actions }) {
  if (!path) {
    throw new Error('dynamicRecordsComponent generateService: path is required');
  }

  const service = {
    fetch: async params => request.get(path, { params }),
  };

  forEach(actions, (action) => {
    if (action === 'create') {
      service.create = async body => request.post(`${path}`, { body });
    } else if (action === 'edit') {
      service.edit = async body => request.put(`${path}/${body.id}`, { body });
    } else if (action === 'remove') {
      service.remove = async id => request.remove(`${path}/${id}`);
    } else if (action === 'order') {
      service.order = async body => request.put(`${path}/${body.id}`, { body });
    }
  });

  return service;
}

function generateModel({
  namespace, api: { defaultFilter = {} } = {}, actions, schema,
}, service) {
  if (!namespace) {
    throw new Error('dynamicRecords generateModel: namespace is required');
  }
  let defaultSort;
  let orderField;
  const searchFileds = [];
  forEach(schema, (definition) => {
    if (definition.sort && definition.defaultSort) {
      defaultSort = `${definition.key} ${definition.defaultSort}`;
    }
    if (definition.search) {
      searchFileds.push({ key: definition.key, title: definition.title });
    }
    if (definition.type === ORDER) {
      orderField = definition.key;
    }
  });

  const model = {
    namespace,
    state: Immutable.fromJS({
      records: [],
      total: 0,
      defaultSort,
      canSearch: searchFileds.length > 0,
      searchPlaceHolder: searchFileds.map(filed => filed.title).join('、'),
    }),
    reducers: {
      save(state, { payload: { records, total } }) {
        return state.merge(Immutable.fromJS({ records, total }));
      },
    },
    effects: {
      * fetch({
        payload: {
          page, pagesize, sort, search, filter = {}, params,
        },
      }, { call, put }) {
        let f = filter;
        if (isFunction(defaultFilter)) {
          f = { ...f, ...defaultFilter(params) };
        } else if (defaultFilter) {
          f = { ...f, ...defaultFilter };
        }

        if (search) {
          f = {
            ...f,
            ...searchFileds.reduce((acc, field) => {
              acc[field.key] = `%${search}%`;
              return acc;
            }, {}),
          };
        }

        const { items: records, total } = yield call(service.fetch, {
          page, pagesize, filter: JSON.stringify(f), order: sort,
        });
        yield put({ type: 'save', payload: { total, records } });
      },
    },
  };

  forEach(actions, (action) => {
    if (action === 'create') {
      model.effects.create = function* modelCreate({ payload: { body } }, { call }) {
        yield call(service.create, body);
      };
    } else if (action === 'edit') {
      model.effects.edit = function* modelEdit({ payload: { body } }, { call }) {
        yield call(service.edit, body);
      };
    } else if (action === 'remove') {
      model.effects.remove = function* modelRemove({ payload: { id } }, { call }) {
        yield call(service.remove, id);
      };
    } else if (action === 'order') {
      model.effects.order = function* modelOrder({ payload: { body, diff } }, { call }) {
        yield call(service.order, { ...body, [orderField]: body[orderField] + diff });
      };
    }
  });

  return model;
}

function generateModal({ namespace, schema, actions }) {
  if (!find(actions, action => action === 'create') && !find(actions, action => action === 'edit')) {
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

function generateRecordsPage({ namespace, schema, actions }, Modal) {
  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordsPage Modal={Modal} {...this.props} schema={schema} actions={actions} />
      );
    }
  }

  const mapStateToProps = (state) => {
    const queries = parse(window.location.search);

    return {
      canSearch: state[namespace].get('canSearch'),
      searchPlaceHolder: state[namespace].get('searchPlaceHolder'),
      page: queries.page ? toInteger(queries.page) : 1,
      pagesize: queries.pagesize ? toInteger(queries.pagesize) : 10,
      sort: queries.sort || state[namespace].get('defaultSort'),
      search: queries.search,
      records: state[namespace].get('records'),
      total: state[namespace].get('total'),
      searchFileds: state[namespace].get('searchFileds'),
    };
  };

  const mapDispatchToProps = (dispatch) => {
    const props = {
      fetch: async ({
        page, pagesize, sort, search, params,
      }) => dispatch({
        type: `${namespace}/fetch`,
        payload: {
          page, pagesize, sort, search, params,
        },
      }),
      async changePage({ page, pagesize }) {
        const uri = generateUri(window.location.href, { page, pagesize });
        return dispatch(routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length)));
      },
      async changeSort({ key, order }) {
        const uri = generateUri(window.location.href, { sort: `${key} ${order}` });
        return dispatch(routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length)));
      },
      async changeSearch({ search }) {
        const uri = generateUri(window.location.href, { search });
        return dispatch(routerRedux.push(uri.href.substring(uri.origin.length, uri.href.length)));
      },
    };

    forEach(actions, (action) => {
      if (action === 'create') {
        props.create = async body => dispatch({ type: `${namespace}/create`, payload: { body } });
      } else if (action === 'edit') {
        props.edit = async body => dispatch({ type: `${namespace}/edit`, payload: { body } });
      } else if (action === 'remove') {
        props.remove = async id => dispatch({ type: `${namespace}/remove`, payload: { id } });
      } else if (action === 'order') {
        props.order = async (body, diff) => dispatch({ type: `${namespace}/order`, payload: { body, diff } });
      }
    });

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
