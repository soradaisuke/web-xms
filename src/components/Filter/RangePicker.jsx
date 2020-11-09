import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Immutable from 'immutable';
import { DatePicker, Tag } from 'antd';
import { useEventCallback } from '@qt/react';

const { RangePicker } = DatePicker;

function FilterRangePicker({ value, onChange, presets, ...props }) {
  const onChangeDate = useEventCallback((dates) => {
    onChange(
      dates
        ? [
            dates[0]?.toISOString?.() ?? dates[0],
            dates[1]?.toISOString?.() ?? dates[1],
          ]
        : null
    );
  });

  const renderExtraFooter = useCallback(
    () =>
      presets?.map((preset) => (
        <Tag
          color="blue"
          key={JSON.stringify(preset.get('value')?.toJS())}
          onClick={() => {
            onChangeDate(preset.get('value').toArray());
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
      value={value ? [moment(value[0]), moment(value[1])] : null}
      onChange={onChangeDate}
      renderExtraFooter={renderExtraFooter}
    />
  );
}

FilterRangePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  presets: PropTypes.instanceOf(Immutable.List),
};

FilterRangePicker.defaultProps = {
  value: undefined,
  presets: null,
};

export default React.memo(FilterRangePicker);
