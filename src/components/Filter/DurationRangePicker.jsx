import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isUndefined } from 'lodash';
import { useEventCallback } from '@qt/react';
import { TimePicker } from 'antd';

const { RangePicker } = TimePicker;

function DurationRangePicker({ value, onChange, ...props }) {
  const onChangeDate = useEventCallback((_, strings) => {
    onChange(strings);
  });

  return (
    <RangePicker
      allowClear
      {...props}
      value={!isUndefined(value) ? [moment(value[0]), moment(value[1])] : null}
      onChange={onChangeDate}
    />
  );
}

DurationRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number)
};

DurationRangePicker.defaultProps = {
  value: undefined
};

export default React.memo(DurationRangePicker);
