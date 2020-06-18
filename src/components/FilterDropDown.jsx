import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get, set, isUndefined } from 'lodash';
import { SearchOutlined } from '@ant-design/icons';
import { Button, InputNumber, Input, DatePicker, Tag } from 'antd';
import TimePickerWithConfirm from './TimePickerWithConfirm';
import TreeFilter from './TreeFilter';
import NumberColumn from '../schema/NumberColumn';
import StringColumn from '../schema/StringColumn';
import MonthColumn from '../schema/MonthColumn';
import TimeColumn from '../schema/TimeColumn';
import BaseDateTimeColumn from '../schema/BaseDateTimeColumn';
import './FilterDropDown.less';
import Column from '../schema/Column';

const { RangePicker, MonthPicker } = DatePicker;

function FilterDropDown({
  column,
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  isAutoTrigger,
  useTreeFilter,
  parentValue
}) {
  const children = useMemo(() => {
    if (useTreeFilter) {
      return (
        <TreeFilter
          column={column}
          parentValue={parentValue}
          selectedKeys={selectedKeys}
          setSelectedKeys={setSelectedKeys}
        />
      );
    }
    if (column instanceof BaseDateTimeColumn) {
      if (column.canFilterRangeInTable()) {
        return (
          <>
            <RangePicker
              showTime={column.showTime()}
              format={column.getInTableFormat()}
              {...column.getTableFilterComponentProps()}
              allowClear={false}
              value={[
                !isUndefined(get(selectedKeys, '[0][0]'))
                  ? moment(get(selectedKeys, '[0][0]'))
                  : null,
                !isUndefined(get(selectedKeys, '[0][1]'))
                  ? moment(get(selectedKeys, '[0][1]'))
                  : null
              ]}
              onChange={newDate =>
                setSelectedKeys([
                  [
                    column.formatFilterValue(newDate[0]),
                    column.formatFilterValue(newDate[1])
                  ]
                ])
              }
              style={{ marginBottom: 8, display: 'block' }}
            />
            <div>
              {column.getTableFilterPresets().map(preset => (
                <Tag
                  style={{ marginBottom: 8 }}
                  color="blue"
                  key={preset.get('text')}
                  onClick={() => {
                    setSelectedKeys([preset.get('value')]);
                    confirm();
                  }}
                >
                  {preset.get('text')}
                </Tag>
              ))}
            </div>
          </>
        );
      }

      return (
        <>
          <DatePicker
            showTime={column.showTime()}
            format={column.getInTableFormat()}
            {...column.getTableFilterComponentProps()}
            allowClear={false}
            value={selectedKeys.length > 0 ? moment(selectedKeys[0]) : null}
            onChange={v => setSelectedKeys([column.formatFilterValue(v)])}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <div>
            {column.getTableFilterPresets().map(preset => (
              <Tag
                style={{ marginBottom: 8 }}
                color="blue"
                key={preset.get('text')}
                onClick={() => {
                  setSelectedKeys([preset.get('value')]);
                  confirm();
                }}
              >
                {preset.get('text')}
              </Tag>
            ))}
          </div>
        </>
      );
    }

    if (column instanceof MonthColumn) {
      if (column.canFilterRangeInTable()) {
        return (
          <>
            <RangePicker
              mode={['month', 'month']}
              format={column.getInTableFormat()}
              {...column.getTableFilterComponentProps()}
              allowClear={false}
              value={[
                !isUndefined(get(selectedKeys, '[0][0]'))
                  ? moment(get(selectedKeys, '[0][0]'))
                  : null,
                !isUndefined(get(selectedKeys, '[0][1]'))
                  ? moment(get(selectedKeys, '[0][1]'))
                  : null
              ]}
              onPanelChange={newDate =>
                setSelectedKeys([
                  [
                    column.formatFilterValue(newDate[0]),
                    column.formatFilterValue(newDate[1])
                  ]
                ])
              }
              style={{ marginBottom: 8, display: 'block' }}
            />
            <div>
              {column.getTableFilterPresets().map(preset => (
                <Tag
                  style={{ marginBottom: 8 }}
                  color="blue"
                  key={preset.get('text')}
                  onClick={() => {
                    setSelectedKeys([preset.get('value')]);
                    confirm();
                  }}
                >
                  {preset.get('text')}
                </Tag>
              ))}
            </div>
          </>
        );
      }

      return (
        <>
          <MonthPicker
            format={column.getInTableFormat()}
            {...column.getTableFilterComponentProps()}
            allowClear={false}
            value={selectedKeys.length > 0 ? moment(selectedKeys[0]) : null}
            onChange={v => setSelectedKeys([column.formatFilterValue(v)])}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <div>
            {column.getTableFilterPresets().map(preset => (
              <Tag
                style={{ marginBottom: 8 }}
                color="blue"
                key={preset.get('text')}
                onClick={() => {
                  setSelectedKeys([preset.get('value')]);
                  confirm();
                }}
              >
                {preset.get('text')}
              </Tag>
            ))}
          </div>
        </>
      );
    }

    if (column instanceof TimeColumn) {
      if (column.canFilterRangeInTable()) {
        return (
          <div style={{ marginBottom: 8, display: 'block' }}>
            <TimePickerWithConfirm
              {...column.getTableFilterComponentProps()}
              format={column.getInTableFormat()}
              value={
                !isUndefined(get(selectedKeys, '[0][0]'))
                  ? moment()
                      .startOf('day')
                      .add(get(selectedKeys, '[0][0]'), 's')
                  : null
              }
              onChange={value => {
                let newValue = [];
                try {
                  newValue = [...selectedKeys[0]];
                } catch (e) {
                  newValue = [];
                }
                setSelectedKeys([
                  set(
                    newValue,
                    '[0]',
                    value.diff(moment().startOf('day')) / 1000
                  )
                ]);
              }}
            />
            {' ~ '}
            <TimePickerWithConfirm
              {...column.getTableFilterComponentProps()}
              format={column.getInTableFormat()}
              value={
                !isUndefined(get(selectedKeys, '[0][1]'))
                  ? moment()
                      .startOf('day')
                      .add(get(selectedKeys, '[0][1]'), 's')
                  : null
              }
              onChange={value => {
                let newValue = [];
                try {
                  newValue = [...selectedKeys[0]];
                } catch (e) {
                  newValue = [];
                }
                setSelectedKeys([
                  set(
                    newValue,
                    '[1]',
                    value.diff(moment().startOf('day')) / 1000
                  )
                ]);
              }}
            />
          </div>
        );
      }

      return (
        <TimePickerWithConfirm
          {...column.getTableFilterComponentProps()}
          format={column.getInTableFormat()}
          value={
            selectedKeys.length > 0
              ? moment()
                  .startOf('day')
                  .add(selectedKeys[0], 's')
              : null
          }
          onChange={time =>
            setSelectedKeys([time.diff(moment().startOf('day')) / 1000])
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      );
    }

    if (column instanceof NumberColumn) {
      if (column.canFilterRangeInTable()) {
        return (
          <div style={{ marginBottom: 8, display: 'block' }}>
            <InputNumber
              {...column.getTableFilterComponentProps()}
              value={get(selectedKeys, '[0][0]')}
              onChange={value => {
                let newValue = [];
                try {
                  newValue = [...selectedKeys[0]];
                } catch (e) {
                  newValue = [];
                }
                setSelectedKeys([set(newValue, '[0]', value)]);
              }}
            />
            {' ~ '}
            <InputNumber
              {...column.getTableFilterComponentProps()}
              value={get(selectedKeys, '[0][1]')}
              onChange={value => {
                let newValue = [];
                try {
                  newValue = [...selectedKeys[0]];
                } catch (e) {
                  newValue = [];
                }
                setSelectedKeys([set(newValue, '[1]', value)]);
              }}
            />
          </div>
        );
      }

      return (
        <InputNumber
          {...column.getTableFilterComponentProps()}
          value={selectedKeys[0]}
          onChange={value => setSelectedKeys([value])}
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      );
    }

    if (column instanceof StringColumn) {
      return (
        <Input
          {...column.getTableFilterComponentProps()}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={confirm}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      );
    }

    return null;
  }, [
    column,
    confirm,
    parentValue,
    selectedKeys,
    setSelectedKeys,
    useTreeFilter
  ]);

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
          {!isAutoTrigger ? '确定' : '筛选'}
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
  selectedKeys: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  isAutoTrigger: PropTypes.bool.isRequired,
  useTreeFilter: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  parentValue: PropTypes.any
};

FilterDropDown.defaultProps = {
  useTreeFilter: false,
  parentValue: null
};

export default React.memo(FilterDropDown);
