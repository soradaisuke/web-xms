import React from 'react';
import Immutable from 'immutable';
import { isFunction, map, filter, get } from 'lodash';
import { Button, Modal, Popconfirm } from 'antd';
import RecordModal from '../components/RecordModal';
import RecordLink from '../components/RecordLink';

const { confirm: modalConfirm } = Modal;

export default class Action {
  constructor(config = {}) {
    this.config = Immutable.fromJS(config);

    if (config.columns) {
      this.columns = Immutable.List(config.columns);
      this.findCascadeColumn();
    }
  }

  findCascadeColumn() {
    this.columns.forEach(column => {
      const parentKey = column.getParentKey();
      if (parentKey) {
        const parentColumn = this.columns.find(c => c.getKey() === parentKey);
        if (parentColumn) {
          // eslint-disable-next-line no-param-reassign
          column.parentColumn = parentColumn;
          parentColumn.childColumn = column;
        }
      }
    });
  }

  isRowAction() {
    return !this.config.get('global');
  }

  isMultipleAction() {
    return this.config.get('multiple');
  }

  isGlobalAction() {
    return this.config.get('global') && !this.config.get('multiple');
  }

  getTitle() {
    return this.config.get('title');
  }

  getType() {
    return this.config.get('type', 'primary');
  }

  getShape() {
    return this.config.get('shape');
  }

  getIcon() {
    return this.config.get('icon');
  }

  getConfirmType() {
    return this.config.getIn(['confirm', 'type']);
  }

  getConfirmTitle() {
    return this.config.getIn(['confirm', 'title']);
  }

  getConfirmContent() {
    return this.config.getIn(['confirm', 'content']);
  }

  getConfirmComponentProps() {
    if (!this.confirmComponentProps) {
      this.confirmComponentProps = this.config
        .getIn(['confirm', 'componentProps'], Immutable.Map())
        .toJS();
    }
    return this.confirmComponentProps;
  }

  getLink() {
    return this.config.get('link');
  }

  getHandler() {
    return this.config.get('handler');
  }

  getHandlingMessage() {
    return this.config.get('handlingMessage');
  }

  getColumns() {
    return this.columns;
  }

  needReload() {
    return this.config.get('reload');
  }

  // eslint-disable-next-line class-methods-use-this
  checkVisibility() {
    return false;
  }

  isVisible(user) {
    const invisible = this.config.get('invisible');
    if (isFunction(invisible)) {
      if (!user) {
        return false;
      }

      return !invisible({ user });
    }

    return !invisible;
  }

  canHandleGlobal() {
    return this.isMultipleAction() && !this.isRowAction();
  }

  renderInteral({
    record,
    records,
    table,
    buttonProps,
    params,
    column,
    onClick
  }) {
    let columns;
    if (column) {
      columns = Immutable.List([column]);
    } else {
      columns = this.getColumns({ table, column });
    }

    if (columns) {
      return (
        <RecordModal
          columns={columns}
          key={this.getTitle()}
          record={record}
          records={records}
          checkVisibility={this.checkVisibility()}
          onOk={body =>
            onClick({
              data: { body },
              loadingMessage: null,
              throwError: true,
              reload: true
            })
          }
        >
          <Button {...buttonProps} />
        </RecordModal>
      );
    }

    const confirmType = this.getConfirmType();
    const confirmTitle = this.getConfirmTitle();
    const confirmContent = this.getConfirmContent();

    if (confirmType === 'pop' && !buttonProps.disabled) {
      return (
        <Popconfirm
          {...this.getConfirmComponentProps()}
          key={this.getTitle()}
          title={isFunction(confirmTitle) ? confirmTitle(params) : confirmTitle}
          onConfirm={onClick}
        >
          <Button {...buttonProps} />
        </Popconfirm>
      );
    }

    let click = onClick;
    if (confirmTitle) {
      click = () =>
        modalConfirm({
          ...this.getConfirmComponentProps(),
          title: isFunction(confirmTitle) ? confirmTitle(params) : confirmTitle,
          content: isFunction(confirmContent)
            ? confirmContent(params)
            : confirmContent,
          onOk: onClick
        });
    }

    return <Button {...buttonProps} onClick={click} key={this.getTitle()} />;
  }

  render({
    record,
    records,
    user,
    submit,
    confirm,
    matchParams,
    create,
    remove,
    edit,
    table,
    column
  }) {
    const render = this.config.get('render');
    const params = {
      record,
      records,
      user,
      matchParams,
      id: get(record, table.getPrimaryKey())
    };

    if (isFunction(render)) {
      return render({ ...params, reload: confirm });
    }

    const enable = this.config.get('enable');
    let disabled;
    let filteredRecords;

    if (this.canHandleGlobal()) {
      disabled =
        (records && records.length === 0) ||
        (isFunction(enable) && !enable(params));
    } else {
      filteredRecords = records
        ? filter(records, r =>
            isFunction(enable)
              ? enable({ ...params, records: null, record: r })
              : true
          )
        : null;

      if (records) {
        disabled = filteredRecords && filteredRecords.length === 0;
      } else {
        disabled = isFunction(enable) && !enable(params);
      }
    }

    if (disabled && this.isRowAction() && record) {
      return null;
    }

    const handler = this.getHandler({ remove, create, edit });
    let children;

    if (this.getLink() && !disabled) {
      children = (
        <RecordLink link={this.getLink()} record={record || records}>
          {this.getTitle()}
        </RecordLink>
      );
    } else if (this.getShape() !== 'circle') {
      children = this.getTitle();
    }

    const buttonProps = {
      disabled,
      children,
      type: this.getType(),
      shape: this.getShape(),
      icon: this.getIcon(),
      className: 'action-button'
    };

    const onClick = ({
      data = {},
      loadingMessage = this.getHandlingMessage(),
      throwError = false,
      reload = this.needReload()
    } = {}) => {
      if (isFunction(handler)) {
        let promise;

        if (this.canHandleGlobal()) {
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

        submit({
          promise,
          throwError,
          loadingMessage,
          reload
        });
      }
    };

    return this.renderInteral({
      record,
      records,
      table,
      buttonProps,
      params,
      column,
      onClick
    });
  }
}
