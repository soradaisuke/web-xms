import React from 'react';
import moment from 'moment';
import { isFunction } from 'lodash';
import { DatePicker } from 'antd';
import StringColumn from './StringColumn';

export default class DateTimeColumn extends StringColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return 'YYYY-MM-DD';
  }

  // eslint-disable-next-line class-methods-use-this
  showTime() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v && isFunction(v.format) ? v.format('YYYY-MM-DD') : v;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    return v && isFunction(v.format) ? v.format('YYYY-MM-DD') : v;
  }

  getInTableFormat() {
    return this.config.getIn(
      ['table', 'format'],
      this.getDefaultInTableFormat()
    );
  }

  renderInDescriptionDefault({ value }) {
    return value && moment(value).isValid()
      ? moment(value).format(this.getInTableFormat())
      : '';
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
      <DatePicker
        allowClear
        showTime={this.showTime()}
        format={this.getInTableFormat()}
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
