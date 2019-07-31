import React from 'react';
import moment from 'moment';
import { DatePicker, Tag } from 'antd';
import { isUndefined, get } from 'lodash';
import Immutable from 'immutable';
import StringColumn from './StringColumn';

const { RangePicker } = DatePicker;

export default class BaseDateTimeColumn extends StringColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return '';
  }

  getInTableFormat() {
    return this.config.getIn(
      ['table', 'format'],
      this.getDefaultInTableFormat()
    );
  }

  getTableFilterPresets() {
    return this.config.getIn(['table', 'filterPresets'], Immutable.List([]));
  }

  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    return moment(value).isValid()
      ? moment(value).format(this.getInTableFormat())
      : '';
  }

  renderInDescriptionDefault({ value }) {
    return this.renderInTableValueDefault({ value });
  }

  // eslint-disable-next-line class-methods-use-this
  showTime() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFormFieldValue(v) {
    return moment(v);
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
            {...this.getTableFilterComponentProps()} // eslint-disable-line react/no-this-in-sfc
            allowClear={false}
            showTime={this.showTime()} // eslint-disable-line react/no-this-in-sfc
            format={this.getInTableFormat()} // eslint-disable-line react/no-this-in-sfc
            value={[
              !isUndefined(get(selectedKeys, '[0][0]'))
                ? moment(get(selectedKeys, '[0][0]'))
                : null,
              !isUndefined(get(selectedKeys, '[0][1]'))
                ? moment(get(selectedKeys, '[0][1]'))
                : null
            ]}
            // ranges={ranges}
            onChange={newDate =>
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
        <DatePicker
          {...this.getTableFilterComponentProps()} // eslint-disable-line react/no-this-in-sfc
          showTime={this.showTime()} // eslint-disable-line react/no-this-in-sfc
          allowClear={false}
          format={this.getInTableFormat()} // eslint-disable-line react/no-this-in-sfc
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

  renderInFormItem({ isEdit }) {
    return (
      <DatePicker
        allowClear
        showTime={this.showTime()}
        format={this.getInTableFormat()}
        {...this.getFormComponentProps({ isEdit })}
      />
    );
  }
}
