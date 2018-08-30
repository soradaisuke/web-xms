import Immutable from 'immutable';
import request from '../services/request';
import generateUri from './generateUri';

function generateService(login) {
  if (!login) {
    throw new Error('generateUserModel generateService: login path is required');
  }

  return {
    login: async () => request.post(login),
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
          const loginUrl = generateUri('//entry.qingtingfm.com/v1/sso/login.html', { return_url: window.location.href });
          window.location.replace(loginUrl);
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
