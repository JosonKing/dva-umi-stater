import * as codesService from '../services/codes';

export default {
  namespace: 'codes',
  state: {
    list: [],
    total: null,
    page: null,
  },
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
  },
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(codesService.fetch, { page });
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select }) {
      yield call(codesService.remove, id);
      const page = yield select(state => state.codes.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(codesService.patch, id, values);
      const page = yield select(state => state.codes.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *create({ payload: values }, { call, put, select }) {
      yield call(codesService.create, values);
      const page = yield select(state => state.codes.page);
      yield put({ type: 'fetch', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/codes') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
