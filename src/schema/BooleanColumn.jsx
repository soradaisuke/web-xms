import React from 'react';
import Immutable from 'immutable';
import { Switch } from 'antd';
import Column from './Column';

export default class BooleanColumn extends Column {
  getValueOptions() {
    return (
      super.getValueOptions() ||
      Immutable.fromJS([
        {
          text: '是',
          value: true
        },
        {
          text: '否',
          value: false
        }
      ])
    );
  }

  // eslint-disable-next-line class-methods-use-this
  useValueOptionsInTable() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  useValueOptionsInForm() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v && v !== 'false';
  }

  // eslint-disable-next-line class-methods-use-this
  getFormFiledValuePropName() {
    return 'checked';
  }

  renderInFormItem() {
    const options = this.getValueOptions();
    const checkedChildren = options
      .find(option => option.get('value'))
      .get('text');
    const unCheckedChildren = options
      .find(option => !option.get('value'))
      .get('text');

    return (
      <Switch
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
        {...this.getFormComponentProps().toJS()}
      />
    );
  }
}