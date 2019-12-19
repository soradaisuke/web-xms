import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker, Tag } from 'antd';

export default class DatePickerWithPresets extends React.PureComponent {
  static displayName = 'DatePickerWithPresets';

  static propTypes = {
    presets: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        value: PropTypes.string
      })
    ),
    format: PropTypes.string
  };

  static defaultProps = {
    presets: [],
    format: 'YYYY-MM-DD'
  };

  state = {
    open: false,
    date: null
  };

  formatValue = (value, format) => (value && value.format(format)) || '';

  onChangeDate = date => {
    const { onChange, format } = this.props;
    this.setState({ date, open: false });
    onChange(date, this.formatValue(date, format));
  };

  onOpenChange = open => {
    this.setState({ open });
  };

  render() {
    const { onChange, presets, format, ...props } = this.props;
    const { open, date } = this.state;
    return (
      <DatePicker
        value={date}
        format={format}
        open={open}
        renderExtraFooter={() =>
          presets.map(preset => (
            <Tag
              color="blue"
              key={preset.value}
              onClick={() => {
                this.onChangeDate(moment(preset.value));
              }}
            >
              {preset.text}
            </Tag>
          ))
        }
        onChange={this.onChangeDate}
        onOpenChange={this.onOpenChange}
        {...props}
      />
    );
  }
}
