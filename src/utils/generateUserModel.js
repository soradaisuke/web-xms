import Immutable from 'immutable';
import { parse } from 'query-string';
import request from '../services/request';
import generateUri from './generateUri';

function generateService(login) {
  if (!login) {
    throw new Error('generateUserModel generateService: login path is required');
  }

  return {
    login: async () => request.get(login),
  };
}

export default function generateUserModel(login) {
  const service = generateService(login);

  return {
    namespace: 'user',
    state: null,
    reducers: {
      save(state, { payload: { user } }) {
        return Immutable.fromJS(user);
      },
    },
    effects: {
      * login(_, { call, put }) {
        try {
          const user = yield call(service.login);
          yield put({ type: 'save', payload: { user } });
        } catch (e) {
          const queries = parse(window.location.search);
          if (!queries && queries.auth !== '1') {
            const loginUrl = generateUri('//entry.qingtingfm.com/v1/sso/login.html', { return_url: generateUri(window.location.href, { auth: 1 }) });
            window.location.replace(loginUrl);
          } else {
            throw e;
          }
        }
      },
    },
    subscriptions: {
      setup({ dispatch }) {
        dispatch({ type: 'login' });
      },
    },
  };
}
