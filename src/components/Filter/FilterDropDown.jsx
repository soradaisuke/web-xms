import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { forEach } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import { Button, InputNumber, Input } from 'antd';
import { useEventCallback } from '@qt/react';
import DatePicker from './DatePicker';
import RangePicker from './RangePicker';
import Tree from './Tree';
import InputRangeNumber from './InputRangeNumber';
import DurationPicker from './DurationPicker';
import DurationRangePicker from './DurationRangePicker';
import NumberColumn from '../../schema/NumberColumn';
import StringColumn from '../../schema/StringColumn';
import DurationColumn from '../../schema/DurationColumn';
import DateTimeColumn from '../../schema/DateTimeColumn';
import Column from '../../schema/Column';
import usePgaeFilterForm from '../../hooks/usePageFilterForm';
import './FilterDropDown.less';

function resetChildColumn({ column, form }) {
  if (column.childColumn) {
    forEach(column.childColumn, (childColumn) => {
      form.resetFields([childColumn.getFilterKey()]);
      // eslint-disable-next-line no-use-before-define
      resetColumn({ column: childColumn, form });
    });
  }
}

function resetColumn({ column, form }) {
  if (column.getFilterRequired() && column.getFilterDefault()) {
    form.setFieldsValue({
      [column.getFilterKey()]: column.getFilterDefault(),
    });
  } else {
    form.resetFields([column.getFilterKey()]);
  }
  resetChildColumn({ column, form });
}

function FilterDropDown({
  column,
  setSelectedKeys,
  selectedKeys,
  confirm: originConfirm,
  clearFilters: originClear,
}) {
  const form = usePgaeFilterForm();

  const confirm = useEventCallback(() => {
    form.setFieldsValue({
      [column.getFilterKey()]: column.canFilterMultiple()
        ? selectedKeys
        : selectedKeys[0],
    });
    resetChildColumn({ column, form });
    originConfirm();
    form.submit();
  });

  const clearFilters = useEventCallback(() => {
    form.resetFields([column.getFilterKey()]);
    resetColumn({ column, form });
    originClear();
    form.submit();
  });

  const children = useMemo(() => {
    if (
      column.getFilters(null, 'disabledInFilter') ||
      column.getValueOptionsSearchRequest() ||
      column.getValueOptionsRequest()
    ) {
      return (
        <Tree
          {...column.getFilterFormItemComponentProps()}
          column={column}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      );
    }
    if (column instanceof DateTimeColumn) {
      if (column.canFilterRange()) {
        return (
          <>
            <RangePicker
              style={{ marginBottom: 8, display: 'block' }}
              {...column.getFilterFormItemComponentProps()}
              value={selectedKeys.length > 0 ? selectedKeys[0] : undefined}
              onChange={(newDate) => setSelectedKeys([newDate])}
              presets={column.getFilterPresets()}
            />
          </>
        );
      }

      return (
        <DatePicker
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          {...column.getFilterFormItemComponentProps()}
          value={selectedKeys.length > 0 ? selectedKeys[0] : undefined}
          onChange={(v) => setSelectedKeys([v])}
          presets={column.getFilterPresets()}
        />
      );
    }

    if (column instanceof DurationColumn) {
      if (column.canFilterRange()) {
        return (
          <DurationRangePicker
            style={{ marginBottom: 8, display: 'block' }}
            {...column.getFilterFormItemComponentProps()}
            value={selectedKeys.length > 0 ? selectedKeys[0] : null}
            onChange={(time) => setSelectedKeys([time])}
          />
        );
      }

      return (
        <DurationPicker
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          {...column.getFilterFormItemComponentProps()}
          value={selectedKeys.length > 0 ? selectedKeys[0] : null}
          onChange={(time) => setSelectedKeys([time])}
        />
      );
    }

    if (column instanceof NumberColumn) {
      if (column.canFilterRange()) {
        return (
          <InputRangeNumber
            style={{ width: 188, marginBottom: 8, display: 'block' }}
            {...column.getFilterFormItemComponentProps()}
            value={selectedKeys.length > 0 ? selectedKeys[0] : null}
            onChange={(time) => setSelectedKeys([time])}
          />
        );
      }

      return (
        <InputNumber
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          {...column.getFilterFormItemComponentProps()}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}
        />
      );
    }

    if (column instanceof StringColumn) {
      return (
        <Input
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          {...column.getFilterFormItemComponentProps()}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}
        />
      );
    }

    return null;
  }, [column, confirm, selectedKeys, setSelectedKeys]);

  return (
    <div style={{ padding: 8 }}>
      {children}
      <div className="filter-dropdown-button-wrapper">
        <Button
          type="primary"
          onClick={confirm}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          筛选
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          重置
        </Button>
      </div>
    </div>
  );
}

FilterDropDown.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  setSelectedKeys: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedKeys: PropTypes.array.isRequired,
  confirm: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
};

export default React.memo(FilterDropDown);
