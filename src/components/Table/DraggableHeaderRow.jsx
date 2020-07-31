import React from 'react';
import PropTypes from 'prop-types';

function DraggableHeaderRow({ children, ...restProps }) {
  return (
    <tr {...restProps}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <th />
    </tr>
  );
}

DraggableHeaderRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

DraggableHeaderRow.defaultProps = {
  children: null,
};

export default React.memo(DraggableHeaderRow);
