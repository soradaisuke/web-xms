import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Immutable from 'immutable';
import { DatePicker, Tag } from 'antd';
import { isUndefined } from 'lodash';
import { useEventCallback } from '@qt/react';

const { RangePicker } = DatePicker;

function FilterRangePicker({ value, onChange, presets, ...props }) {
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
      value={!isUndefined(value) ? [moment(value[0]), moment(value[1])] : null}
      onChange={onChangeDate}
      renderExtraFooter={renderExtraFooter}
    />
  );
}

FilterRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  presets: PropTypes.instanceOf(Immutable.List)
};

FilterRangePicker.defaultProps = {
  value: undefined,
  presets: null
};

export default React.memo(FilterRangePicker);
