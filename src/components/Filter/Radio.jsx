import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import generateRadioOrCheckboxOptions from '../../utils/generateRadioOrCheckboxOptions';
import useColumnFilterOptions from '../../hooks/useColumnFilterOptions';
import Column from '../../schema/Column';

function FilterRadio({ column, ...props }) {
  const [options] = useColumnFilterOptions(
    column,
    generateRadioOrCheckboxOptions
  );

  return <Radio.Group {...props} options={options} />;
}

FilterRadio.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired
};

export default React.memo(FilterRadio);
