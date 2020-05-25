/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import { upperFirst, isFunction, isString, split, isPlainObject } from 'lodash';
import request from '../services/request';
import RecordFormPage from '../pages/RecordFormPage';

function generateService({ api: { fetch } = {} }) {
  const service = {
    fetch: async ({ path, id }) =>
      fetch ? fetch({ path, id }) : request.get(`${split(path, '?')[0]}/${id}`),
    create: async ({ path, body }) => {
      return request.post(`${split(path, '?')[0]}`, { body });
    },
    edit: async ({ path, id, body }) =>
      request.put(`${split(path, '?')[0]}/${id}`, { body })
  };

  return service;
}

function generateModel({ namespace }, service) {
  if (!namespace) {
    throw new Error(
      'dynamicRecordFormComponent generateModel: namespace is required'
    );
  }

  return {
    namespace,
    state: null,
    reducers: {
      save(
        _,
        {
          payload: { record }
        }
      ) {
        return record;
      }
    },
    effects: {
      fetch: [
        function* fetch({ payload: { path, id } }, { call, put }) {
          const record = yield call(service.fetch, { path, id });
          yield put({ type: 'save', payload: { record } });
        },
        { type: 'takeLatest' }
      ],
      create: function* modelCreate({ payload: { path, body } }, { call }) {
        yield call(service.create, { path, body });
      },
      edit: function* modelEdit({ payload: { path, body, id } }, { call }) {
        yield call(service.edit, { path, body, id });
      }
    }
  };
}

function generateRecordFormPage({
  namespace,
  formPageProps = {},
  api: { path, host, defaultBody } = {},
  actions,
  table
}) {
  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordFormPage
          {...this.props}
          {...formPageProps}
          actions={actions}
          table={table}
        />
      );
    }
  }

  const mapStateToProps = state => ({
    record: state[namespace]
  });

  const mapDispatchToProps = (dispatch, ownProps) => {
    const {
      match: { params: matchParams }
    } = ownProps;
    let createApiDefaultBody = {};
    if (isFunction(defaultBody)) {
      createApiDefaultBody = defaultBody(matchParams);
    } else if (isPlainObject(defaultBody)) {
      createApiDefaultBody = defaultBody;
    }

    let apiPath = '';
    if (isFunction(path)) {
      apiPath = path(matchParams);
    } else if (isString(path)) {
      apiPath = path;
    }

    if (host) {
      apiPath = `${host}${apiPath}`;
    }

    if (apiPath) {
      return {
        fetch: async () =>
          dispatch({
            type: `${namespace}/fetch`,
            payload: { path: apiPath, id: matchParams.id }
          }),
        create: async ({ body }) =>
          dispatch({
            type: `${namespace}/create`,
            payload: {
              path: apiPath,
              body: { ...createApiDefaultBody, ...body }
            }
          }),
        edit: async ({ body }) =>
          dispatch({
            type: `${namespace}/edit`,
            payload: {
              path: apiPath,
              id: matchParams.id,
              body: { ...createApiDefaultBody, ...body }
            }
          })
      };
    }

    return {};
  };

  return withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Page)
  );
}

function generateDynamicRecordFormComponent({ app, config }) {
  const service = generateService(config);
  const model = generateModel(config, service);

  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () => Promise.resolve(generateRecordFormPage(config))
  });
}

export default function dynamicRecordFormComponent({ app, config }) {
  if (!app) {
    throw new Error('dynamicRecordFormComponent: app is required');
  }

  return generateDynamicRecordFormComponent({
    app,
    config
  });
}
