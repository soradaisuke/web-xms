import React from 'react';
import { InputNumber } from 'antd';
import PropTypes from 'prop-types';
import { get, set } from 'lodash';
import { useEventCallback } from '@qt/react';

function InputRangeNumber({ value, onChange, ...props }) {
  const onLeftChange = useEventCallback(newValue => {
    onChange(set([...(value || [])], '[0]', newValue));
  });

  const onRightChange = useEventCallback(newValue => {
    onChange(set([...(value || [])], '[1]', newValue));
  });

  return (
    <>
      <InputNumber
        {...props}
        value={get(value, '[0]')}
        onChange={onLeftChange}
      />
      {' ~ '}
      <InputNumber
        {...props}
        value={get(value, '[1]')}
        onChange={onRightChange}
      />
    </>
  );
}

InputRangeNumber.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.number)
};

InputRangeNumber.defaultProps = {
  value: undefined
};

export default React.memo(InputRangeNumber);
