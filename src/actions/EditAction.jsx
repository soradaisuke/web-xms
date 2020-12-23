import React from 'react';
import { isFunction, get } from 'lodash';
import { EditOutlined } from '@ant-design/icons';
import Action from './Action';

export default class EditAction extends Action {
  constructor(config = {}) {
    super({
      successMessage: '编辑成功',
      ...config,
    });
  }

  getShape() {
    return this.config.get('shape', 'circle');
  }

  getIcon() {
    return this.config.get('icon', <EditOutlined />);
  }

  getTitle() {
    return this.config.get('title', '编辑');
  }

  getHandlingMessage() {
    return this.config.get('handlingMessage', '正在保存……');
  }

  isDisabled({ user, record, records, matchParams, table }) {
    const enable = this.config.get('enable');
    return (
      isFunction(enable) &&
      !enable({
        record,
        records,
        user,
        matchParams,
        id: get(record, table.getPrimaryKey()),
      })
    );
  }

  setLink(link) {
    return new EditAction(this.config.set('link', link).toJS());
  }

  setTitle(title) {
    return new EditAction(this.config.set('title', title).toJS());
  }

  setIcon(icon) {
    return new EditAction(this.config.set('icon', icon).toJS());
  }

  setShape(shape) {
    return new EditAction(this.config.set('shape', shape).toJS());
  }

  // eslint-disable-next-line class-methods-use-this
  needReload() {
    return true;
  }
}
