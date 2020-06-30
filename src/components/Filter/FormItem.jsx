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

function FormItem({ column }) {
  const commonFormItemProps = useMemo(
    () => ({
      ...column.getFilterFormItemProps(),
      label: column.getTitle(),
      name: column.getFilterKey(),
      initialValue: column.getFilterRequired()
        ? column.getFilterDefault()
        : undefined
    }),
    [column]
  );

  const formItemProps = useMemo(() => {
    if (!column.canFilterOutside()) {
      return {
        noStyle: true,
        ...commonFormItemProps
      };
    }
    if (column.parentColumn) {
      return {
        noStyle: true,
        shouldUpdate: (prevValues, curValues) =>
          get(prevValues, column.parentColumn.getFilterKey()) !==
          get(curValues, column.parentColumn.getFilterKey())
      };
    }
    return commonFormItemProps;
  }, [column, commonFormItemProps]);

  const children = useMemo(() => {
    let inner;
    if (column.canFilterOutside()) {
      if (column.canFilterExpandable()) {
        if (column.canFilterMultiple()) {
          inner = (
            <CheckBox
              column={column}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        } else {
          inner = (
            <Radio
              column={column}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        }
      } else if (
        column.getFilters(null, 'disableInFilter') ||
        column.getFilterSearchRequest() ||
        column.getValueOptionsRequest()
      ) {
        inner = (
          <TreeSelect
            style={{ width: '100px' }}
            column={column}
            {...column.getFilterFormItemComponentProps()}
          />
        );
      } else if (column instanceof DateTimeColumn) {
        if (column.canFilterRange()) {
          inner = (
            <RangePicker
              presets={column.getFilterPresets()}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        } else {
          inner = (
            <DatePicker
              presets={column.getFilterPresets()}
              {...column.getFilterFormItemComponentProps()}
            />
          );
        }
      } else if (column instanceof DurationColumn) {
        if (column.canFilterRange()) {
          inner = (
            <DurationRangePicker
              {...column.getFilterFormItemComponentProps()}
            />
          );
        } else {
          inner = (
            <DurationPicker {...column.getFilterFormItemComponentProps()} />
          );
        }
      } else if (column instanceof NumberColumn) {
        if (column.canFilterRange()) {
          inner = (
            <InputRangeNumber {...column.getFilterFormItemComponentProps()} />
          );
        } else {
          inner = <InputNumber {...column.getFilterFormItemComponentProps()} />;
        }
      } else if (column instanceof StringColumn) {
        inner = <Input {...column.getFilterFormItemComponentProps()} />;
      }
    }

    if (formItemProps.shouldUpdate) {
      return () => <Form.Item {...commonFormItemProps}>{inner}</Form.Item>;
    }

    return inner;
  }, [column, commonFormItemProps, formItemProps.shouldUpdate]);

  return <Form.Item {...formItemProps}>{children}</Form.Item>;
}

FormItem.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired
};

export default React.memo(FormItem);
