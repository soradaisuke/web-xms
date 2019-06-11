import React from 'react';
import { Input, InputNumber, DatePicker, TimePicker } from 'antd';
import {
  toNumber,
  toString,
  join,
  map,
  isNumber,
  isArray,
  isNaN,
  isFunction,
  isUndefined
} from 'lodash';
import moment from 'moment';
import DatePickerWithPresets from '../components/DatePickerWithPresets';
import Select from '../components/FormItems/Select';
import UploadImage from '../components/FormItems/UploadImage';
import CommonArray from '../components/FormItems/CommonArray';
import InlineAudioPlayer from '../components/Common/InlineAudioPlayer';

const TYPES = {
  NUMBER: 'number',
  STRING: 'string',
  DATE: 'date',
  DATETIME: 'datetime',
  BOOL: 'bool',
  ORDER: 'order',
  IMAGE: 'image',
  URL: 'url',
  ARRAY: 'array',
  OBJECT: 'object',
  ENUM: 'enum',
  TIME: 'time',
  AUDIO: 'audio'
};

const generateTreeData = filters => {
  if (!isArray(filters)) return null;
  return map(filters, ({ value, text, children, ...item }) => ({
    value,
    key: value,
    title: text,
    children: generateTreeData(children),
    ...item
  }));
};

class BaseColumnType {
  // eslint-disable-next-line class-methods-use-this
  canCheckWhiteSpace() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  canInlineEdit() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  canUseColumnFilter() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormValue(v) {
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  formatSubmitValue(v) {
    return v;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormExtraConfig() {
    return {};
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultInitialValue() {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  getFormRules() {
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  mustHasFilters() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  mustHasMapKey() {
    return false;
  }

  renderValue = v => v;

  // eslint-disable-next-line class-methods-use-this
  renderFilterItem() {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFormItem() {
    return null;
  }
}

class PrimitiveColumnType extends BaseColumnType {
  constructor(primitiveType) {
    super();

    this.primitiveType = primitiveType;
  }

  canCheckWhiteSpace() {
    return this.primitiveType === TYPES.STRING;
  }

  canInlineEdit() {
    return this.primitiveType === TYPES.STRING;
  }

  canShowInForm() {
    switch (this.primitiveType) {
      case TYPES.NUMBER:
      case TYPES.STRING:
        return true;
      default:
        return super.canShowInForm();
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderFilterItem({ rangeFilter, onChange, value }) {
    if (this.primitiveType === TYPES.NUMBER && rangeFilter) {
      const newValue = value || [];
      return (
        <div>
          <InputNumber
            value={newValue[0]}
            onChange={v => onChange([v, newValue[1]])}
          />
          ~
          <InputNumber
            value={newValue[1]}
            onChange={v => onChange([newValue[0], v])}
          />
        </div>
      );
    }
    if (this.primitiveType === TYPES.NUMBER) {
      return <InputNumber value={value} onChange={v => onChange(v)} />;
    }
    return null;
  }

  getFormRules() {
    // eslint-disable-next-line class-methods-use-this
    switch (this.primitiveType) {
      case TYPES.NUMBER:
        return [
          {
            type: 'number',
            message: '格式不正确，要求为数字'
          }
        ];
      case TYPES.STRING:
        return [
          {
            type: 'string',
            message: '格式不正确，要求为字符串'
          }
        ];
      default:
        return super.getFormRules();
    }
  }

  getName() {
    return this.primitiveType;
  }

  formatSubmitValue(v) {
    switch (this.primitiveType) {
      case TYPES.STRING:
        return isUndefined(v) ? v : toString(v);
      case TYPES.NUMBER:
        // eslint-disable-next-line no-nested-ternary
        return isArray(v)
          ? v.map(item => (!isNaN(toNumber(item)) ? toNumber(item) : item))
          : !isNaN(toNumber(v))
          ? toNumber(v)
          : v;
      case TYPES.BOOL:
        return v && v !== 'false';
      case TYPES.DATE:
        return v && isFunction(v.format) ? v.format('YYYY-MM-DD') : v;
      case TYPES.DATETIME:
        return v && isFunction(v.toISOString) ? v.toISOString() : v;
      default:
        return super.formatSubmitValue(v);
    }
  }

  renderFormItem({ placeholder, title, formItemProps = {} }) {
    switch (this.primitiveType) {
      case TYPES.NUMBER:
        return (
          <InputNumber
            placeholder={placeholder || `请输入${title}`}
            {...formItemProps}
          />
        );
      case TYPES.STRING:
        return (
          <Input
            placeholder={placeholder || `请输入${title}`}
            {...formItemProps}
          />
        );
      default:
        return super.renderFormItem();
    }
  }

  renderValue = v => {
    switch (this.primitiveType) {
      case TYPES.BOOL:
        return v ? '是' : '否';
      case TYPES.DATE:
        return v && moment(v).isValid() ? moment(v).format('YYYY-MM-DD') : '';
      case TYPES.DATETIME:
        return v && moment(v).isValid()
          ? moment(v).format('YYYY-MM-DD HH:mm:ss')
          : '';
      default:
        return v;
    }
  };
}

const number = new PrimitiveColumnType(TYPES.NUMBER);
const string = new PrimitiveColumnType(TYPES.STRING);
const bool = new PrimitiveColumnType(TYPES.BOOL);

class BaseDateColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultInitialValue() {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.DATE;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormValue(v) {
    return v ? moment(v) : null;
  }

  renderFilterItem({ value, onChange, rangeFilter, filters, mapKey }) {
    // eslint-disable-next-line class-methods-use-this
    const ranges = {};
    if (rangeFilter && filters && filters.length) {
      filters.map(({ text, value: v }) => {
        if (!moment(v[0]).isValid() || !moment(v[1]).isValid()) {
          throw new Error(
            `mapKey: ${mapKey}: 存在RangePicker的filter的value是无效的moment`
          );
        }
        ranges[text] = [moment(v[0]), moment(v[1])];
        return null;
      });
    }
    if (rangeFilter) {
      const newValue = value || [];
      return (
        <DatePicker.RangePicker
          key={mapKey}
          showTime={this.showTime()}
          format={this.getFormat()}
          value={[
            newValue[0] && moment(newValue[0]).isValid()
              ? moment(newValue[0])
              : null,
            newValue[1] && moment(newValue[1]).isValid()
              ? moment(newValue[1])
              : null
          ]}
          ranges={ranges}
          onChange={newDate =>
            onChange([
              this.formatSubmitValue(newDate[0], true),
              this.formatSubmitValue(newDate[1], false)
            ])
          }
        />
      );
    }
    return (
      <DatePickerWithPresets
        key={mapKey}
        value={value && moment(value).isValid() ? moment(value) : null}
        showTime={this.showTime()}
        format={this.getFormat()}
        presets={filters}
        onChange={newDate => onChange(this.formatSubmitValue(newDate))}
      />
    );
  }

  renderFormItem({ formItemProps = {} }) {
    return <DatePicker showTime={this.showTime()} {...formItemProps} />;
  }

  renderValue = v =>
    v && moment(v).isValid() ? moment(v).format(this.getFormat()) : '';

  // eslint-disable-next-line class-methods-use-this
  showTime() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormat() {
    return 'YYYY-MM-DD';
  }

  // eslint-disable-next-line class-methods-use-this
  canUseColumnFilter() {
    return false;
  }
}

class DateColumnType extends BaseDateColumnType {
  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.DATE;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormValue(v) {
    return v ? moment(v) : null;
  }

  // eslint-disable-next-line class-methods-use-this
  formatSubmitValue(v) {
    return v && isFunction(v.format) ? v.format(this.getFormat()) : v;
  }

  // eslint-disable-next-line class-methods-use-this
  showTime() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormat() {
    return 'YYYY-MM-DD';
  }
}

class DateTimeColumnType extends BaseDateColumnType {
  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.DATETIME;
  }

  // eslint-disable-next-line class-methods-use-this
  formatSubmitValue(v) {
    return v && isFunction(v.toISOString) ? v.toISOString() : v;
  }

  // eslint-disable-next-line class-methods-use-this
  showTime() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormat() {
    return 'YYYY-MM-DD HH:mm:ss';
  }
}

class DateTimeDefaultRangeColumnType extends BaseDateColumnType {
  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.DATETIME;
  }

  // eslint-disable-next-line class-methods-use-this
  formatSubmitValue(v, start = true) {
    if (!(v && isFunction(v.toISOString))) return v;
    if (start)
      v.hour(0)
        .minute(0)
        .second(0);
    else
      v.hour(23)
        .minute(59)
        .second(59);
    return v.toISOString();
  }

  // eslint-disable-next-line class-methods-use-this
  getFormat() {
    return 'YYYY-MM-DD';
  }

  renderFilterItem(datas) {
    // eslint-disable-next-line class-methods-use-this
    return super.renderFilterItem({ ...datas, rangeFilter: true });
  }
}

class TimeColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultInitialValue() {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.TIME;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormValue(v) {
    return isNumber(v)
      ? moment()
          .startOf('day')
          .add(v, 's')
      : null;
  }

  // eslint-disable-next-line class-methods-use-this
  formatSubmitValue(v) {
    return v ? v.diff(moment(v).startOf('day'), 's') : 0;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFormItem({ formItemProps = {} }) {
    return (
      <TimePicker
        defaultOpenValue={moment().startOf('day')}
        {...formItemProps}
      />
    );
  }

  renderValue = v =>
    isNumber(v)
      ? moment()
          .startOf('day')
          .add(v, 's')
          .format(this.getFormat())
      : '';

  // eslint-disable-next-line class-methods-use-this
  getFormat() {
    return 'HH:mm:ss';
  }

  // eslint-disable-next-line class-methods-use-this
  canUseColumnFilter() {
    return false;
  }
}

class AudioColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultInitialValue() {
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.AUDIO;
  }

  renderValue = v => (v ? <InlineAudioPlayer url={v} /> : '');

  // eslint-disable-next-line class-methods-use-this
  getFormat() {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  canUseColumnFilter() {
    return false;
  }
}

class OrderColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = number;
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.ORDER;
  }

  // eslint-disable-next-line class-methods-use-this
  mustHasMapKey() {
    return true;
  }
}

class ImageColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormExtraConfig() {
    return { valuePropName: 'url' };
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.IMAGE;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFormItem({ user, tip, bucket = '', formItemProps = {} } = {}) {
    return (
      <UploadImage
        ssoToken={user ? user.get('sso_token') : ''}
        title={tip}
        bucket={bucket}
        {...formItemProps}
      />
    );
  }
}

class EnumColumnType extends BaseColumnType {
  constructor(innerColumnType) {
    super();
    this.innerColumnType = innerColumnType || string;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return true;
  }

  formatSubmitValue(v) {
    if (isArray(v)) {
      return v.map(value => this.innerColumnType.formatSubmitValue(value));
    }
    return this.innerColumnType.formatSubmitValue(v);
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.ENUM;
  }

  // eslint-disable-next-line class-methods-use-this
  mustHasFilters() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFilterItem({
    filters,
    value,
    onChange,
    filterMultiple,
    ...otherProps
  }) {
    return (
      <Select
        allowClear
        treeData={generateTreeData(isArray(filters) ? filters : [])}
        treeCheckable={filterMultiple}
        style={{ width: '100%' }}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderFormItem({ filters, selectProps = {}, formFieldValues }) {
    return (
      <Select
        treeData={generateTreeData(filters)}
        formFieldValues={formFieldValues}
        {...selectProps}
      />
    );
  }

  renderValue = values =>
    isArray(values)
      ? join(map(values, v => this.innerColumnType.renderValue(v)), ',')
      : values;
}

class UrlColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormRules() {
    return [
      {
        type: 'url',
        message: '格式不正确，要求为网络地址'
      }
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.URL;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFormItem({ placeholder, title, formItemProps = {} }) {
    return (
      <Input placeholder={placeholder || `请输入${title}`} {...formItemProps} />
    );
  }
}

class ArrayColumnType extends BaseColumnType {
  constructor(innerColumnType) {
    super();
    this.innerColumnType = innerColumnType;
  }

  // eslint-disable-next-line class-methods-use-this
  canShowInForm() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultInitialValue() {
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.ARRAY;
  }

  // eslint-disable-next-line class-methods-use-this
  renderFormItem({
    tip,
    max,
    placeholder,
    enableAdd,
    arrayGenerateValue,
    arrayRenderValue,
    formItemProps
  }) {
    return (
      <CommonArray
        title={tip}
        max={max}
        placeholder={placeholder}
        enableAdd={enableAdd}
        generateValue={arrayGenerateValue}
        renderValue={arrayRenderValue}
        formItemProps={formItemProps}
      />
    );
  }

  renderValue = values =>
    values
      ? join(map(values, v => this.innerColumnType.renderValue(v)), ',')
      : '';
}

class ObjectColumnType extends BaseColumnType {
  constructor(innerColumnType) {
    super();
    this.innerColumnType = innerColumnType;
  }

  // eslint-disable-next-line class-methods-use-this
  getName() {
    return TYPES.OBJECT;
  }

  renderValue = values =>
    values
      ? join(map(values, v => this.innerColumnType.renderValue(v)), ',')
      : '';
}

export default {
  number,
  string,
  bool,
  date: new DateColumnType(),
  datetime: new DateTimeColumnType(),
  datetimeDafaultRange: new DateTimeDefaultRangeColumnType(),
  time: new TimeColumnType(),
  order: new OrderColumnType(),
  image: new ImageColumnType(),
  url: new UrlColumnType(),
  audio: new AudioColumnType(),
  enumOf: innerColumnType => new EnumColumnType(innerColumnType),
  arrayOf: innerColumnType => new ArrayColumnType(innerColumnType),
  objectOf: innerColumnType => new ObjectColumnType(innerColumnType)
};
