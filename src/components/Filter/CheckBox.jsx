import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import generateRadioOrCheckboxOptions from '../../utils/generateRadioOrCheckboxOptions';
import useColumnValueOptions from '../../hooks/useColumnValueOptions';
import Column from '../../schema/Column';

function FilterCheckBox({ column, forForm, ...props }) {
  const [options] = useColumnValueOptions(
    column,
    generateRadioOrCheckboxOptions,
    forForm
  );

  return <Checkbox.Group {...props} options={options} />;
}

FilterCheckBox.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  forForm: PropTypes.bool,
};

FilterCheckBox.defaultProps = {
  forForm: false,
};

export default React.memo(FilterCheckBox);
