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
  isBoolean,
  flatten
} from 'lodash';
import LinesEllipsis from 'react-lines-ellipsis';
import Immutable from 'immutable';
import { FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Radio, Checkbox, Form } from 'antd';
import RecordLink from '../components/RecordLink';
import TreeSelect from '../components/FormItems/TreeSelect';
import TreeFilter from '../components/TreeFilter';
import './Column.less';
import generateAntdOptions from '../utils/generateAntdOptions';

export const DEFAULT_GROUP_NAME = '其它筛选项';

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

  canFilterExpand() {
    return (
      this.config.getIn(['table', 'filterExpandable']) ||
      this.config.getIn(['table', 'expandFilter'])
    );
  }

  isPrimaryKey() {
    return this.config.get('primaryKey');
  }

  // table

  getTableTitle({ filtered, filteredValue, parentFilteredValue }) {
    if (
      !filteredValue ||
      !filteredValue.length ||
      (filteredValue.length === 1 && filteredValue[0] === null)
    )
      return this.getTitle();
    if (filtered) {
      if (this.canFilterRangeInTable()) {
        return `${this.getTitle()}（${this.renderInTableValueDefault({
          value: get(filteredValue, '[0][0]'),
          parentFilteredValue
        })} ~ ${this.renderInTableValueDefault({
          value: get(filteredValue, '[0][1]'),
          parentFilteredValue
        })}）`;
      }
      if (this.canFilterMultipleInTable()) {
        if (filteredValue.length > 3) {
          return `${this.getTitle()}（已选${filteredValue.length}个）`;
        }
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

  getTableFixedFilterValue() {
    const value = isBoolean(this.getTableFilterRequired())
      ? this.getTableFilterDefault()
      : this.getTableFilterRequired();
    return this.getTableFilterRequired() ? value : null;
  }

  getFilters(parentFilteredValue, key = 'normal') {
    if (this.getParentKey()) {
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

  getTableFilterKey() {
    return this.config.getIn(['table', 'filterKey']) || this.getKey();
  }

  getTableFilterComponentProps() {
    if (!this.tableFilterComponentProps) {
      this.tableFilterComponentProps = this.config
        .getIn(['table', 'filterComponentProps'], Immutable.Map())
        .toJS();
    }

    return this.tableFilterComponentProps;
  }

  getTableFilterDefault() {
    return this.config.getIn(['table', 'filterDefault']);
  }

  getTableFilterRequired() {
    return this.config.getIn(['table', 'filterRequired']);
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

  getFilterGroup() {
    return this.config.getIn(['table', 'filterGroup'], DEFAULT_GROUP_NAME);
  }

  getTableFilterSearchRequest() {
    return this.config.getIn(['table', 'filterSearchRequest']);
  }

  resetFilters() {
    const valueOptions = this.getValueOptions();
    if (valueOptions) {
      this.filters = generateFilters(valueOptions.toJS());
    } else {
      this.filters = Immutable.Map();
    }
  }

  isFilterOutside() {
    return this.config.getIn(['table', 'filterOutside']);
  }

  shouldRenderTableFilter(user) {
    return (
      this.canFilterInTable() &&
      !this.shouldRenderOutsideFilter(user) &&
      !this.shouldRenderExpandFilter()
    );
  }

  shouldRenderOutsideFilter(user) {
    return (
      this.canFilterInTable() &&
      !this.canFilterExpand() &&
      (this.isFilterOutside() || !this.canShowInTable(user))
    );
  }

  shouldRenderExpandFilter() {
    return this.canFilterInTable() && this.canFilterExpand();
  }

  canFilterInTable() {
    return this.config.getIn(['table', 'filter']);
  }

  canFilterTreeInTable() {
    return this.config.getIn(['table', 'filterTree']);
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
  canShowFormItemInEditableTable() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  canRenderFilterDropDown() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  getFilterIcon() {
    return FilterOutlined;
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
      this.getTableFilterSearchRequest() ? 'search' : 'normal'
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

  // eslint-disable-next-line class-methods-use-this
  renderFilterDropDownContent() {
    return null;
  }

  renderFilterDropDown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    isAutoTrigger
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
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          {!isAutoTrigger ? '确定' : '搜索'}
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    </div>
  );

  // eslint-disable-next-line class-methods-use-this
  getRenderFilterTree({ parentValue }) {
    return ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      isAutoTrigger
    }) => (
      <div style={{ padding: 8 }}>
        <TreeFilter
          column={this}
          parentValue={parentValue}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
        <div className="filter-dropdown-button-wrapper">
          <Button
            type="primary"
            onClick={confirm}
            icon={<FilterOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            {isAutoTrigger ? '筛选' : '确定'}
          </Button>
          <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
            重置
          </Button>
        </div>
      </div>
    );
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
    return null;
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
    const filterSearchRequest = this.getTableFilterSearchRequest();

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

  // eslint-disable-next-line class-methods-use-this
  renderInlineEdit() {
    return null;
  }
}
