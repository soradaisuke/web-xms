import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { isPlainObject } from 'lodash';
import { useEventCallback } from '@qt/react';

function ObjectInputTextArea({ value, onChange, ...props }) {
  const onChangeTime = useEventCallback(e => {
    console.log(e.target.value);
    try {
      onChange(JSON.parse(e.target.value));
      console.log('success');
    } catch (error) {
      onChange(e.target.value);
      console.log('error');
    }
  });

  return (
    <Input.TextArea
      allowClear
      {...props}
      value={isPlainObject(value) ? JSON.stringify(value) : value}
      onChange={onChangeTime}
    />
  );
}

ObjectInputTextArea.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

ObjectInputTextArea.defaultProps = {
  value: undefined
};

export default React.memo(ObjectInputTextArea);
