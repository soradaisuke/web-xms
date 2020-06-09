import { message } from 'antd';
import { isFunction } from 'lodash';
import showError from './showError';

export default async function visiblePromise({
  promise,
  loadingMessage,
  successMessage,
  throwError = false,
  onComplete
}) {
  let hide;
  if (loadingMessage) {
    hide = message.loading(loadingMessage, 0);
  }

  try {
    const result = await promise;
    if (hide) {
      hide();
    }
    if (isFunction(onComplete)) {
      onComplete({ result });
    }
    if (successMessage) {
      message.success(successMessage);
    }
  } catch (e) {
    if (hide) {
      hide();
    }
    showError(e.message);
    if (throwError) {
      throw e;
    }
  }
}
