import { includes, isArray, isPlainObject } from 'lodash';
import { fetch } from 'dva';
import { generateUri } from '@qt/web-common';

let { host } = window.location;

function setHost(h) {
  host = h;
}

async function generateRequest(path, options = {}) {
  const newOptions = { ...options };
  newOptions.headers = newOptions.headers || {};
  if (
    options.method &&
    includes(['POST', 'PUT', 'PATCH', 'DELETE'], options.method) &&
    (isPlainObject(newOptions.body) || isArray(newOptions.body))
  ) {
    if (!newOptions.headers['Content-Type']) {
      newOptions.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    newOptions.body = JSON.stringify(newOptions.body);
  }
  newOptions.headers.Accept = 'application/json, text/plain, */*';
  newOptions.credentials = 'include';

  const uri = generateUri(path, options.params ? options.params : {});

  if (uri.host === window.location.host) {
    uri.set('host', host);
  }

  let response = await fetch(uri.href, newOptions);

  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText);
    error.code = response.status;

    try {
      response = await response.json();
      error.message = response.errmsg || response.msg;
      error.code = response.code || response.errcode || error.code;
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
    const error = new Error(response.errmsg);
    error.code = response.errcode;
    throw error;
  }

  return response;
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

async function patch(url, options = {}) {
  return generateRequest(url, { ...options, method: 'PATCH' });
}

export default {
  setHost,
  get,
  post,
  put,
  remove,
  patch
};
