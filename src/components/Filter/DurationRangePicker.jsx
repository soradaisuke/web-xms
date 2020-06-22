import React from 'react';
import PropTypes from 'prop-types';
import { get, set } from 'lodash';
import { useEventCallback } from '@qt/react';
import DurationPicker from './DurationPicker';

function DurationRangePicker({ value, onChange, ...props }) {
  const onLeftChange = useEventCallback(newValue => {
    onChange(set([...(value || [])], '[0]', newValue));
  });

  const onRightChange = useEventCallback(newValue => {
    onChange(set([...(value || [])], '[1]', newValue));
  });

  return (
    <>
      <DurationPicker
        {...props}
        value={get(value, '[0]')}
        onChange={onLeftChange}
      />
      {' ~ '}
      <DurationPicker
        {...props}
        value={get(value, '[1]')}
        onChange={onRightChange}
      />
    </>
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
