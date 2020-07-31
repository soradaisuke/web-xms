import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Immutable from 'immutable';
import { DatePicker, Tag } from 'antd';
import { useEventCallback } from '@qt/react';

const { RangePicker } = DatePicker;

function FilterRangePicker({ value, onChange, presets, format, ...props }) {
  const onChangeDate = useEventCallback((_, strings) => {
    onChange(strings);
  });

  const renderExtraFooter = useCallback(
    () =>
      presets?.map(preset => (
        <Tag
          color="blue"
          key={preset.get('value')}
          onClick={() => {
            onChangeDate(null, preset.get('value'));
          }}
        >
          {preset.get('text')}
        </Tag>
      )),
    [presets, onChangeDate]
  );

  return (
    <RangePicker
      allowClear
      {...props}
      format={format}
      value={value ? [moment(value[0], format), moment(value[1], format)] : null}
      onChange={onChangeDate}
      renderExtraFooter={renderExtraFooter}
    />
  );
}

FilterRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  format: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]),
  value: PropTypes.arrayOf(PropTypes.string),
  presets: PropTypes.instanceOf(Immutable.List)
};

FilterRangePicker.defaultProps = {
  format: null,
  value: undefined,
  presets: null
};

export default React.memo(FilterRangePicker);
