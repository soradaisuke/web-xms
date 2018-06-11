import { isPlainObject, isArray } from 'lodash';
import Immutable from 'immutable';

export default function modelExtend(...args) {
  const base = {
    state: null, subscriptions: {}, effects: {}, reducers: {},
  };

  return args.reduce((acc, extend) => {
    let state = acc.state;
    if (isPlainObject(state) && isPlainObject(extend.state)) {
      state = {
        ...state,
        ...extend.state,
      };
    } else if (isArray(acc.state) && isArray(extend.state)) {
      state = [
        ...state,
        ...extend.state,
      ];
    } else if (state instanceof Immutable.Map && extend.state instanceof Immutable.Map) {
      state = state.merge(extend.state);
    } else if ('state' in extend) {
      state = extend.state;
    }

    return {
      state,
      namespace: extend.namespace || acc.namespace,
      reducers: {
        ...acc.reducers,
        ...(extend.reducers || {}),
      },
      effects: {
        ...acc.effects,
        ...(extend.effects || {}),
      },
      subscriptions: {
        ...acc.subscriptions,
        ...(extend.subscriptions || {}),
      },
    };
  }, base);
}
