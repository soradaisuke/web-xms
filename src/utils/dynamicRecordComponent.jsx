/* eslint-disable react/no-multi-comp */
import dynamic from 'dva/dynamic';
import Immutable from 'immutable';
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'dva';
import { upperFirst, isFunction } from 'lodash';
import request from '../services/request';
import RecordPage from '../pages/RecordPage';

function generateService({ api: { path } }) {
  if (!path) {
    throw new Error('dynamicRecordComponent generateService: path is required');
  }

  return {
    fetch: async ({ id }) => request.get(`${path}/${id}`),
  };
}

function generateModel({ namespace }, service) {
  if (!namespace) {
    throw new Error('dynamicRecordComponent generateModel: namespace is required');
  }

  return {
    namespace,
    state: null,
    reducers: {
      save(state, { payload: { record } }) {
        return Immutable.fromJS(record);
      },
    },
    effects: {
      * fetch({ payload: { id } }, { call, put }) {
        const record = yield call(service.fetch, { id });
        yield put({ type: 'save', payload: { record } });
      },
    },
  };
}

function generateRecordPage({ namespace, api: { idKey } }, component) {
  class Page extends React.PureComponent {
    static displayName = `${upperFirst(namespace)}Page`;

    render() {
      return (
        <RecordPage {...this.props} component={component} />
      );
    }
  }

  const mapStateToProps = (state, props) => ({
    record: state[namespace],
    recordId: props.match.params[idKey] || props.match.params.id,
  });

  const mapDispatchToProps = dispatch => ({
    fetch: async ({ id }) => dispatch({ type: `${namespace}/fetch`, payload: { id } }),
  });

  return withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
}

function generateDynamicRecordComponent({ app, config, component }) {
  const service = generateService(config);
  const model = generateModel(config, service);

  return dynamic({
    app,
    models: () => [Promise.resolve(model)],
    component: () => Promise.resolve(generateRecordPage(config, component)),
  });
}

export default function dynamicRecordComponent({ app, config, component }) {
  if (!app) {
    throw new Error('dynamicRecordComponent: app is required');
  }
  if (!config) {
    throw new Error('dynamicRecordComponent: config is required');
  }

  if (isFunction(config)) {
    return dynamic({
      app,
      resolve: () => config().then(c => (
        generateDynamicRecordComponent({ app, config: c.default || c, component })
      )),
    });
  }

  return generateDynamicRecordComponent({ app, config, component });
}
