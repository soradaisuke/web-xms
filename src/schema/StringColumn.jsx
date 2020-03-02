import React from 'react';
import { toString, isUndefined, map } from 'lodash';
import { Input, Select } from 'antd';
import Column from './Column';

export default class StringColumn extends Column {
  getFormMultipleLine() {
    return this.config.getIn(['form', 'multipleLine']);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return isUndefined(v) ? v : toString(v);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    if (this.canSelectMutipleInForm()) {
      return map(v, item => item || '');
    }
    return v || '';
  }

  // eslint-disable-next-line class-methods-use-this
  canRenderFilterDropDown() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFilterIcon() {
    return 'search';
  }

  renderFilterDropDownContent = ({
    setSelectedKeys, // eslint-disable-line react/prop-types
    selectedKeys, // eslint-disable-line react/prop-types
    confirm // eslint-disable-line react/prop-types
  }) => (
    <Input
      {...this.getTableFilterComponentProps()} // eslint-disable-line react/no-this-in-sfc
      value={selectedKeys[0]}
      onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={confirm}
      style={{ width: 188, marginBottom: 8, display: 'block' }}
    />
  );

  renderInFormItem({ isEdit }) {
    if (this.canSelectMutipleInForm()) {
      return (
        <Select
          style={{ width: '100%' }}
          mode="tags"
          placeholder={this.getFormPlaceholder()}
          {...this.getFormComponentProps({ isEdit })}
        />
      );
    }
    if (this.getFormMultipleLine()) {
      return (
        <Input.TextArea
          style={{ width: '100%' }}
          placeholder={this.getFormPlaceholder()}
          {...this.getFormComponentProps({ isEdit })}
        />
      );
    }
    return (
      <Input
        style={{ width: '100%' }}
        placeholder={this.getFormPlaceholder()}
        {...this.getFormComponentProps({ isEdit })}
      />
    );
  }
}
