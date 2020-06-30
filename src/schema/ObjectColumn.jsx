import { isString } from 'lodash';
import React from 'react';
import Immutable from 'immutable';
import { Input } from 'antd';
import Column from './Column';
import DynamicItem from '../components/FormItems/DynamicItem';
import findCascadeColumn from '../utils/findCascadeColumn';

export default class ObjectColumn extends Column {
  constructor(data) {
    super(data);

    this.columns = data && data.columns ? Immutable.List(data.columns) : null;
    findCascadeColumn(this.columns);
  }

  getColumns() {
    return this.columns;
  }

  resetFilters() {
    super.resetFilters();

    if (this.columns && this.columns.size) {
      this.columns.forEach(column => column.resetFilters());
    }
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    if (isString(v)) {
      return JSON.parse(v);
    }
    return v;
  }

  renderInFormItem({
    user,
    record,
    value,
    values,
    isEdit,
    formComponentProps = {}
  }) {
    if (this.columns && this.columns.size) {
      return (
        <DynamicItem
          {...this.getFormComponentProps({
            isEdit,
            user,
            record,
            value,
            values
          })}
          {...formComponentProps}
          user={user}
          isEdit={isEdit}
          columns={this.columns}
        />
      );
    }
    return (
      <Input
        style={{ width: '100%' }}
        placeholder={this.getFormPlaceholder()}
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
