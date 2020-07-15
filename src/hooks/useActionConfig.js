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

  const onOk = useEventCallback(
    ({
      data = {},
      loadingMessage = action.getHandlingMessage(),
      throwError = false,
      reload = action.needReload(),
    } = {}) => {
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
          throwError,
          onComplete: () => {
            const onActionComplete = action.getOnComplete();
            if (isFunction(onActionComplete)) {
              onActionComplete();
            }
            if (reload && isFunction(onComplete)) {
              onComplete();
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
      filteredRecords,
      onComplete,
    ]
  );

  return { params, disabled, invisible, onOk };
}
