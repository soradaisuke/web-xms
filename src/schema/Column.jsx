import React from 'react';
import {
  isArray,
  isFunction,
  isUndefined,
  join,
  map,
  isEqual,
  get
} from 'lodash';
import { makeCancelablePromise } from '@qt/web-core';
import LinesEllipsis from 'react-lines-ellipsis';
import Immutable from 'immutable';
import { Button, Form } from 'antd';
import RecordLink from '../components/RecordLink';
import TreeSelect from '../components/FormItems/TreeSelect';
import './Column.less';

const FormItem = Form.Item;

function generateValidOptions(options) {
  if (options && options.size > 0) {
    return options
      .filter(o => !o.get('disableInFilter'))
      .map(o => {
        return o.set('children', generateValidOptions(o.get('children')));
      });
  }

  return options;
}

export default class Column {
  constructor(config = {}) {
    this.config = Immutable.fromJS({
      ...config,
      key: isArray(config.key) ? join(config.key, '.') : config.key
    });

    const valueOptions = this.getValueOptions();
    if (valueOptions) {
      this.filters = generateValidOptions(valueOptions);
    } else if (this.getParentKey()) {
      this.filters = Immutable.Map();
    }
  }

  getKey() {
    return this.config.get('key');
  }

  getTitle() {
    return this.config.get('title');
  }

  getValueOptions() {
    return this.config.get('valueOptions');
  }

  getValueOptionsRequest() {
    return this.config.get('valueOptionsRequest');
  }

  getParentKey() {
    return this.config.get('parentKey');
  }

  isPrimaryKey() {
    return this.config.get('primaryKey');
  }

  // table

  getTableTitle({ filtered, filteredValue, parentFilteredValue }) {
    if (filtered) {
      if (this.canFilterRangeInTable()) {
        return `${this.getTitle()}（${this.renderInTableValueDefault({
          value: get(filteredValue, '[0][0]'),
          parentFilteredValue
        }) || ''} ~ ${this.renderInTableValueDefault({
          value: get(filteredValue, '[0][1]'),
          parentFilteredValue
        }) || ''}）`;
      }
      if (this.canFilterMultipleInTable()) {
        return `${this.getTitle()}（${join(
          map(
            filteredValue,
            v =>
              this.renderInTableValueDefault({
                value: v,
                parentFilteredValue
              }) || ''
          ),
          '，'
        )}）`;
      }

      return `${this.getTitle()}（${this.renderInTableValueDefault({
        value: filteredValue[0],
        parentFilteredValue
      }) || ''}）`;
    }

    return this.getTitle();
  }

  getTableLink() {
    return this.config.getIn(['table', 'link']);
  }

  getTableSortDirections() {
    return this.config.getIn(['table', 'sortDirections'], Immutable.List());
  }

  getTableDefaultSortOrder() {
    return this.config.getIn(['table', 'defaultSortOrder']);
  }

  getTableFixedSortOrder() {
    return this.config.getIn(['table', 'fixedSortOrder']);
  }

  getFilters(parentFilteredValue) {
    if (this.getParentKey()) {
      if (isArray(parentFilteredValue)) {
        const list = Immutable.List(parentFilteredValue);
        const filters = list.map(v => this.filters.get(v)).filter(v => !!v);
        if (list.size !== filters.size) {
          return null;
        }

        return filters.flatten(true);
      }
      return this.filters.get(parentFilteredValue);
    }
    return this.filters;
  }

  getTableFilterKey() {
    return this.config.getIn(['table', 'filterKey']) || this.getKey();
  }

  getTableFilterComponentProps() {
    return this.config.getIn(
      ['table', 'filterComponentProps'],
      Immutable.Map()
    );
  }

  getTableWidth() {
    return this.config.getIn(['table', 'width'], undefined);
  }

  getTableFixed() {
    return this.config.getIn(['table', 'fixed']);
  }

  getTableMaxLines() {
    return this.config.getIn(['table', 'maxLines']);
  }

  canFilterInTable() {
    return this.config.getIn(['table', 'filter']);
  }

  canFilterMultipleInTable() {
    return this.config.getIn(['table', 'filterMultiple']);
  }

  canFilterRangeInTable() {
    return this.config.getIn(['table', 'filterRange']);
  }

  canSortInTable() {
    return this.getTableSortDirections().size > 0;
  }

  canShowInTable(user) {
    const invisible = this.config.getIn(['table', 'invisible']);
    if (isFunction(invisible)) {
      if (!user) {
        return false;
      }

      return !invisible({ user });
    }

    return !invisible;
  }

  // eslint-disable-next-line class-methods-use-this
  canRenderFilterDropDown() {
    return false;
  }

  useValueOptionsInTable() {
    return this.config.getIn(['table', 'useValueOptions']);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value, parentFilteredValue }) {
    const filters = this.getFilters(parentFilteredValue);
    if (filters) {
      const option = filters.find(o => o.get('value') === value);
      if (option) {
        return option.get('text');
      }
    }

    const maxLines = this.getTableMaxLines();
    if (maxLines > 0) {
      return (
        <LinesEllipsis
          text={value || ''}
          maxLine={maxLines}
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      );
    }
    return value;
  }

  renderInTableValue({ value, record, parentFilteredValue }) {
    const render = this.config.getIn(['table', 'render']);

    if (isFunction(render)) {
      return render({ value, record });
    }

    if (isArray(value)) {
      return (
        <React.Fragment>
          {map(value, v => (
            <React.Fragment key={v}>
              {this.renderInTableValueDefault({
                value: v,
                record,
                parentFilteredValue
              })}
              <br />
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }

    return this.renderInTableValueDefault({
      value,
      record,
      parentFilteredValue
    });
  }

  renderInTable({ value, record, parentFilteredValue }) {
    const children = this.renderInTableValue({
      value,
      record,
      parentFilteredValue
    });
    const link = this.getTableLink();

    if (link) {
      return (
        <RecordLink link={link} record={record}>
          {children}
        </RecordLink>
      );
    }
    return children;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFilterDropDownContent() {
    return null;
  }

  renderFilterDropDown = ({
    setSelectedKeys, // eslint-disable-line react/prop-types
    selectedKeys, // eslint-disable-line react/prop-types
    confirm, // eslint-disable-line react/prop-types
    clearFilters // eslint-disable-line react/prop-types
  }) => (
    <div style={{ padding: 8 }}>
      {// eslint-disable-next-line react/no-this-in-sfc
      this.renderFilterDropDownContent({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      })}
      <div className="filter-dropdown-button-wrapper">
        <Button
          type="primary"
          onClick={confirm}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          搜索
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    </div>
  );

  // form
  canShowInCreateFrom({ user, value, values, record }) {
    const creatable = this.config.getIn(['form', 'creatable']);
    if (isFunction(creatable)) {
      if (!user) {
        return false;
      }

      return creatable({ user, value, values, record });
    }

    return creatable;
  }

  canShowInEditFrom({ user, value, values, record }) {
    const creatable = this.config.getIn(['form', 'editable']);
    if (isFunction(creatable)) {
      if (!user) {
        return false;
      }

      return creatable({ user, value, values, record });
    }

    return creatable;
  }

  canShowEditInTable() {
    return this.config.getIn(['form', 'inlineEdit']);
  }

  canSelectMutipleInForm() {
    return this.config.getIn(['form', 'multiple']);
  }

  getFormKey() {
    return this.config.getIn(['form', 'key']) || this.getKey();
  }

  getFormInitialValue() {
    return this.config.getIn(['form', 'initialValue']);
  }

  getFormPlaceholder(select = false) {
    return (
      this.config.getIn(['form', 'placeholder']) ||
      `请${select ? '选择' : '输入'}${this.getTitle()}`
    );
  }

  getSearchPlaceholder() {
    return (
      this.config.getIn(['form', 'placeholder']) || `搜索${this.getTitle()}`
    );
  }

  getFormComponentProps() {
    return this.config.getIn(['form', 'componentProps'], Immutable.Map());
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultRules() {
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  getFormFiledValuePropName() {
    return 'value';
  }

  getFormRules() {
    return this.config.getIn(['form', 'rules'], Immutable.List());
  }

  getFormSearchRequest() {
    return this.config.getIn(['form', 'searchRequest']);
  }

  isRequiredInForm() {
    return this.config.getIn(['form', 'required']);
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormFieldValue(v) {
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  useValueOptionsInForm() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  renderInFormItem() {
    return null;
  }

  renderInForm({ user, record, form, isEdit, checkVisibility }) {
    const { getFieldsValue, getFieldDecorator } = form;

    const key = this.getFormKey();
    const values = getFieldsValue();
    const value = get(values, key);
    const parentValue = this.parentColumn
      ? get(values, this.parentColumn.getFormKey())
      : null;

    if (
      checkVisibility &&
      ((!isEdit &&
        !this.canShowInCreateFrom({
          user,
          record,
          value,
          values
        })) ||
        (isEdit &&
          !this.canShowInEditFrom({
            user,
            record,
            value,
            values
          })))
    ) {
      return null;
    }

    let children;
    let initialValue = this.getFormInitialValue();

    if (isEdit) {
      const preValue = get(record, key);
      if (isArray(preValue)) {
        initialValue = map(preValue, v => this.formatFormFieldValue(v));
      } else {
        initialValue = this.formatFormFieldValue(preValue);
      }
    }

    if (
      this.useValueOptionsInForm() &&
      (this.getFilters(parentValue) ||
        this.getValueOptionsRequest() ||
        this.getFormSearchRequest())
    ) {
      initialValue = initialValue === '' ? null : initialValue;
      children = <TreeSelect column={this} parentValue={parentValue} />;
    } else {
      children = this.renderInFormItem({ user });
    }

    return (
      <FormItem key={key} label={this.getTitle()}>
        {getFieldDecorator(key, {
          initialValue,
          validateFirst: true,
          onChange: this.childColumn
            ? () =>
                form.setFieldsValue({
                  [this.childColumn.getFormKey()]: undefined
                })
            : null,
          rules: [
            {
              required: this.isRequiredInForm(),
              message: `${this.getTitle()}不能为空`
            },
            ...this.getFormDefaultRules(),
            ...this.getFormRules().toArray()
          ],
          valuePropName: this.getFormFiledValuePropName()
        })(children)}
      </FormItem>
    );
  }

  async fetchValueOptions(parentFilteredValue) {
    const valueOptionsRequest = this.getValueOptionsRequest();

    if (valueOptionsRequest) {
      if (this.getParentKey()) {
        if (
          this.activeValueOptionsRequest &&
          !isEqual(
            this.activeValueOptionsRequest.parentFilteredValue,
            parentFilteredValue
          )
        ) {
          this.activeValueOptionsRequest.cancel();
          this.activeValueOptionsRequest = null;
        }
        if (
          !this.activeValueOptionsRequest &&
          !isUndefined(parentFilteredValue)
        ) {
          let promise;

          if (isArray(parentFilteredValue)) {
            promise = Promise.all(
              parentFilteredValue.map(v => {
                if (this.filters.get(v)) {
                  return Promise.resolve(v);
                }
                return valueOptionsRequest(v).then(result => {
                  this.filters = this.filters.set(
                    v,
                    generateValidOptions(Immutable.fromJS(result))
                  );
                });
              })
            ).then(() => {
              this.activeValueOptionsRequest = null;
            });
          } else {
            promise = valueOptionsRequest(parentFilteredValue).then(result => {
              this.filters = this.filters.set(
                parentFilteredValue,
                generateValidOptions(Immutable.fromJS(result))
              );
              this.activeValueOptionsRequest = null;
            });
          }
          this.activeValueOptionsRequest = makeCancelablePromise(promise);
          this.activeValueOptionsRequest.parentFilteredValue = parentFilteredValue;

          return this.activeValueOptionsRequest;
        }
      } else if (!this.activeValueOptionsRequest) {
        this.activeValueOptionsRequest = valueOptionsRequest().then(result => {
          this.filters = generateValidOptions(Immutable.fromJS(result));
          this.activeValueOptionsRequest = null;
        });

        return this.activeValueOptionsRequest;
      }
    }

    return Promise.reject();
  }
}