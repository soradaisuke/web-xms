import React from 'react';
import moment from 'moment';
import { isNumber, isUndefined, get, set } from 'lodash';
import TimePickerWithConfirm from '../components/TimePickerWithConfirm';
import NumberColumn from './NumberColumn';

export default class TimeColumn extends NumberColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return 'HH:mm:ss';
  }

  getInTableFormat() {
    return this.config.getIn(
      ['table', 'format'],
      this.getDefaultInTableFormat()
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    return isNumber(value)
      ? moment()
          .startOf('day')
          .add(value, 's')
          .format(this.getInTableFormat())
      : '';
  }

  renderFilterDropDownContent = ({
    setSelectedKeys, // eslint-disable-line react/prop-types
    selectedKeys // eslint-disable-line react/prop-types
  }) => {
    // eslint-disable-next-line react/no-this-in-sfc
    if (this.canFilterRangeInTable()) {
      return (
        <div style={{ marginBottom: 8, display: 'block' }}>
          <TimePickerWithConfirm
            {...this.getTableFilterComponentProps().toJS()} // eslint-disable-line react/no-this-in-sfc
            format={this.getInTableFormat()} // eslint-disable-line react/no-this-in-sfc
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
                set(newValue, '[0]', value.diff(moment().startOf('day')) / 1000)
              ]);
            }}
          />
          {' ~ '}
          <TimePickerWithConfirm
            {...this.getTableFilterComponentProps().toJS()} // eslint-disable-line react/no-this-in-sfc
            format={this.getInTableFormat()} // eslint-disable-line react/no-this-in-sfc
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
                set(newValue, '[1]', value.diff(moment().startOf('day')) / 1000)
              ]);
            }}
          />
        </div>
      );
    }

    return (
      <TimePickerWithConfirm
        {...this.getTableFilterComponentProps().toJS()} // eslint-disable-line react/no-this-in-sfc
        format={this.getInTableFormat()} // eslint-disable-line react/no-this-in-sfc
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
  };
}
