/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'dva';
import { upperFirst, isFunction, isString } from 'lodash';
import request from '../services/request';
import RecordPage from '../pages/RecordPage';

function generateService({ api: { fetch } = {} }) {
  const service = {
    fetch: async ({ path }) => (fetch ? fetch({ path }) : request.get(path)),
    remove: async ({ path }) => request.remove(path),
    edit: async ({ path, body }) => request.put(path, { body })
  };

  return service;
}

function generateModel({ namespace }, service) {
  if (!namespace) {
    throw new Error(
      'dynamicRecordComponent generateModel: namespace is required'
    );
  }

  return {
    namespace,
    state: null,
    reducers: {
      save(
        state,
        {
          payload: { record }
        }
      ) {
        return record;
      }
    },
    effects: {
      fetch: [
        function* fetch({ payload: { path } }, { call, put }) {
          const record = yield call(service.fetch, { path });
          yield put({ type: 'save', payload: { record } });
        },
        { type: 'takeLatest' }
      ],
      remove: function* modelRemove({ payload: { path } }, { call }) {
        yield call(service.remove, { path });
      },
      edit: function* modelEdit({ payload: { path, body } }, { call }) {
        yield call(service.edit, { path, body });
      }
    }
  };
}

function generateRecordPage({
  config: { namespace, api: { path } = {}, actions, table } = {},
  component,
  inlineLayout
}) {
  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordPage
          {...this.props}
          inlineLayout={inlineLayout}
          component={component}
          table={table}
          actions={actions}
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

    let apiPath = '';
    if (isFunction(path)) {
      apiPath = path(matchParams);
    } else if (isString(path)) {
      apiPath = path;
    }

    if (apiPath) {
      return {
        fetch: async () =>
          dispatch({
            type: `${namespace}/fetch`,
            payload: { path: apiPath }
          }),
        remove: async () =>
          dispatch({
            type: `${namespace}/remove`,
            payload: { path: apiPath }
          }),
        edit: async ({ body }) =>
          dispatch({
            type: `${namespace}/edit`,
            payload: { path: apiPath, body }
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

function generateDynamicRecordComponent({
  app,
  config,
  component,
  inlineLayout
}) {
  const service = generateService(config);
  const model = generateModel(config, service);

  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () =>
      Promise.resolve(generateRecordPage({ config, component, inlineLayout }))
  });
}

export default function dynamicRecordComponent({
  app,
  config,
  component,
  inlineLayout
}) {
  if (!app) {
    throw new Error('dynamicRecordComponent: app is required');
  }
  if (!config) {
    throw new Error('dynamicRecordComponent: config is required');
  }

  return generateDynamicRecordComponent({
    app,
    config,
    component,
    inlineLayout
  });
}
