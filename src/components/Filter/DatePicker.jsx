import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Immutable from 'immutable';
import { DatePicker, Tag } from 'antd';
import { useEventCallback } from '@qt/react';

function FilterDatePicker({ value, onChange, presets, format, ...props }) {
  const onChangeDate = useEventCallback((_, string) => {
    onChange(string);
  });

  const renderExtraFooter = useCallback(
    () =>
      presets?.map((preset) => (
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
    <DatePicker
      allowClear
      {...props}
      format={format}
      value={value ? moment(value, format) : null}
      onChange={onChangeDate}
      renderExtraFooter={renderExtraFooter}
    />
  );
}

FilterDatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  format: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string
  ]).isRequired,
  value: PropTypes.string,
  presets: PropTypes.instanceOf(Immutable.List),
};

FilterDatePicker.defaultProps = {
  value: undefined,
  presets: null,
};

export default React.memo(FilterDatePicker);
