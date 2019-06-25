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
    fetch: async ({ id }) => request.get(id)
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
          payload: { id }
        },
        { call, put }
      ) {
        const record = yield call(service.fetch, { id });
        yield put({ type: 'save', payload: { record } });
      }
    }
  };
}

function generateRecordPage({
  config: { namespace, api: { path } = {} } = {},
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

    return {
      record: state[namespace],
      recordId: apiPath
    };
  };

  const mapDispatchToProps = dispatch => ({
    fetch: async ({ id }) =>
      dispatch({ type: `${namespace}/fetch`, payload: { id } })
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
