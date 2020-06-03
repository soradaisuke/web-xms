import React from 'react';
import moment from 'moment';
import { DatePicker, Tag } from 'antd';
import { isUndefined, get, isFunction } from 'lodash';
import BaseDateTimeColumn from './BaseDateTimeColumn';

const { RangePicker, MonthPicker } = DatePicker;

export default class MonthColumn extends BaseDateTimeColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return 'YYYY-MM';
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v && isFunction(v.format) ? v.format('YYYY-MM') : v;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormSubmitValue(v) {
    return v && isFunction(v.format) ? v.format('YYYY-MM') : v;
  }

  renderFilterDropDownContent = ({
    setSelectedKeys, // eslint-disable-line react/prop-types
    selectedKeys, // eslint-disable-line react/prop-types
    confirm // eslint-disable-line react/prop-types
  }) => {
    // eslint-disable-next-line react/no-this-in-sfc
    if (this.canFilterRangeInTable()) {
      return (
        <React.Fragment>
          <RangePicker
            mode={['month', 'month']}
            format={this.getInTableFormat()} // eslint-disable-line react/no-this-in-sfc
            {...this.getTableFilterComponentProps()} // eslint-disable-line react/no-this-in-sfc
            allowClear={false}
            value={[
              !isUndefined(get(selectedKeys, '[0][0]'))
                ? moment(get(selectedKeys, '[0][0]'))
                : null,
              !isUndefined(get(selectedKeys, '[0][1]'))
                ? moment(get(selectedKeys, '[0][1]'))
                : null
            ]}
            // ranges={ranges}
            onPanelChange={newDate =>
              setSelectedKeys([
                [
                  this.formatFilterValue(newDate[0]), // eslint-disable-line react/no-this-in-sfc
                  this.formatFilterValue(newDate[1]) // eslint-disable-line react/no-this-in-sfc
                ]
              ])
            }
            style={{ marginBottom: 8, display: 'block' }}
          />
          <div>
            {// eslint-disable-next-line react/no-this-in-sfc
            this.getTableFilterPresets().map(preset => (
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
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <MonthPicker
          format={this.getInTableFormat()} // eslint-disable-line react/no-this-in-sfc
          {...this.getTableFilterComponentProps()} // eslint-disable-line react/no-this-in-sfc
          allowClear={false}
          value={selectedKeys.length > 0 ? moment(selectedKeys[0]) : null}
          onChange={v => setSelectedKeys([this.formatFilterValue(v)])} // eslint-disable-line react/no-this-in-sfc
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <div>
          {// eslint-disable-next-line react/no-this-in-sfc
          this.getTableFilterPresets().map(preset => (
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
      </React.Fragment>
    );
  };

  renderInFormItem({
    user,
    record,
    value,
    values,
    isEdit,
    formComponentProps = {}
  }) {
    return (
      <MonthPicker
        allowClear
        format={this.getInTableFormat()}
        {...this.getFormComponentProps({ isEdit, user, record, value, values })}
        {...formComponentProps}
      />
    );
  }
}
