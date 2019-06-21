import Immutable from 'immutable';
import { parse } from 'query-string';
import { generateUri, isProduction } from '@qt/web-core';
import request from '../services/request';

const ENTRY_HOST = `//entry${isProduction ? '' : '.staging'}.qingtingfm.com`;

function generateService(auth) {
  if (!auth) {
    throw new Error('auth of api is required');
  }

  return {
    auth: async () => request.get(auth)
  };
}

export default function generateUserModel(auth) {
  const service = generateService(auth);

  return {
    namespace: 'user',
    state: null,
    reducers: {
      save(
        state,
        {
          payload: { user }
        }
      ) {
        return Immutable.fromJS(user);
      }
    },
    effects: {
      *auth(_, { call, put }) {
        try {
          const user = yield call(service.auth);
          yield put({ type: 'save', payload: { user } });
        } catch (e) {
          const queries = parse(window.location.search);
          if (!queries || queries.auth !== '1') {
            const loginUrl = generateUri(`${ENTRY_HOST}/v1/sso/login.html`, {
              return_url: generateUri(window.location.href, { auth: 1 })
            });
            window.location.replace(loginUrl);
          } else {
            throw e;
          }
        }
      }
    },
    subscriptions: {
      setup({ dispatch }) {
        dispatch({ type: 'auth' });
      }
    }
  };
}
