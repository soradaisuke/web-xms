import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useContext,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Immutable from 'immutable';
import { ClickableDiv } from '@qt/react';
import { EditableContext } from './EditableTableRow';
import Column from '../schema/Column';
import './EditableTableCell.less';

function EditableTableCell({
  children,
  record,
  column,
  user,
  submit,
  ...restProps
}) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef();
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = useCallback(() => {
    setEditing(!editing);
  }, [editing, setEditing]);

  const save = useCallback(async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      submit(values);
    } catch (errInfo) {
      //
    }
  }, [form, submit, toggleEdit]);

  const columnCanEditInTable = useMemo(
    () =>
      form && column && submit && column.canShowInEditFrom({ user, record }),
    [column, submit, user, record, form]
  );

  const cell = useMemo(
    () =>
      editing && columnCanEditInTable ? (
        <Form.Item style={{ margin: 0 }}>
          {column.renderInForm({
            form,
            record,
            user,
            hideFormLabel: true,
            isEdit: true,
            formComponentProps: {
              ref: node => {
                inputRef.current = node;
              },
              onPressEnter: save,
              onBlur: save
            }
          })}
        </Form.Item>
      ) : (
        <ClickableDiv
          className={
            columnCanEditInTable
              ? 'editable-cell-value-wrap'
              : 'not-editable-cell'
          }
          onClick={toggleEdit}
        >
          {children}
        </ClickableDiv>
      ),
    [
      editing,
      columnCanEditInTable,
      column,
      form,
      record,
      user,
      save,
      toggleEdit,
      children
    ]
  );

  return <td {...restProps}>{cell}</td>;
}

EditableTableCell.propTypes = {
  children: PropTypes.node,
  user: PropTypes.instanceOf(Immutable.Map),
  column: PropTypes.instanceOf(Column),
  submit: PropTypes.func,
  record: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

EditableTableCell.defaultProps = {
  children: null,
  column: null,
  user: null,
  submit: null,
  record: {}
};

export default React.memo(EditableTableCell);

// export default class EditableTableCell extends React.PureComponent {
//   static displayName = 'EditableTableCell';

//   static propTypes = {
//     form: PropTypes.shape({
//       setFields: PropTypes.func.isRequired,
//       validateFieldsAndScroll: PropTypes.func.isRequired,
//       getFieldDecorator: PropTypes.func.isRequired
//     }),
//     user: PropTypes.instanceOf(Immutable.Map),
//     column: PropTypes.instanceOf(Column),
//     submit: PropTypes.func,
//     record: PropTypes.object // eslint-disable-line react/forbid-prop-types
//   };

//   static defaultProps = {
//     form: null,
//     column: null,
//     user: null,
//     submit: null,
//     record: {}
//   };

//   state = {
//     editing: false
//   };

//   toggleEdit = () => {
//     const { editing } = this.state;
//     this.setState({ editing: !editing }, () => {
//       if (!editing && this.input) {
//         this.input.focus();
//       }
//     });
//   };

//   save = e => {
//     const { submit } = this.props;
//     this.form.validateFields((error, values) => {
//       if (error && error[e.currentTarget.id]) {
//         return;
//       }
//       this.toggleEdit();
//       submit(values);
//     });
//   };

//   renderCell = form => {
//     this.form = form;
//     const { children, record, column, user, submit } = this.props;
//     const { editing } = this.state;
//     const columnCanEditInTable =
//       column &&
//       submit &&
//       column.canShowInEditFrom({
//         user,
//         record
//       });
//     return editing && columnCanEditInTable && form ? (
//       <Form.Item style={{ margin: 0 }}>
//         {column.renderInForm({
//           form,
//           record,
//           user,
//           hideFormLabel: true,
//           isEdit: true,
//           formComponentProps: {
//             ref: node => {
//               this.input = node;
//             },
//             onPressEnter: this.save,
//             onBlur: this.save
//           }
//         })}
//       </Form.Item>
//     ) : (
//       <ClickableDiv
//         className={
//           columnCanEditInTable
//             ? 'editable-cell-value-wrap'
//             : 'not-editable-cell'
//         }
//         onClick={this.toggleEdit}
//       >
//         {children}
//       </ClickableDiv>
//     );
//   };

//   render() {
//     const {
//       record,
//       index,
//       handleSave,
//       children,
//       submit,
//       ...restProps
//     } = this.props;
//     return (
//       <td {...restProps}>
//         <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
//       </td>
//     );
//   }
// }
