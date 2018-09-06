import { includes, isPlainObject } from 'lodash';
import fetch from 'dva/fetch';
import generateUri from '../utils/generateUri';

let { host } = window.location;

function setHost(h) {
  host = h;
}

async function generateRequest(path, options = {}) {
  const newOptions = { ...options };
  newOptions.headers = newOptions.headers || {};
  if (options.method && includes(['POST', 'PUT', 'PATCH'], options.method) !== -1 && isPlainObject(newOptions.body)) {
    newOptions.headers['Content-Type'] = 'application/json;charset=utf-8';
    newOptions.body = JSON.stringify(newOptions.body);
  }
  newOptions.headers.Accept = 'application/json, text/plain, */*';
  newOptions.credentials = 'include';

  const uri = generateUri(`//${host}${path}`, options.params ? options.params : {});

  try {
    let response = await fetch(uri.href, newOptions);

    if (response.status < 200 || response.status >= 300) {
      const error = new Error(response.statusText);

      try {
        response = await response.json();
        error.message = response.errmsg;
      } catch (e) {
        //
      }

      throw error;
    }

    response = await response.json();

    if (response.errcode !== undefined) {
      if (response.errcode === 0) {
        return response.data;
      }

      throw new Error(response.errmsg);
    }

    return response;
  } catch (error) {
    throw error;
  }
}

async function get(url, options = {}) {
  return generateRequest(url, { ...options, method: 'GET' });
}

async function post(url, options = {}) {
  return generateRequest(url, { ...options, method: 'POST' });
}

async function put(url, options = {}) {
  return generateRequest(url, { ...options, method: 'PUT' });
}

async function remove(url, options = {}) {
  return generateRequest(url, { ...options, method: 'DELETE' });
}

export default {
  setHost,
  get,
  post,
  put,
  remove,
};
