import React from 'react';
import PropTypes from 'prop-types';
import Column from '../../schema/Column';
import EditableCell from './EditableCell';
import './EditableTableCell.less';

function EditableTableCell({
  children,
  record,
  column,
  onComplete,
  ...restProps
}) {
  return (
    <td {...restProps}>
      <EditableCell
        record={record}
        column={column}
        onComplete={onComplete}
      >
        {children}
      </EditableCell>
    </td>
  );
}

EditableTableCell.propTypes = {
  children: PropTypes.node,
  column: PropTypes.instanceOf(Column),
  onComplete: PropTypes.func,
  record: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

EditableTableCell.defaultProps = {
  children: null,
  column: null,
  onComplete: null,
  record: {}
};

export default React.memo(EditableTableCell);
