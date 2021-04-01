import { split } from 'lodash';
import request from '../services/request';

export default function generateService({
  retrieve: fetch,
  create,
  update: edit,
  delete: remove,
  defaultParams = {},
  defaultBody = {},
} = {}) {
  return {
    fetchAll: ({ path, page, pagesize, filter, order }) =>
      fetch?.({ path, query: { page, pagesize, filter, order } }) ??
      request.get(path, {
        params: {
          ...defaultParams,
          page,
          pagesize,
          order,
          filter: JSON.stringify(filter),
        },
      }),
    fetch: ({ path, id }) =>
      fetch?.({ path, id }) ?? request.get(`${path}${id ? `/${id}` : ''}`),
    create: ({ path, body }) =>
      create?.({ path, body }) ??
      request.post(`${split(path, '?')[0]}`, { body: { ...defaultBody, ...body } }),
    edit: ({ path, id, body }) =>
      edit?.({ path, id, body }) ??
      request.put(`${split(path, '?')[0]}${id ? `/${id}` : ''}`, { ...defaultBody, body }),
    remove: ({ path, id }) =>
      remove?.({ path, id }) ??
      request.remove(`${split(path, '?')[0]}${id ? `/${id}` : ''}`),
  };
}
