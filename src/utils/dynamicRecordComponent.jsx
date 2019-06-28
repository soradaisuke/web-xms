/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import { withRouter } from 'dva/router';
import { connect } from 'dva';
import { upperFirst, isFunction, isString } from 'lodash';
import request from '../services/request';
import RecordPage from '../pages/RecordPage';

function generateService() {
  return {
    fetch: async ({ path }) => request.get(path)
  };
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
        return Immutable.fromJS(record);
      }
    },
    effects: {
      *fetch(
        {
          payload: { path }
        },
        { call, put }
      ) {
        try {
          const record = yield call(service.fetch, { path });
          yield put({ type: 'save', payload: { record } });
        } catch (error) {
          throw new Error("获取详情页数据失败");
        }
      }
    }
  };
}

function generateRecordPage({
  config: { namespace, title, table, api: { path, host } = {} } = {},
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
          title={title}
        />
      );
    }
  }

  const mapStateToProps = (state, props) => {
    const {
      match: { params: matchParams }
    } = props;

    let apiPath = '';
    if (isFunction(path)) {
      apiPath = path(matchParams);
    } else if (isString(path)) {
      apiPath = path;
    }
    if (host) {
      apiPath = `${host}${apiPath}`;
    }

    return {
      apiPath,
      record: state[namespace],
      isLoading: state.loading.effects[`${namespace}/fetch`],
      recordId: apiPath
    };
  };

  const mapDispatchToProps = dispatch => ({
    fetch: async () =>
      dispatch({ type: `${namespace}/fetch`, payload: { path: apiPath } })
  });

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
