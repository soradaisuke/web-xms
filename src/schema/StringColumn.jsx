import React from 'react';
import { map } from 'lodash';
import { Input, Select } from 'antd';
import Column from './Column';

export default class StringColumn extends Column {
  getFormMultipleLine() {
    return this.config.getIn(['form', 'multipleLine']);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    if (this.canSelectMutipleInForm()) {
      return map(v, item => item || '');
    }
    return v || '';
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
          placeholder={this.getFormPlaceholder()}
          {...this.getFormComponentProps({
            isEdit,
            user,
            record,
            value,
            values
          })}
          {...formComponentProps}
        />
      );
    }
    return (
      <Input
        style={{ width: '100%' }}
        placeholder={this.getFormPlaceholder()}
        {...this.getFormComponentProps({
          isEdit,
          user,
          record,
          value,
          values
        })}
        {...formComponentProps}
      />
    );
  }
}
