import React from 'react';
import {
  Input, InputNumber, DatePicker, TimePicker,
} from 'antd';
import {
  toNumber, toString, join, map, isNumber, isArray,
} from 'lodash';
import moment from 'moment';
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
  AUDIO: 'audio',
};

class BaseColumnType {
  canCheckWhiteSpace() { // eslint-disable-line class-methods-use-this
    return false;
  }

  canInlineEdit() { // eslint-disable-line class-methods-use-this
    return false;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return false;
  }

  canUseColumnFilter() { // eslint-disable-line class-methods-use-this
    return true;
  }

  formatFormValue(v) { // eslint-disable-line class-methods-use-this
    return v;
  }

  formatSubmitValue(v) { // eslint-disable-line class-methods-use-this
    return v;
  }

  getFormExtraConfig() { // eslint-disable-line class-methods-use-this
    return {};
  }

  getFormDefaultInitialValue() { // eslint-disable-line class-methods-use-this
    return '';
  }

  getFormRules() { // eslint-disable-line class-methods-use-this
    return [];
  }

  getName() { // eslint-disable-line class-methods-use-this
    return '';
  }

  mustHasFilters() { // eslint-disable-line class-methods-use-this
    return false;
  }

  mustHasMapKey() { // eslint-disable-line class-methods-use-this
    return false;
  }

  renderValue = v => v;

  renderFormItem() { // eslint-disable-line class-methods-use-this
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

  getFormRules() { // eslint-disable-line class-methods-use-this
    switch (this.primitiveType) {
      case TYPES.NUMBER:
        return [
          {
            type: 'number',
            message: '格式不正确，要求为数字',
          },
        ];
      case TYPES.STRING:
        return [
          {
            type: 'string',
            message: '格式不正确，要求为字符串',
          },
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
        return toString(v);
      case TYPES.NUMBER:
        return toNumber(v);
      case TYPES.BOOL:
        return v && v !== 'false';
      case TYPES.DATE:
        return v.format('YYYY-MM-DD');
      case TYPES.DATETIME:
        return v.toISOString();
      default:
        return super.formatSubmitValue(v);
    }
  }

  renderFormItem({ placeholder, title, formItemProps = {} }) {
    switch (this.primitiveType) {
      case TYPES.NUMBER:
        return (
          <InputNumber placeholder={placeholder || `请输入${title}`} {...formItemProps} />
        );
      case TYPES.STRING:
        return (
          <Input placeholder={placeholder || `请输入${title}`} {...formItemProps} />
        );
      default:
        return super.renderFormItem();
    }
  }

  renderValue = (v) => {
    switch (this.primitiveType) {
      case TYPES.BOOL:
        return v ? '是' : '否';
      case TYPES.DATE:
        return v && moment(v).isValid() ? moment(v).format('YYYY-MM-DD') : '';
      case TYPES.DATETIME:
        return v && moment(v).isValid() ? moment(v).format('YYYY-MM-DD HH:mm:ss') : '';
      default:
        return v;
    }
  }
}

const number = new PrimitiveColumnType(TYPES.NUMBER);
const string = new PrimitiveColumnType(TYPES.STRING);
const bool = new PrimitiveColumnType(TYPES.BOOL);

class DateColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getFormDefaultInitialValue() { // eslint-disable-line class-methods-use-this
    return null;
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.DATE;
  }

  formatFormValue(v) { // eslint-disable-line class-methods-use-this
    return v ? moment(v) : null;
  }

  formatSubmitValue(v) { // eslint-disable-line class-methods-use-this
    return v.format(this.getFormat());
  }

  renderFormItem({ formItemProps = {} }) {
    return (
      <DatePicker showTime={this.showTime()} {...formItemProps} />
    );
  }

  renderValue = v => (v && moment(v).isValid() ? moment(v).format(this.getFormat()) : '');

  showTime() { // eslint-disable-line class-methods-use-this
    return false;
  }

  getFormat() { // eslint-disable-line class-methods-use-this
    return 'YYYY-MM-DD';
  }

  canUseColumnFilter() { // eslint-disable-line class-methods-use-this
    return false;
  }
}

class DateTimeColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getFormDefaultInitialValue() { // eslint-disable-line class-methods-use-this
    return null;
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.DATETIME;
  }

  formatFormValue(v) { // eslint-disable-line class-methods-use-this
    return v ? moment(v) : null;
  }

  formatSubmitValue(v) { // eslint-disable-line class-methods-use-this
    return v.toISOString();
  }

  renderFormItem({ formItemProps = {} }) {
    return (
      <DatePicker showTime={this.showTime()} {...formItemProps} />
    );
  }

  renderValue = v => (v && moment(v).isValid() ? moment(v).format(this.getFormat()) : '');

  showTime() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getFormat() { // eslint-disable-line class-methods-use-this
    return 'YYYY-MM-DD HH:mm:ss';
  }

  canUseColumnFilter() { // eslint-disable-line class-methods-use-this
    return false;
  }
}

class TimeColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getFormDefaultInitialValue() { // eslint-disable-line class-methods-use-this
    return null;
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.TIME;
  }

  formatFormValue(v) { // eslint-disable-line class-methods-use-this
    return isNumber(v) ? moment().startOf('day').add(v, 's') : null;
  }

  formatSubmitValue(v) { // eslint-disable-line class-methods-use-this
    return v ? v.diff(moment(v).startOf('day'), 's') : 0;
  }

  renderFormItem({ formItemProps = {} }) { // eslint-disable-line class-methods-use-this
    return (
      <TimePicker defaultOpenValue={moment().startOf('day')} {...formItemProps} />
    );
  }

  renderValue = v => (
    isNumber(v)
      ? moment().startOf('day').add(v, 's').format(this.getFormat())
      : ''
  );

  getFormat() { // eslint-disable-line class-methods-use-this
    return 'HH:mm:ss';
  }

  canUseColumnFilter() { // eslint-disable-line class-methods-use-this
    return false;
  }
}


class AudioColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return false;
  }

  getFormDefaultInitialValue() { // eslint-disable-line class-methods-use-this
    return null;
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.AUDIO;
  }

  renderValue = v => (
    v ? <InlineAudioPlayer url={v} /> : ''
  );

  getFormat() { // eslint-disable-line class-methods-use-this
    return '';
  }

  canUseColumnFilter() { // eslint-disable-line class-methods-use-this
    return false;
  }
}

class OrderColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = number;
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.ORDER;
  }

  mustHasMapKey() { // eslint-disable-line class-methods-use-this
    return true;
  }
}

class ImageColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getFormExtraConfig() { // eslint-disable-line class-methods-use-this
    return { valuePropName: 'url' };
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.IMAGE;
  }

  renderFormItem({ user, tip }) { // eslint-disable-line class-methods-use-this
    return (
      <UploadImage ssoToken={user ? user.get('sso_token') : ''} title={tip} />
    );
  }
}

class EnumColumnType extends BaseColumnType {
  constructor(innerColumnType) {
    super();
    this.innerColumnType = innerColumnType || string;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.ENUM;
  }

  mustHasFilters() { // eslint-disable-line class-methods-use-this
    return true;
  }

  renderFormItem({ // eslint-disable-line class-methods-use-this
    filters, selectProps = {}, formFieldValues,
  }) {
    return (
      <Select
        options={map(filters, item => ({ key: item.value, children: item.text }))}
        formFieldValues={formFieldValues}
        {...selectProps}
      />
    );
  }

  renderValue = values => (isArray(values) ? join(map(values, v => this.innerColumnType.renderValue(v)), ',') : values);
}

class UrlColumnType extends BaseColumnType {
  constructor() {
    super();
    this.innerColumnType = string;
  }

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getFormRules() { // eslint-disable-line class-methods-use-this
    return [
      {
        type: 'url',
        message: '格式不正确，要求为网络地址',
      },
    ];
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.URL;
  }

  renderFormItem({ // eslint-disable-line class-methods-use-this
    placeholder, title, formItemProps = {},
  }) {
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

  canShowInForm() { // eslint-disable-line class-methods-use-this
    return true;
  }

  getFormDefaultInitialValue() { // eslint-disable-line class-methods-use-this
    return [];
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.ARRAY;
  }

  renderFormItem({ // eslint-disable-line class-methods-use-this
    tip, max, placeholder, enableAdd, arrayGenerateValue, arrayRenderValue, formItemProps,
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

  renderValue = values => (values ? join(map(values, v => this.innerColumnType.renderValue(v)), ',') : '');
}

class ObjectColumnType extends BaseColumnType {
  constructor(innerColumnType) {
    super();
    this.innerColumnType = innerColumnType;
  }

  getName() { // eslint-disable-line class-methods-use-this
    return TYPES.OBJECT;
  }

  renderValue = values => (values ? join(map(values, v => this.innerColumnType.renderValue(v)), ',') : '');
}

export default {
  number,
  string,
  bool,
  date: new DateColumnType(),
  datetime: new DateTimeColumnType(),
  time: new TimeColumnType(),
  order: new OrderColumnType(),
  image: new ImageColumnType(),
  url: new UrlColumnType(),
  audio: new AudioColumnType(),
  enumOf: innerColumnType => new EnumColumnType(innerColumnType),
  arrayOf: innerColumnType => new ArrayColumnType(innerColumnType),
  objectOf: innerColumnType => new ObjectColumnType(innerColumnType),
};
