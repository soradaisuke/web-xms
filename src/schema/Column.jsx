/* eslint-disable react/prop-types */
import React from 'react';
import {
  isArray,
  isFunction,
  isUndefined,
  join,
  map,
  isEqual,
  get,
  find,
  filter,
  forEach,
  flatten
} from 'lodash';
import LinesEllipsis from 'react-lines-ellipsis';
import Immutable from 'immutable';
import { Radio, Checkbox, Form } from 'antd';
import RecordLink from '../components/RecordLink';
import TreeSelect from '../components/FormItems/TreeSelect';
import './Column.less';
import generateAntdOptions from '../utils/generateAntdOptions';

const FormItem = Form.Item;

function generateValidOptions(options, disableKey) {
  if (options && options.length > 0) {
    return map(
      filter(options, o => !disableKey || !get(o, disableKey)),
      o => ({
        ...o,
        children: generateValidOptions(o.children)
      })
    );
  }

  return options;
}

function generateFilters(options) {
  return Immutable.Map({
    normal: generateValidOptions(options),
    disableInFilter: generateValidOptions(options, 'disableInFilter'),
    disableInForm: generateValidOptions(options, 'disableInForm')
  });
}

function findOption(options, value) {
  if (!options) {
    return null;
  }

  let option;

  forEach(options, o => {
    if (isEqual(o.value, value)) {
      option = o;
    }
    if (!option) {
      option = findOption(o.children, value);
    }

    return !option;
  });

  return option;
}

export default class Column {
  constructor(config = {}) {
    this.config = Immutable.fromJS({
      ...config,
      key: isArray(config.key) ? join(config.key, '.') : config.key
    });

    this.activeValueOptionsRequests = {};

    this.resetFilters();
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

  // filter

  getFilters(parentFilteredValue, key = 'normal') {
    if (this.getParentKey() && key !== 'search') {
      if (isArray(parentFilteredValue)) {
        const filters = filter(
          map(parentFilteredValue, v => this.filters.getIn([v, key])),
          v => !!v
        );
        if (parentFilteredValue.length !== filters.length) {
          return null;
        }

        return flatten(filters);
      }
      return this.filters
        ? this.filters.getIn([parentFilteredValue, key])
        : null;
    }
    return this.filters ? this.filters.get(key) : null;
  }

  getFilterKey() {
    return this.config.getIn(['table', 'filterKey']) || this.getKey();
  }

  getFilterFormItemProps() {
    if (!this.filterFormItemProps) {
      this.filterFormItemProps = this.config
        .getIn(['table', 'filterFormItemProps'], Immutable.Map())
        .toJS();
    }

    return this.filterFormItemProps;
  }

  getFilterFormItemComponentProps() {
    if (!this.filterFormItemComponentProps) {
      this.filterFormItemComponentProps = this.config
        .getIn(['table', 'filterFormItemComponentProps'], Immutable.Map())
        .toJS();
    }

    return this.filterFormItemComponentProps;
  }

  getFilterDefault() {
    return this.config.getIn(['table', 'filterDefault']);
  }

  getFilterRequired() {
    return this.config.getIn(['table', 'filterRequired']);
  }

  getFilterGroup() {
    return this.config.getIn(['table', 'filterGroup'], '');
  }

  getFilterPresets() {
    return this.config.getIn(['table', 'filterPresets'], Immutable.List([]));
  }

  getFilterSearchRequest() {
    return this.config.getIn(['table', 'filterSearchRequest']);
  }

  canFilterInTable() {
    return this.config.getIn(['table', 'filter']);
  }

  canFilterExpandable() {
    return this.config.getIn(['table', 'filterExpandable']);
  }

  canFilterMultiple() {
    return this.config.getIn(['table', 'filterMultiple']);
  }

  canFilterRange() {
    return this.config.getIn(['table', 'filterRange']);
  }

  canFilterOutside() {
    return this.config.getIn(['table', 'filterOutside'], true);
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

  resetFilters() {
    const valueOptions = this.getValueOptions();
    if (valueOptions) {
      this.filters = generateFilters(valueOptions.toJS());
    } else {
      this.filters = Immutable.Map();
    }
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
    const filters = this.getFilters(
      parentFilteredValue,
      this.getFilterSearchRequest() ? 'search' : 'normal'
    );
    const option = findOption(filters, value);
    if (option) {
      return option.text;
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

  renderInTableValue({ value, record, user, reload, parentFilteredValue }) {
    const render = this.config.getIn(['table', 'render']);

    if (isFunction(render)) {
      return render({ value, record, user, reload });
    }

    if (isArray(value)) {
      return (
        <>
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
        </>
      );
    }

    return this.renderInTableValueDefault({
      value,
      record,
      parentFilteredValue
    });
  }

  renderInTable({ value, record, user, reload, parentFilteredValue }) {
    const children = this.renderInTableValue({
      value,
      record,
      user,
      reload,
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

  // form
  isImmutableInForm({ user, value, values, record }) {
    const immutableInForm = this.config.getIn(['form', 'immutable']);
    if (isFunction(immutableInForm)) {
      return immutableInForm({ user, value, values, record });
    }
    return immutableInForm;
  }

  canShowInCreateFrom({ user, value, values, record }) {
    const creatable = this.config.getIn(['form', 'creatable']);
    if (isFunction(creatable)) {
      return creatable({ user, value, values, record });
    }

    return creatable;
  }

  canShowInEditFrom({ user, value, values, record }) {
    const creatable = this.config.getIn(['form', 'editable']);
    if (isFunction(creatable)) {
      return creatable({ user, value, values, record });
    }

    return creatable;
  }

  canInlineEdit() {
    return this.config.getIn(['form', 'inlineEdit']);
  }

  canSelectMutipleInForm() {
    return this.config.getIn(['form', 'multiple']);
  }

  getFormKey() {
    return this.config.getIn(['form', 'key']) || this.getKey();
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultInitialValue() {
    return undefined;
  }

  getFormInitialValue() {
    return (
      this.config.getIn(['form', 'initialValue']) ||
      this.getFormDefaultInitialValue()
    );
  }

  getFormGenerateSubmitValue() {
    return this.config.getIn(['form', 'generateSubmitValue']);
  }

  getFormGenerateInitialValue() {
    return this.config.getIn(['form', 'generateInitialValue']);
  }

  getFormPlaceholder(select = false) {
    return (
      this.config.getIn(['form', 'placeholder']) ||
      `请${select ? '选择' : '输入'}${this.getTitle()}`
    );
  }

  getFormSearchPlaceholder() {
    return (
      this.config.getIn(['form', 'searchPlaceholder']) ||
      `搜索${this.getTitle()}`
    );
  }

  getFormComponentProps({ isEdit, user, value, values, record }) {
    if (!this.formComponentProps) {
      this.formComponentProps = this.config
        .getIn(['form', 'componentProps'], Immutable.Map())
        .toJS();
    }
    if (isEdit) {
      return {
        disabled: this.isImmutableInForm({ user, value, values, record }),
        ...this.formComponentProps
      };
    }

    return this.formComponentProps;
  }

  getFormRadioOptions() {
    return this.config.getIn(['form', 'radioOptions'], Immutable.List());
  }

  getFormHint() {
    return this.config.getIn(['form', 'hint']);
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

  getFormRenderInFormItem() {
    return this.config.getIn(['form', 'renderInFormItem']);
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

  getFormExpandable() {
    return this.config.getIn(['form', 'expandable'], false);
  }

  shouldRenderCommonFormItem(parentValue) {
    return (
      this.useValueOptionsInForm() &&
      (this.getFilters(parentValue) ||
        this.getValueOptionsRequest() ||
        this.getFormSearchRequest())
    );
  }

  renderCommonFormItem({
    isEdit,
    user,
    record,
    value,
    values,
    parentValue,
    formComponentProps
  }) {
    let children;
    if (this.getFormExpandable() && this.getFilters(parentValue)) {
      const Component = this.canSelectMutipleInForm()
        ? Checkbox.Group
        : Radio.Group;
      const options = filter(
        this.getFilters(parentValue),
        ({ disableInForm }) => !disableInForm
      );
      children = (
        <Component
          {...this.getFormComponentProps({
            isEdit,
            user,
            record,
            value,
            values
          })}
          options={generateAntdOptions(options)}
          buttonStyle="solid"
          {...(formComponentProps || {})}
        />
      );
    } else {
      children = (
        <TreeSelect
          {...this.getFormComponentProps({
            isEdit,
            user,
            record,
            value,
            values
          })}
          column={this}
          parentValue={parentValue}
          {...(formComponentProps || {})}
        />
      );
    }
    return children;
  }

  // eslint-disable-next-line class-methods-use-this
  renderInFormItem() {
    return null;
  }

  generateFormInitialValue({ isEdit = false, record = {}, parentValue } = {}) {
    let initialValue = this.getFormInitialValue();
    const generateInitialValue = this.getFormGenerateInitialValue();

    if (isEdit) {
      const preValue = get(record, this.getKey());
      if (isFunction(generateInitialValue)) {
        initialValue = generateInitialValue({ value: preValue, parentValue });
      } else if (isArray(preValue)) {
        initialValue = map(preValue, v => this.formatFormFieldValue(v));
      } else {
        initialValue = this.formatFormFieldValue(preValue);
      }
    } else if (isFunction(generateInitialValue)) {
      initialValue = generateInitialValue({ value: null, parentValue });
    }

    if (
      this.shouldRenderCommonFormItem(parentValue) &&
      (!this.getFormExpandable() || !this.getFilters(parentValue))
    ) {
      initialValue = initialValue === '' ? null : initialValue;
    }

    return initialValue;
  }

  renderInForm({
    hideFormLabel,
    user,
    record,
    form,
    isEdit,
    checkVisibility,
    isFilter = false,
    formComponentProps
  }) {
    const { getFieldsValue } = form || {};

    const key = this.getFormKey();
    const values = getFieldsValue ? getFieldsValue() : null;
    const value = get(values, key);
    const parentValue =
      this.parentColumn && !isFilter
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
    const initialValue = this.generateFormInitialValue({
      isEdit,
      record,
      parentValue
    });

    if (this.shouldRenderCommonFormItem(parentValue)) {
      children = this.renderCommonFormItem({
        isEdit,
        user,
        record,
        value,
        values,
        parentValue,
        formComponentProps
      });
    } else {
      const renderInFormItem = this.getFormRenderInFormItem();
      children =
        renderInFormItem && !isFilter
          ? renderInFormItem({ user, isEdit, value, values, record })
          : this.renderInFormItem({
              user,
              record,
              value,
              values,
              isEdit,
              formComponentProps
            });
    }

    if (isFilter) {
      return children;
    }

    const rules = isFunction(this.getFormRules())
      ? this.getFormRules()({ user, record, value, values })
      : this.getFormRules().toJS();
    return (
      <FormItem
        validateFirst
        key={key}
        name={key}
        label={hideFormLabel ? '' : this.getTitle()}
        extra={this.getFormHint()}
        initialValue={initialValue}
        onChange={
          this.childColumn
            ? () => {
                forEach(this.childColumn, childColumn => {
                  if (!childColumn.canSelectMutipleInForm()) {
                    form.setFieldsValue({
                      [childColumn.getFormKey()]: undefined
                    });
                  }
                });
              }
            : null
        }
        rules={[
          {
            required: this.isRequiredInForm(),
            message: `${this.getTitle()}不能为空`
          },
          ...this.getFormDefaultRules(),
          ...rules
        ]}
        valuePropName={this.getFormFiledValuePropName()}
      >
        {children}
      </FormItem>
    );
  }

  // descriptions

  canShowInDescription({ user, record }) {
    const invisible = this.config.getIn(['detail', 'invisible']);
    if (isFunction(invisible)) {
      if (!user) {
        return false;
      }

      return !invisible({ user, record });
    }

    return !invisible;
  }

  getDescriptionWidth() {
    return this.config.getIn(['detail', 'width'], undefined);
  }

  getDescriptionSpan() {
    return this.config.getIn(['detail', 'span'], 1);
  }

  getDescriptionLink() {
    return this.config.getIn(['detail', 'link']);
  }

  // eslint-disable-next-line class-methods-use-this
  renderInDescriptionDefault({ value }) {
    const filters = this.getFilters();
    if (filters) {
      const option = find(filters, o => o.value === value);
      if (option) {
        return option.text;
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

  renderInDescriptionValue({ value, record }) {
    const render = this.config.getIn(['detail', 'render']);

    if (isFunction(render)) {
      return render({ value, record });
    }

    if (isArray(value)) {
      return (
        <>
          {map(value, v => (
            <React.Fragment key={v}>
              {this.renderInDescriptionDefault({
                value: v,
                record
              })}
              <br />
            </React.Fragment>
          ))}
        </>
      );
    }

    return this.renderInDescriptionDefault({
      value,
      record
    });
  }

  renderInDescription({ value, record }) {
    const children = this.renderInDescriptionValue({ value, record });
    const link = this.getDescriptionLink();

    if (link) {
      return (
        <RecordLink link={link} record={record}>
          {children}
        </RecordLink>
      );
    }
    return children;
  }

  fetchValueOptions(parentFilteredValue) {
    const valueOptionsRequest = this.getValueOptionsRequest();

    if (valueOptionsRequest) {
      if (this.getParentKey()) {
        if (this.activeValueOptionsRequests[parentFilteredValue]) {
          return this.activeValueOptionsRequests[parentFilteredValue];
        }
        if (
          !this.activeValueOptionsRequests[parentFilteredValue] &&
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
                  this.filters = this.filters.set(v, generateFilters(result));
                });
              })
            ).then(() => {
              this.activeValueOptionsRequests[parentFilteredValue] = null;
            });
          } else {
            promise = valueOptionsRequest(parentFilteredValue).then(result => {
              this.filters = this.filters.set(
                parentFilteredValue,
                generateFilters(result)
              );
              this.activeValueOptionsRequests[parentFilteredValue] = null;
            });
          }
          this.activeValueOptionsRequests[parentFilteredValue] = promise;

          return this.activeValueOptionsRequests[parentFilteredValue];
        }
      } else if (!this.activeValueOptionsRequests[parentFilteredValue]) {
        this.activeValueOptionsRequests[
          parentFilteredValue
        ] = valueOptionsRequest().then(result => {
          this.filters = generateFilters(result);
          this.activeValueOptionsRequests[parentFilteredValue] = null;
        });

        return this.activeValueOptionsRequests[parentFilteredValue];
      } else {
        return this.activeValueOptionsRequests[parentFilteredValue];
      }
    }

    return Promise.reject();
  }

  fetchSearchValueOptions(value) {
    const filterSearchRequest = this.getFilterSearchRequest();

    if (filterSearchRequest) {
      if (!this.activefilterSearchRequest) {
        this.activefilterSearchRequest = filterSearchRequest(value).then(
          result => {
            this.filters = this.filters.set('search', result);
            this.activefilterSearchRequest = null;
          }
        );

        return this.activefilterSearchRequest;
      }
    }

    return Promise.reject();
  }
}
