import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {
  Form,
  InputNumber,
  Input,
  Select,
  Switch,
  Card,
  Popconfirm,
  Button,
  Space,
} from 'antd';
import { get, concat, map, isPlainObject, trim } from 'lodash';
import { toNumber } from 'lodash/fp';
import {
  PlusOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
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
import usePageConfig from '../../hooks/usePageConfig';
import './FormItem.less';

function FormItem({
  column,
  record,
  formItemComponentProps: extraFormItemComponentProps,
  commonFormItemProps: extraCommonFormItemProps,
  hideLabel,
  shouldSetInitialValue,
}) {
  const user = useUser();
  const disabled = useMemo(() => column.isImmutableInForm({ user, record }), [
    column,
    user,
    record,
  ]);

  const formItemComponentProps = useMemo(
    () => ({
      ...column.getFormItemComponentProps(),
      ...extraFormItemComponentProps,
      disabled,
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
          message: '格式不正确，要求为网络地址',
        },
      ]);
    }
    if (column.getFormRequired()) {
      r = concat(r, [
        {
          required: true,
        },
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
          },
        },
      ]);
    }

    return r;
  }, [column]);

  const normalize = useMemo(() => {
    if (column instanceof NumberColumn && column.isArray()) {
      return (value) => map(value, (v) => toNumber(v));
    }
    return (value) => value;
  }, [column]);

  const { initialValue, initialListItemValue } = useMemo(() => {
    let initialValueInner = column.getFormItemInitialValue();
    if (record && Object.keys(record).length > 0) {
      const curValue = get(record, column.getKey());
      if (column.getFormItemNormalizeInitialValue()) {
        initialValueInner = column.getFormItemNormalizeInitialValue()(curValue);
      }
      initialValueInner = curValue;
    }

    return {
      initialValue: initialValueInner,
      initialListItemValue: column.getColumns?.()?.reduce(
        (result, c) => ({
          ...result,
          [c.getFormItemName()]: c.getFormItemInitialValue(),
        }),
        {}
      ),
    };
  }, [record, column]);

  const form = useForm();

  useEffect(() => {
    if (shouldSetInitialValue) {
      // eslint-disable-next-line no-unused-expressions
      form?.setFieldsValue({
        [column.getFormItemName()]: initialValue,
      });
    }
  }, [column, form, initialValue, shouldSetInitialValue]);

  const commonFormItemProps = useMemo(
    () => ({
      normalize,
      valuePropName,
      ...column.getFormItemProps(),
      label: hideLabel ? '' : column.getFormItemLabel(),
      name: column.getFormItemName(),
      rules,
      ...extraCommonFormItemProps,
    }),
    [
      column,
      hideLabel,
      normalize,
      rules,
      valuePropName,
      extraCommonFormItemProps,
    ]
  );

  const formItemProps = useMemo(() => {
    if (column.parentColumn || column.getFormItemAvailableWhen().size > 0) {
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
          if (column.getFormItemAvailableWhen().size > 0) {
            return !!column
              .getFormItemAvailableWhen()
              .find((_, key) => get(prevValues, key) !== get(curValues, key));
          }
          return false;
        },
      };
    }
    return commonFormItemProps;
  }, [column, commonFormItemProps]);

  const { idIdentifier } = usePageConfig();

  const children = useMemo(() => {
    let inner;

    if (column.canFormItemExpandable()) {
      if (column.isArray()) {
        inner = <CheckBox column={column} {...formItemComponentProps} />;
      } else {
        inner = <Radio column={column} {...formItemComponentProps} />;
      }
    } else if (column instanceof BooleanColumn) {
      const options = column.getValueOptions();
      const checkedChildren = options
        .find((option) => option.get('value'))
        .get('text');
      const unCheckedChildren = options
        .find((option) => !option.get('value'))
        .get('text');

      inner = (
        <Switch
          checkedChildren={checkedChildren}
          unCheckedChildren={unCheckedChildren}
          {...formItemComponentProps}
        />
      );
    } else if (
      column.getFilters(null, 'disabledInForm') ||
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
      if (!column.isArray()) {
        inner = (
          <ObjectInputTextArea
            style={{ width: '100%' }}
            placeholder={`输入${column.getTitle()}`}
            {...formItemComponentProps}
          />
        );
      } else {
        const { name } = commonFormItemProps;
        const WrapComponent = idIdentifier ? React.Fragment : Card;
        const WrapItemsComponent = idIdentifier ? Space : React.Fragment;
        const deleteButton = idIdentifier ? (
          <MinusCircleOutlined className="dynamic-delete-in-page" />
        ) : (
          <DeleteOutlined className="dynamic-delete" />
        );

        inner = (
          <Form.List name={name}>
            {(fields, { add, remove }) => (
              <div>
                {fields.map((field) => (
                  <Form.Item key={field.key}>
                    <WrapComponent
                      className={idIdentifier ? 'dynamic-card' : null}
                    >
                      <WrapItemsComponent style={{ flexWrap: 'wrap' }}>
                        {column.getColumns().map((dColumn) => (
                          <FormItem
                            shouldSetInitialValue={false}
                            key={dColumn.getFormItemName()}
                            column={dColumn}
                            record={record}
                            commonFormItemProps={{
                              ...field,
                              name: [field.name, dColumn.getFormItemName()],
                              fieldKey: [
                                field.fieldKey,
                                dColumn.getFormItemName(),
                              ],
                            }}
                          />
                        ))}
                        <Popconfirm
                          title="确认删除？"
                          onConfirm={() => remove(field.name)}
                        >
                          {deleteButton}
                        </Popconfirm>
                      </WrapItemsComponent>
                    </WrapComponent>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={() => add(initialListItemValue)}
                  >
                    <PlusOutlined /> 添加
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List>
        );
      }
    }

    if (formItemProps.shouldUpdate) {
      // eslint-disable-next-line react/prop-types
      return ({ getFieldValue }) => {
        if (
          column.getFormItemAvailableWhen().find((value, key) => {
            const curValue = getFieldValue(key);
            if (value instanceof Immutable.List) {
              if (!value.find((v) => v === curValue)) {
                return true;
              }
            } else if (value !== curValue) {
              return true;
            }
            return false;
          })
        ) {
          return null;
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
    user,
    idIdentifier,
    initialListItemValue,
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
  commonFormItemProps: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  hideLabel: PropTypes.bool,
  shouldSetInitialValue: PropTypes.bool,
};

FormItem.defaultProps = {
  shouldSetInitialValue: true,
  record: null,
  formItemComponentProps: {},
  commonFormItemProps: {},
  hideLabel: false,
};

export default React.memo(FormItem);
