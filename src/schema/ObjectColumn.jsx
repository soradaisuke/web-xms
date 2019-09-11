import { isString, isPlainObject } from 'lodash';
import React from 'react';
import { Input } from 'antd';
import Column from './Column';

export default class ObjectColumn extends Column {
  // eslint-disable-next-line class-methods-use-this
  formatFormFieldValue(v) {
    if (isPlainObject(v)) {
      return JSON.stringify(v);
    }
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    if (isString(v)) {
      return JSON.parse(v);
    }
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    return JSON.stringify(value);
  }

  renderInFormItem({ isEdit }) {
    return (
      <Input
        style={{ width: '100%' }}
        placeholder={this.getFormPlaceholder()}
        {...this.getFormComponentProps({ isEdit })}
      />
    );
  }
}
