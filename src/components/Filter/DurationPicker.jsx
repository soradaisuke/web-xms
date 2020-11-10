import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TimePicker } from 'antd';
import { isNumber } from 'lodash';
import { useEventCallback } from '@qt/react';

export function formatValue(v) {
  return isNumber(v) ? moment().startOf('day').add(v, 's') : null;
}

export function normalizeValue(v) {
  return v.diff(moment().startOf('day'), 's');
}

function DurationPicker({ value, onChange, ...props }) {
  const onChangeTime = useEventCallback((newValue) => {
    onChange(normalizeValue(newValue));
  });

  return (
    <TimePicker
      allowClear
      {...props}
      value={formatValue(value)}
      onChange={onChangeTime}
    />
  );
}

DurationPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

DurationPicker.defaultProps = {
  value: undefined,
};

export default React.memo(DurationPicker);
