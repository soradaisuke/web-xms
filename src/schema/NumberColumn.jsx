import React from 'react';
import { toNumber, isNaN, get, set } from 'lodash';
import { InputNumber } from 'antd';
import Column from './Column';

export default class NumberColumn extends Column {
  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return !isNaN(toNumber(v)) ? toNumber(v) : v;
  }

  // eslint-disable-next-line class-methods-use-this
  canRenderFilterDropDown() {
    return true;
  }

  renderFilterDropDownContent = ({
    setSelectedKeys, // eslint-disable-line react/prop-types
    selectedKeys, // eslint-disable-line react/prop-types
    confirm // eslint-disable-line react/prop-types
  }) => {
    // eslint-disable-next-line react/no-this-in-sfc
    if (this.canFilterRangeInTable()) {
      return (
        <div style={{ marginBottom: 8, display: 'block' }}>
          <InputNumber
            value={get(selectedKeys, '[0][0]')}
            onChange={value => {
              let newValue = [];
              try {
                newValue = [...selectedKeys[0]];
              } catch (e) {
                newValue = [];
              }
              setSelectedKeys([set(newValue, '[0]', value)]);
            }}
          />
          {' ~ '}
          <InputNumber
            value={get(selectedKeys, '[0][1]')}
            onChange={value => {
              let newValue = [];
              try {
                newValue = [...selectedKeys[0]];
              } catch (e) {
                newValue = [];
              }
              setSelectedKeys([set(newValue, '[1]', value)]);
            }}
          />
        </div>
      );
    }

    return (
      <InputNumber
        value={selectedKeys[0]}
        onChange={value => setSelectedKeys([value])}
        onPressEnter={confirm}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
    );
  };

  renderInFormItem() {
    return (
      <InputNumber
        style={{ width: '100%' }}
        placeholder={this.getFormPlaceholder()}
        {...this.getFormComponentProps().toJS()}
      />
    );
  }
}
