import React from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';
import StringColumn from './StringColumn';

export default class BaseDateTimeColumn extends StringColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return '';
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

  // eslint-disable-next-line class-methods-use-this
  showTime() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormFieldValue(value) {
    return value && moment(value).isValid() ? moment(value) : undefined;
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
