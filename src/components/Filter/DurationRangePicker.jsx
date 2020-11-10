import React from 'react';
import PropTypes from 'prop-types';
import { useEventCallback } from '@qt/react';
import { TimePicker } from 'antd';
import { map } from 'lodash';
import { formatValue, normalizeValue } from './DurationPicker';

const { RangePicker } = TimePicker;

function DurationRangePicker({ value, onChange, ...props }) {
  const onChangeDate = useEventCallback((moments) => {
    onChange(map(moments, (m) => normalizeValue(m)));
  });
  console.log(
    value,
    value ? [formatValue(value[0]), formatValue(value[1])] : null
  );
  return (
    <RangePicker
      allowClear
      {...props}
      value={value ? [formatValue(value[0]), formatValue(value[1])] : null}
      onChange={onChangeDate}
    />
  );
}

DurationRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
};

DurationRangePicker.defaultProps = {
  value: undefined,
};

export default React.memo(DurationRangePicker);
