export default {
  namespace: 'audio',
  state: '',
  reducers: {
    save(_, { payload: { id } }) {
      return id;
    },
  },
  effects: {
    * changePlayedAudio({ payload: { id = '' } = {} }, { put }) {
      yield put({ type: 'save', payload: { id } });
    },
  },
};
