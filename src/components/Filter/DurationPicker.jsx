import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { TimePicker } from 'antd';
import { isNumber } from 'lodash';
import { useEventCallback } from '@qt/react';

function DurationPicker({ value, onChange, ...props }) {
  const onChangeTime = useEventCallback((newValue) => {
    onChange(newValue.diff(moment().startOf('day'), 's'));
  });

  return (
    <TimePicker
      allowClear
      {...props}
      value={!isNumber(value) ? moment().startOf('day').add(value, 's') : null}
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
