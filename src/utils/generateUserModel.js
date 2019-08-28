import Immutable from 'immutable';
import { parse } from 'query-string';
import { generateUri, isProduction } from '@qt/web-core';
import request from '../services/request';

const ENTRY_HOST = `//entry${isProduction ? '' : '.staging'}.qingtingfm.com`;

function generateService(auth, login) {
  if (!auth) {
    throw new Error('auth of api is required');
  }

  return {
    auth: async () => request.get(auth),
    login: login
      ? async ({ account, password }) =>
          request.post(login, { body: { email: account, password } })
      : null
  };
}

export default function generateUserModel(auth, login) {
  const service = generateService(auth, login);

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
        const queries = parse(window.location.search);
        const path = window.location.pathname;
        try {
          if (!login || path !== '/login') {
            const user = yield call(service.auth);
            yield put({ type: 'save', payload: { user } });
          }
        } catch (e) {
          if (login) {
            if (path !== '/login' && (!queries || queries.auth !== '1')) {
              const loginUrl = generateUri(`${window.location.origin}/login`, {
                return_url: generateUri(window.location.href, { auth: 1 })
              });
              window.location.replace(loginUrl);
            } else {
              throw e;
            }
          } else if (!queries || queries.auth !== '1') {
            const loginUrl = generateUri(`${ENTRY_HOST}/v1/sso/login.html`, {
              return_url: generateUri(window.location.href, { auth: 1 })
            });
            window.location.replace(loginUrl);
          } else {
            throw e;
          }
        }
      },
      *login(
        {
          payload: { account, password }
        },
        { call }
      ) {
        if (login) {
          yield call(service.login, { account, password });
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
