import React from 'react';
import { DatePicker } from 'antd';
import { isFunction } from 'lodash';
import BaseDateTimeColumn from './BaseDateTimeColumn';

const { MonthPicker } = DatePicker;

export default class MonthColumn extends BaseDateTimeColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return 'YYYY-MM';
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v && isFunction(v.format) ? v.format('YYYY-MM') : v;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    return v && isFunction(v.format) ? v.format('YYYY-MM') : v;
  }

  renderInFormItem({
    user,
    record,
    value,
    values,
    isEdit,
    formComponentProps = {}
  }) {
    return (
      <MonthPicker
        allowClear
        format={this.getInTableFormat()}
        {...this.getFormComponentProps({ isEdit, user, record, value, values })}
        {...formComponentProps}
      />
    );
  }
}
