import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import generateRadioOrCheckboxOptions from '../../utils/generateRadioOrCheckboxOptions';
import useColumnFilterOptions from '../../hooks/useColumnFilterOptions';
import Column from '../../schema/Column';

function FilterCheckBox({ column, ...props }) {
  const [options] = useColumnFilterOptions(
    column,
    generateRadioOrCheckboxOptions
  );

  return <Checkbox.Group {...props} options={options} />;
}

FilterCheckBox.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired
};

export default React.memo(FilterCheckBox);
