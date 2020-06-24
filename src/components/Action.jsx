import React, { useMemo } from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import { useEventCallback } from '@qt/react';
import { get, isFunction, filter, map } from 'lodash';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import ActionConfig from '../actions/Action';
import useUser from '../hooks/useUser';
import RecordLink from './RecordLink';
import RecordModal from './RecordModal';
import visiblePromise from '../utils/visiblePromise';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';
import usePageConfig from '../hooks/usePageConfig';
import useForm from '../hooks/useForm';

function Action({
  action,
  record,
  records,
  onComplete,
  disabledRecordModal
}) {

  const user = useUser();

  const matchParams = useParams();

  const form = useForm();

  const {
    table,
    edit,
    remove,
    create
  } = usePageConfig();

  const params = {
    record,
    records,
    user,
    matchParams
  }

  const filteredRecords = useMemo(() => (
    records
      ? filter(records, r =>
          isFunction(action.getEnable())
            ? (action.getEnable())({ ...params, records: null, record: r })
            : true
        )
      : null
  ), [action, records, params]);

  const disabled = useMemo(() => {
    const enable = action.getEnable();
    if (action.isGlobalAction()) {
      return (records && records.length === 0) ||
      (isFunction(enable) && !enable(params));
    }
    if (records) {
      return filteredRecords && filteredRecords.length === 0;
    }
    return isFunction(enable) && !enable(params);
  }, [action, params, filteredRecords, records]);

  const onOk = useEventCallback(({
    data = {},
    loadingMessage = action.getHandlingMessage(),
    throwError = false,
    reload = action.needReload()
  }) => {
    let defaultHandler;
    if (action instanceof CreateAction) {
      defaultHandler = create;
    } else if (action instanceof EditAction) {
      defaultHandler = edit;
    } else if (action instanceof DeleteAction) {
      defaultHandler = remove;
    }
    const handler = action.getHandler(defaultHandler);

    if (isFunction(handler)) {
      let promise;

      if (action.isGlobalAction()) {
        promise = handler({
          ...params,
          ...data
        });
      } else if (filteredRecords) {
        promise = Promise.all(
          map(filteredRecords, r =>
            handler({
              ...params,
              records: null,
              record: r,
              id: get(r, table.getPrimaryKey()),
              ...data
            })
          )
        );
      } else {
        promise = handler({
          ...params,
          id: get(record, table.getPrimaryKey()),
          ...data
        });
      }

      visiblePromise({
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
        }
      });
    }
  }, [ // eslint-disable-line react-hooks/exhaustive-deps
    params,
    record,
    filteredRecords,
    onComplete
  ]);

  const buttonProps = {
    className: 'action-button',
    type: action.getType(),
    shape: action.getShape(),
    icon: action.getIcon(),
    ...(action.getButtonProps() || {}),
    disabled,
    children: action.getShape() !== 'circle' ? action.getTitle() : null
  }

  const onFormOk = useEventCallback(f =>
    (f || form)
      .validateFields()
      .then(async values => {
        try {
          await onOk({
            data: { body: values },
            throwError: true,
            reload: true
          });
          return true;
        } catch (e) {
          return false;
        }
      })
      .catch(() => {
        if (disabledRecordModal) {
          return false;
        }
        return Promise.reject();
      })
  , [form, onOk]);

  const onClick = useEventCallback(() => {
    const onOkInternal =
      disabledRecordModal
        ? onFormOk
        : onOk;
    if (action.showConfirmModal()) {
      const confirmTitle = action.getConfirmTitle();
      Modal.confirm({
        title: isFunction(confirmTitle) ? confirmTitle(params) : confirmTitle,
        content: action.getConfirmContent(),
        ...action.getConfirmProps(),
        onOk: onOkInternal
      });
    } else {
      onOkInternal();
    }
  }, [
    action,
    params,
    onOk,
    disabledRecordModal,
    onFormOk
  ]);

  if (!action.isVisible(user) ||
    (disabled && action.isRowAction() && record)) {
    return null;
  }

  if (isFunction(action.getRender())) {
    return (action.getRender())({ ...params, reload: onComplete });
  }

  if (action.getLink() && !disabled) {
    return (
      <Button
        {...buttonProps}
        style={{ position: 'relative' }}
        key={action.getTitle()}
      >
        {buttonProps.children}
        <RecordLink
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0
          }}
          link={action.getLink()}
          record={record || records}
        />
      </Button>
    );
  }

  if ((action.getColumns() ||
    action instanceof CreateAction ||
    action instanceof EditAction) &&
    !disabledRecordModal
  ) {
    return (
      <RecordModal
        {...action.getModalProps()}
        columns={action.getColumns() || table.getColumns()}
        key={action.getTitle()}
        title={action.getTitle()}
        record={record}
        records={records}
        checkVisibility={action.checkVisibility()}
        onOk={onFormOk}
      >
        <Button {...buttonProps} />
      </RecordModal>
    );
  }

  if (!disabled && action.getConfirmType() === 'pop') {
    const confirmTitle = action.getConfirmTitle();
    return (
      <Popconfirm
        {...action.getConfirmProps()}
        key={action.getTitle()}
        title={isFunction(confirmTitle) ? confirmTitle(params) : confirmTitle}
        onConfirm={onOk}
      >
        <Button {...buttonProps} />
      </Popconfirm>
    );
  }

  return (
    <Button
      {...buttonProps}
      onClick={onClick}
    />
  );
}

Action.propTypes = {
  action: PropTypes.instanceOf(ActionConfig).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  record: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  records: PropTypes.array,
  onComplete: PropTypes.func,
  disabledRecordModal: PropTypes.bool
}

Action.defaultProps = {
  record: null,
  records: null,
  onComplete: null,
  disabledRecordModal: false
}

export default React.memo(Action);
