import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { isNumber } from 'lodash';
import NumberColumn from './NumberColumn';

export default class TimeColumn extends NumberColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return 'HH:mm:ss';
  }

  getInTableFormat() {
    return this.config.getIn(
      ['table', 'format'],
      this.getDefaultInTableFormat()
    );
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormFieldValue(v) {
    return moment()
      .startOf('day')
      .add(v, 's');
  }

  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    return isNumber(value)
      ? moment()
          .startOf('day')
          .add(value, 's')
          .format(this.getInTableFormat())
      : '';
  }

  renderInDescriptionDefault({ value }) {
    return this.renderInTableValueDefault({ value });
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
      <TimePicker
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

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    return v.diff(moment().startOf('day')) / 1000;
  }
}
