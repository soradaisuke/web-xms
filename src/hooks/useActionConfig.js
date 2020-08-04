import { useMemo } from 'react';
import { useEventCallback } from '@qt/react';
import { isFunction, get, filter, map } from 'lodash';
import usePageConfig from './usePageConfig';
import useActionParams from './useActionParams';
import visiblePromise from '../utils/visiblePromise';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';

export default function useActionConfig({
  action,
  record,
  records,
  onComplete,
}) {
  const params = useActionParams({ record, records });

  const filteredRecords = useMemo(
    () =>
      action.isMultipleAction() && !action.isGlobalAction()
        ? filter(records || [], (r) =>
            action.isEnable({ ...params, records: null, record: r })
          )
        : null,
    [action, records, params]
  );

  const disabled = useMemo(() => {
    if (filteredRecords) {
      return filteredRecords.length === 0;
    }

    if (action.isGlobalAction()) {
      return (
        (action.isMultipleAction() && records && records.length === 0) ||
        !action.isEnable(params)
      );
    }

    return !action.isEnable(params);
  }, [action, params, filteredRecords, records]);

  const invisible = useMemo(() => !action.isVisible(params), [action, params]);

  const { edit, remove, create, table } = usePageConfig();

  const handler = useMemo(() => {
    let defaultHandler;
    if (action instanceof CreateAction) {
      defaultHandler = create;
    } else if (action instanceof EditAction) {
      defaultHandler = edit;
    } else if (action instanceof DeleteAction) {
      defaultHandler = remove;
    }

    return action?.getHandler(defaultHandler);
  }, [action, create, edit, remove]);

  const normalize = useMemo(() => action.getNormalize(), [action]);

  const onOk = useEventCallback(
    ({
      data: preData = {},
      loadingMessage = action.getHandlingMessage(),
      successMessage = action.getSuccessMessage(),
      throwError = false,
      reload = action.needReload(),
    } = {}) => {
      const data = preData;
      if (data.body && isFunction(normalize)) {
        data.body = normalize(data.body);
      }

      if (isFunction(handler)) {
        let promise;

        if (action.isGlobalAction()) {
          promise = handler({
            ...params,
            ...data,
          });
        } else if (filteredRecords) {
          promise = Promise.all(
            map(filteredRecords, (r) =>
              handler({
                ...params,
                records: null,
                record: r,
                id: get(r, table.getPrimaryKey()),
                ...data,
              })
            )
          );
        } else {
          promise = handler({
            ...params,
            id: get(record, table.getPrimaryKey()),
            ...data,
          });
        }

        return visiblePromise({
          promise,
          loadingMessage,
          successMessage,
          throwError,
          onComplete: (...args) => {
            const onActionComplete = action.getOnComplete();
            if (isFunction(onActionComplete)) {
              onActionComplete(...args);
            }
            if (reload && isFunction(onComplete)) {
              onComplete(...args);
            }
          },
        });
      }

      return Promise.resolve();
    },
    [
      // eslint-disable-line react-hooks/exhaustive-deps
      params,
      record,
      handler,
      normalize,
      filteredRecords,
      onComplete,
    ]
  );

  return { params, disabled, invisible, onOk };
}
