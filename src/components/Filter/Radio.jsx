import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import generateRadioOrCheckboxOptions from '../../utils/generateRadioOrCheckboxOptions';
import useColumnValueOptions from '../../hooks/useColumnValueOptions';
import Column from '../../schema/Column';

function FilterRadio({ column, forForm, ...props }) {
  const [options] = useColumnValueOptions(
    column,
    generateRadioOrCheckboxOptions,
    forForm
  );

  return <Radio.Group {...props} options={options} />;
}

FilterRadio.propTypes = {
  column: PropTypes.instanceOf(Column).isRequired,
  forForm: PropTypes.bool,
};

FilterRadio.defaultProps = {
  forForm: false,
};

export default React.memo(FilterRadio);
