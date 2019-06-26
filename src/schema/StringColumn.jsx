import React from 'react';
import { toString, isUndefined } from 'lodash';
import { Input } from 'antd';
import Column from './Column';

export default class StringColumn extends Column {
  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return isUndefined(v) ? v : toString(v);
  }

  // eslint-disable-next-line class-methods-use-this
  canRenderFilterDropDown() {
    return true;
  }

  renderFilterDropDownContent = ({
    setSelectedKeys, // eslint-disable-line react/prop-types
    selectedKeys, // eslint-disable-line react/prop-types
    confirm // eslint-disable-line react/prop-types
  }) => (
    <Input
      value={selectedKeys[0]}
      onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={confirm}
      style={{ width: 188, marginBottom: 8, display: 'block' }}
    />
  );

  renderInFormItem() {
    return (
      <Input
        style={{ width: '100%' }}
        placeholder={this.getFormPlaceholder()}
        {...this.getFormComponentProps().toJS()}
      />
    );
  }
}
