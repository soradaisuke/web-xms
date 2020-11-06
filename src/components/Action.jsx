import React, { useMemo } from 'react';
import { Button, Modal, Popconfirm } from 'antd';
import { useEventCallback } from '@qt/react';
import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import RecordLink from './RecordLink';
import ActionConfig from '../actions/Action';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import usePageConfig from '../hooks/usePageConfig';
import useForm from '../hooks/useForm';
import useActionConfig from '../hooks/useActionConfig';

function Action({
  action,
  record,
  records,
  onComplete,
  reload,
  disabledRecordModal,
}) {
  const form = useForm();
  const { table } = usePageConfig();
  const { params, disabled, invisible, onOk } = useActionConfig({
    action,
    record,
    records,
    reload,
    onComplete,
  });

  const buttonProps = useMemo(
    () => ({
      className: 'action-button',
      type:
        action.getLink() &&
        !disabled &&
        !(action instanceof CreateAction) &&
        !(action instanceof EditAction)
          ? 'link'
          : action.getType(),
      shape: action.getShape(),
      icon: action.getIcon(),
      children: action.getShape() !== 'circle' ? action.getTitle() : null,
      ...action.getButtonProps(),
      disabled,
    }),
    [action, disabled]
  );

  const onFormOk = useEventCallback(
    (f) =>
      (f || form)
        .validateFields()
        .then(async (values) => {
          try {
            await onOk({
              data: { body: values },
              throwError: true,
              reload: true,
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
        }),
    [form, onOk]
  );

  const onClick = useEventCallback(() => {
    const onOkInternal = disabledRecordModal ? onFormOk : onOk;
    if (action.showConfirmModal()) {
      const confirmTitle = action.getConfirmTitle();
      const confirmContent = action.getConfirmContent();
      Modal.confirm({
        title: isFunction(confirmTitle) ? confirmTitle(params) : confirmTitle,
        content: isFunction(confirmContent)
          ? confirmContent(params)
          : confirmContent,
        ...action.getConfirmProps(),
        onOk: onOkInternal,
      });
    } else {
      onOkInternal();
    }
  }, [action, params, onOk, disabledRecordModal, onFormOk]);

  if (invisible) {
    return null;
  }

  if (isFunction(action.getRender())) {
    return action.getRender()({ ...params, reload });
  }

  if (action.getLink() && !disabled) {
    return (
      <RecordLink
        link={action.getLink()}
        record={record || records}
        buttonProps={buttonProps}
      />
    );
  }

  if (
    (action.getColumns() ||
      action instanceof CreateAction ||
      action instanceof EditAction) &&
    !disabledRecordModal
  ) {
    const props = action.getColumns()
      ? {
          columns: action.getColumns(),
          records,
        }
      : {
          columns: table.getColumns(),
          actions: table.getFormActions(),
        };
    // eslint-disable-next-line global-require
    const RecordModal = require('./RecordModal').default;

    return (
      <RecordModal
        {...action.getModalProps()}
        {...props}
        key={action.getTitle()}
        title={action.getTitle()}
        record={record}
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

  return <Button {...buttonProps} onClick={onClick} />;
}

Action.propTypes = {
  action: PropTypes.instanceOf(ActionConfig).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  record: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  records: PropTypes.array,
  onComplete: PropTypes.func,
  reload: PropTypes.func,
  disabledRecordModal: PropTypes.bool,
};

Action.defaultProps = {
  reload: null,
  record: null,
  records: null,
  onComplete: null,
  disabledRecordModal: false,
};

export default React.memo(Action);
