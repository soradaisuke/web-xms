import React from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import { isNumber } from 'lodash';
import NumberColumn from './NumberColumn';

export default class DurationColumn extends NumberColumn {
  getInTableFormat() {
    return this.config.getIn(['table', 'format'], 'HH:mm:ss');
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormFieldValue(v) {
    return moment()
      .startOf('day')
      .add(v, 's');
  }

  renderInDescriptionDefault({ value }) {
    return isNumber(value)
      ? moment()
          .startOf('day')
          .add(value, 's')
          .format(this.getInTableFormat())
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
