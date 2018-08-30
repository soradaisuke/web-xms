import { includes, isPlainObject } from 'lodash';
import { stringify } from 'query-string';
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
      error.data = {
        message: response.statusText,
        status: response.status,
      };

      try {
        response = await response.json();
        error.data.code = response.code || response.errorno || response.errcode;
      } catch (e) {
        //
      }

      throw error;
    }

    response = await response.json();

    if (response.code !== undefined) {
      if (response.code === 200) {
        return response.data || response.ret;
      }

      const error = new Error(response.msg);
      error.data = {
        message: response.msg,
        code: response.code,
      };
      throw error;
    }

    if (response.errorno !== undefined) {
      if (response.errorno === 0) {
        return response.data || response.ret;
      }

      const error = new Error(response.errormsg);
      error.data = {
        message: response.errormsg,
        code: response.errorno,
      };
      throw error;
    }

    if (response.errcode !== undefined) {
      if (response.errcode === 0) {
        return response.data;
      }

      const error = new Error(response.errmsg);
      error.data = {
        message: response.errmsg,
        code: response.errcode,
      };
      throw error;
    }

    return response.data || response;
  } catch (error) {
    error.data = {
      ...(error.data || {}),
      host: uri.host,
      pathname: uri.pathname,
      queryString: stringify(uri.query),
      method: (newOptions.method || 'GET').toLowerCase(),
      reason: 'api',
    };

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
