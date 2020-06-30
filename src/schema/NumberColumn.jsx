import React from 'react';
import { toNumber, isNaN, map } from 'lodash';
import { InputNumber, Select } from 'antd';
import Column from './Column';

// toNumber('') = 0, toNumber(null) = 0, toNumber(undefined) = NAN
const formatNumber = n => (n && !isNaN(toNumber(n)) ? toNumber(n) : n);

export default class NumberColumn extends Column {
  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    if (this.canSelectMutipleInForm()) {
      return map(v, item => formatNumber(item));
    }
    return formatNumber(v);
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
          mode="tags"
          placeholder={this.getFormPlaceholder()}
          {...this.getFormComponentProps({ isEdit })}
          {...formComponentProps}
        />
      );
    }
    return (
      <InputNumber
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
