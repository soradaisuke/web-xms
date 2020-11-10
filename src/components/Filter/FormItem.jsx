import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Form, InputNumber, Input } from 'antd';
import { get } from 'lodash';
import Radio from './Radio';
import CheckBox from './CheckBox';
import InputRangeNumber from './InputRangeNumber';
import DurationPicker from './DurationPicker';
import DurationRangePicker from './DurationRangePicker';
import DatePicker from './DatePicker';
import RangePicker from './RangePicker';
import TreeSelect from './TreeSelect';
import Column from '../../schema/Column';
import NumberColumn from '../../schema/NumberColumn';
import StringColumn from '../../schema/StringColumn';
import DurationColumn from '../../schema/DurationColumn';
import DateTimeColumn from '../../schema/DateTimeColumn';
import usePageFilterForm from '../../hooks/usePageFilterForm';
import { resetChildColumn } from '../../utils/resetChildColumn';

function FormItem({ column }) {
  const commonFormItemProps = useMemo(
    () => ({
      ...column.getFilterFormItemProps(),
      label: column.getTitle(),
      name: column.getFilterKey(),
      initialValue: column.getFilterRequired()
        ? column.getFilterDefault()
        : undefined,
    }),
    [column]
  );

  const formItemProps = useMemo(() => {
    if (!column.canFilterOutside()) {
      return {
        noStyle: true,
        ...commonFormItemProps,
      };
    }
    if (column.parentColumn) {
      return {
        noStyle: true,
        shouldUpdate: (prevValues, curValues) =>
          get(prevValues, column.parentColumn.getFilterKey()) !==
          get(curValues, column.parentColumn.getFilterKey()),
      };
    }
    return commonFormItemProps;
  }, [column, commonFormItemProps]);

  const form = usePageFilterForm();

  const formItemComponentProps = useMemo(
    () => ({
      onChange: () => {
        resetChildColumn({ column, form });
      },
    }),
    [column, form]
  );

  const children = useMemo(() => {
    let inner;
    if (column.canFilterOutside()) {
      if (column.canFilterExpandable()) {
        if (column.canFilterMultiple()) {
          inner = (
            <CheckBox
              column={column}
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        } else {
          inner = (
            <Radio
              column={column}
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        }
      } else if (
        column.getFilters(null, Column.VALUE_OPTIONS_KEYS.DISABLED_IN_FILTER) ||
        (column.getValueOptionsSearchRequest() &&
          column.getUseValueOptionsSearchRequest() !==
            Column.SEARCH_REQUEST_TYPES.FORM) ||
        column.getValueOptionsRequest()
      ) {
        inner = (
          <TreeSelect
            style={{ minWidth: '120px' }}
            column={column}
            {...formItemComponentProps}
            {...column.getFilterFormItemComponentProps()}
          />
        );
      } else if (column instanceof DateTimeColumn) {
        if (column.canFilterRange()) {
          inner = (
            <RangePicker
              presets={column.getFilterPresets()}
              format={column.getFormat()}
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        } else {
          inner = (
            <DatePicker
              presets={column.getFilterPresets()}
              format={column.getFormat()}
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        }
      } else if (column instanceof DurationColumn) {
        if (column.canFilterRange()) {
          inner = (
            <DurationRangePicker
              format={column.getFormat()}
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        } else {
          inner = (
            <DurationPicker
              format={column.getFormat()}
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        }
      } else if (column instanceof NumberColumn) {
        if (column.canFilterRange()) {
          inner = (
            <InputRangeNumber
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        } else {
          inner = (
            <InputNumber
              {...formItemComponentProps}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        }
      } else if (column instanceof StringColumn) {
        inner = (
          <Input
            allowClear
            {...formItemComponentProps}
            {...column.getFilterFormItemComponentProps()}
          />
        );
      }
    }

    if (formItemProps.shouldUpdate) {
      // eslint-disable-next-line react/prop-types
      return ({ getFieldValue }) => {
        const parentValue = getFieldValue(column.parentColumn?.getFilterKey());
        return (
          <Form.Item key={JSON.stringify(parentValue)} {...commonFormItemProps}>
            {inner}
          </Form.Item>
        );
      };
    }

    return inner;
  }, [
    column,
    commonFormItemProps,
    formItemProps.shouldUpdate,
    formItemComponentProps,
  ]);

  return <Form.Item {...formItemProps}>{children}</Form.Item>;
}

FormItem.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
};

export default React.memo(FormItem);
