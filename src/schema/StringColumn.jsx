import React from 'react';
import { toString, isUndefined, map } from 'lodash';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Column from './Column';

export default class StringColumn extends Column {
  getFormMultipleLine() {
    return this.config.getIn(['form', 'multipleLine']);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return isUndefined(v) ? v : toString(v);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    if (this.canSelectMutipleInForm()) {
      return map(v, item => item || '');
    }
    return v || '';
  }

  // eslint-disable-next-line class-methods-use-this
  canRenderFilterDropDown() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFilterIcon() {
    return SearchOutlined;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowFormItemInEditableTable() {
    return true;
  }

  renderInFormItem({
    user,
    record,
    value,
    values,
    isEdit,
    formComponentProps = {}
  }) {
    if (this.canSelectMutipleInForm()) {
      return (
        <Select
          style={{ width: '100%' }}
          {...formComponentProps}
          mode="tags"
          placeholder={this.getFormPlaceholder()}
          {...this.getFormComponentProps({
            isEdit,
            user,
            record,
            value,
            values
          })}
        />
      );
    }
    if (this.getFormMultipleLine()) {
      return (
        <Input.TextArea
          style={{ width: '100%' }}
          {...formComponentProps}
          placeholder={this.getFormPlaceholder()}
          {...this.getFormComponentProps({
            isEdit,
            user,
            record,
            value,
            values
          })}
        />
      );
    }
    return (
      <Input
        style={{ width: '100%' }}
        {...formComponentProps}
        placeholder={this.getFormPlaceholder()}
        {...this.getFormComponentProps({
          isEdit,
          user,
          record,
          value,
          values
        })}
      />
    );
  }
}
