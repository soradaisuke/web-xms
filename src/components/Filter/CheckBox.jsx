import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import generateRadioOrCheckboxOptions from '../../utils/generateRadioOrCheckboxOptions';
import useColumnValueOptions from '../../hooks/useColumnValueOptions';
import Column from '../../schema/Column';

function FilterCheckBox({ column, ...props }) {
  const [options] = useColumnValueOptions(
    column,
    generateRadioOrCheckboxOptions
  );

  return <Checkbox.Group {...props} options={options} />;
}

FilterCheckBox.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired
};

export default React.memo(FilterCheckBox);
