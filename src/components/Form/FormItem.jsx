import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input, Select, Switch } from 'antd';
import { get, concat, map, find, isArray, isPlainObject, trim } from 'lodash';
import { toNumber } from 'lodash/fp';
import UploadImage from './UploadImage';
import ObjectInputTextArea from './ObjectInputTextArea';
import TreeSelect from '../Filter/TreeSelect';
import Radio from '../Filter/Radio';
import CheckBox from '../Filter/CheckBox';
import DurationPicker from '../Filter/DurationPicker';
import DatePicker from '../Filter/DatePicker';
import Column from '../../schema/Column';
import UrlColumn from '../../schema/UrlColumn';
import NumberColumn from '../../schema/NumberColumn';
import StringColumn from '../../schema/StringColumn';
import DurationColumn from '../../schema/DurationColumn';
import DateTimeColumn from '../../schema/DateTimeColumn';
import BooleanColumn from '../../schema/BooleanColumn';
import ImageColumn from '../../schema/ImageColumn';
import ObjectColumn from '../../schema/ObjectColumn';
import useUser from '../../hooks/useUser';
import useForm from '../../hooks/useForm';

function FormItem({
  column,
  record,
  formItemComponentProps: extraFormItemComponentProps,
  hideLabel
}) {
  const user = useUser();
  const disabled = useMemo(() => column.isImmutableInForm({ user, record }), [
    column,
    user,
    record
  ]);

  const formItemComponentProps = useMemo(
    () => ({
      ...column.getFormItemComponentProps(),
      ...extraFormItemComponentProps,
      disabled
    }),
    [column, disabled, extraFormItemComponentProps]
  );

  const valuePropName = useMemo(() => {
    if (column instanceof BooleanColumn) {
      return 'checked';
    }
    if (column instanceof ImageColumn) {
      return 'url';
    }
    return 'value';
  }, [column]);

  const rules = useMemo(() => {
    let r = column.getFormItemRules();

    if (column instanceof UrlColumn) {
      r = concat(r, [
        {
          type: 'url',
          message: '格式不正确，要求为网络地址'
        }
      ]);
    }
    if (column.getFormRequired()) {
      r = concat(r, [
        {
          required: true
        }
      ]);
    }
    if (column instanceof ObjectColumn && !column.isArray()) {
      r = concat(r, [
        {
          validator: (_, value, cb) => {
            if (isPlainObject(value)) {
              cb();
            }
            if (trim(value)) {
              try {
                const result = JSON.parse(value);
                if (!isPlainObject(result)) {
                  throw new Error();
                }
              } catch (err) {
                cb(
                  '格式错误！例子：{"key1": "value1", "key2": "value2"}，其中除双引号里的内容以外的都要是英文字符'
                );
              }
            }
            cb();
          }
        }
      ]);
    }

    return r;
  }, [column]);

  const normalize = useMemo(() => {
    if (column instanceof NumberColumn && column.isArray()) {
      return value => map(value, v => toNumber(v));
    }
    return value => value;
  }, [column]);

  const initialValue = useMemo(() => {
    if (record && Object.keys(record).length > 0) {
      const curValue = get(record, column.getKey());
      if (column.getFormItemNormalizeInitialValue()) {
        return column.getFormItemNormalizeInitialValue()(curValue);
      }
      return curValue;
    }

    return column.getFormItemInitialValue();
  }, [record, column]);

  const form = useForm();

  useEffect(() => {
    form.setFieldsValue({
      [column.getFormItemName()]: initialValue
    });
  }, [column, form, initialValue]);

  const commonFormItemProps = useMemo(
    () => ({
      normalize,
      valuePropName,
      ...column.getFormItemProps(),
      label: hideLabel ? '' : column.getFormItemLabel(),
      name: column.getFormItemName(),
      rules
    }),
    [column, hideLabel, normalize, rules, valuePropName]
  );

  const formItemProps = useMemo(() => {
    if (column.parentColumn || column.getFormItemAvailableWhen().length > 0) {
      return {
        noStyle: true,
        shouldUpdate: (prevValues, curValues) => {
          if (
            column.parentColumn &&
            get(prevValues, column.parentColumn.getFormItemName()) !==
              get(curValues, column.parentColumn.getFormItemName())
          ) {
            return true;
          }
          if (column.getFormItemAvailableWhen().length > 0) {
            return !!find(
              column.getFormItemAvailableWhen(),
              ({ key }) => get(prevValues, key) !== get(curValues, key)
            );
          }
          return false;
        }
      };
    }
    return commonFormItemProps;
  }, [column, commonFormItemProps]);

  const children = useMemo(() => {
    let inner;

    if (column.canFormItemExpandable()) {
      if (column.isArray()) {
        inner = <CheckBox column={column} {...formItemComponentProps} />;
      } else {
        inner = <Radio column={column} {...formItemComponentProps} />;
      }
    } else if (
      column.getFilters(null, 'disableInForm') ||
      column.getValueOptionsSearchRequest() ||
      column.getValueOptionsRequest()
    ) {
      inner = (
        <TreeSelect
          forForm
          initialValueOptions={
            record &&
            Object.keys(record).length > 0 &&
            column.getFormItemNormalizeInitialValueOptions()
              ? column.getFormItemNormalizeInitialValueOptions()(
                  get(record, column.getKey())
                )
              : null
          }
          style={{ width: '100%' }}
          column={column}
          {...formItemComponentProps}
        />
      );
    } else if (column instanceof DateTimeColumn) {
      inner = (
        <DatePicker
          presets={column.getFormPresets()}
          format={column.getFormat()}
          {...formItemComponentProps}
        />
      );
    } else if (column instanceof DurationColumn) {
      inner = <DurationPicker {...formItemComponentProps} />;
    } else if (column instanceof ImageColumn) {
      inner = (
        <UploadImage
          ssoToken={user ? user.get('sso_token') : ''}
          {...formItemComponentProps}
        />
      );
    } else if (column instanceof BooleanColumn) {
      const options = column.getValueOptions();
      const checkedChildren = options
        .find(option => option.get('value'))
        .get('text');
      const unCheckedChildren = options
        .find(option => !option.get('value'))
        .get('text');

      inner = (
        <Switch
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          {...formItemComponentProps}
        />
      );
    } else if (column instanceof NumberColumn) {
      if (column.isArray()) {
        inner = (
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder={`输入${column.getTitle()}`}
            {...formItemComponentProps}
            mode="tags"
          />
        );
      } else {
        inner = (
          <InputNumber
            style={{ width: '100%' }}
            placeholder={`输入${column.getTitle()}`}
            {...formItemComponentProps}
          />
        );
      }
    } else if (column instanceof StringColumn) {
      if (column.isArray()) {
        inner = (
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder={`输入${column.getTitle()}`}
            {...formItemComponentProps}
            mode="tags"
          />
        );
      }
      if (column.getFormMultipleLine()) {
        inner = (
          <Input.TextArea
            allowClear
            style={{ width: '100%' }}
            placeholder={`输入${column.getTitle()}`}
            {...formItemComponentProps}
          />
        );
      }
      inner = (
        <Input
          allowClear
          style={{ width: '100%' }}
          placeholder={`输入${column.getTitle()}`}
          {...formItemComponentProps}
        />
      );
    } else if (column instanceof ObjectColumn) {
      inner = (
        <ObjectInputTextArea
          style={{ width: '100%' }}
          placeholder={`输入${column.getTitle()}`}
          {...formItemComponentProps}
        />
      );
    }

    if (formItemProps.shouldUpdate) {
      // eslint-disable-next-line react/prop-types
      return ({ getFieldValue }) => {
        const dependencies = column.getFormItemAvailableWhen();
        for (let i = 0; i < dependencies.length; i += 1) {
          const { key, value } = dependencies[i];
          const curValue = getFieldValue(key);

          if (isArray(value)) {
            if (!find(value, v => v === curValue)) {
              return null;
            }
          } else if (value !== curValue) {
            return null;
          }
        }
        return <Form.Item {...commonFormItemProps}>{inner}</Form.Item>;
      };
    }

    return inner;
  }, [
    column,
    commonFormItemProps,
    formItemComponentProps,
    formItemProps.shouldUpdate,
    record,
    user
  ]);

  return <Form.Item {...formItemProps}>{children}</Form.Item>;
}

FormItem.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  record: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  formItemComponentProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  hideLabel: PropTypes.bool
};

FormItem.defaultProps = {
  record: null,
  formItemComponentProps: {},
  hideLabel: false
};

export default React.memo(FormItem);
