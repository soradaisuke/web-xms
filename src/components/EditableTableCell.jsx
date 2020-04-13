import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import Immutable from 'immutable';
import { ClickableDiv } from '@qt/react-core';
import { EditableContext } from './EditableTableRow';
import Column from '../schema/Column';
import './EditableTableCell.less';

export default class EditableTableCell extends React.PureComponent {
  static displayName = 'EditableTableCell';

  static propTypes = {
    form: PropTypes.shape({
      setFields: PropTypes.func.isRequired,
      validateFieldsAndScroll: PropTypes.func.isRequired,
      getFieldDecorator: PropTypes.func.isRequired
    }),
    user: PropTypes.instanceOf(Immutable.Map),
    column: PropTypes.instanceOf(Column),
    submit: PropTypes.func,
    record: PropTypes.object // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    form: null,
    column: null,
    user: null,
    submit: null,
    record: {}
  };

  state = {
    editing: false
  };

  toggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing }, () => {
      if (!editing && this.input) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { submit } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      submit(values);
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, record, column, user, submit } = this.props;
    const { editing } = this.state;
    const columnCanEditInTable =
      column &&
      submit &&
      column.canShowInEditFrom({
        user,
        record
      });
    return editing && columnCanEditInTable && form ? (
      <Form.Item style={{ margin: 0 }}>
        {column.renderInForm({
          form,
          record,
          user,
          hideFormLabel: true,
          isEdit: true,
          formComponentProps: {
            ref: node => {
              this.input = node;
            },
            onPressEnter: this.save,
            onBlur: this.save
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
        onClick={this.toggleEdit}
      >
        {children}
      </ClickableDiv>
    );
  };

  render() {
    const {
      record,
      index,
      handleSave,
      children,
      submit,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
      </td>
    );
  }
}
