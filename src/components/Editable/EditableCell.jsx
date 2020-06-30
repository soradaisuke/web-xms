import React, { useState, useRef, useContext, useEffect } from 'react';
import { get, set } from 'lodash';
import PropTypes from 'prop-types';
import { useEventCallback, ClickableDiv } from '@qt/react';
import { EditableContext } from './EditableTableRow';
import Column from '../../schema/Column';
import usePageConfig from '../../hooks/usePageConfig';
import useUser from '../../hooks/useUser';
import visiblePromise from '../../utils/visiblePromise';
import StringColumn from '../../schema/StringColumn';
import NumberColumn from '../../schema/NumberColumn';
import BooleanColumn from '../../schema/BooleanColumn';
import './EditableTableCell.less';

function EditableCell({ children, record, column, onComplete }) {
  const [editing, setEditing] = useState(false);
  const editor = useRef();
  const form = useContext(EditableContext);
  const { edit, table } = usePageConfig();

  useEffect(() => {
    if (editing && editor.current) {
      editor.current.focus();
    }
  }, [editing]);

  const toggleEdit = useEventCallback(() => {
    setEditing(pre => !pre);
  }, []);

  const onFormItemRef = useEventCallback(
    node => {
      editor.current = node;
    },
    [editor]
  );

  const submit = useEventCallback(
    body =>
      visiblePromise({
        promise: edit({
          id: get(record, table.getPrimaryKey()),
          body
        }),
        loadingMessage: '正在保存...',
        successMessage: '保存成功',
        onComplete
      }),
    [record, table, onComplete]
  );

  const save = useEventCallback(async () => {
    try {
      const formValues = await form.validateFields();
      set(
        formValues,
        column.getFormKey(),
        column.formatFormSubmitValue(get(formValues, column.getFormKey()))
      );
      toggleEdit();
      submit(formValues);
    } catch (e) {
      // error
    }
  }, [form, column, toggleEdit]);

  const onChange = useEventCallback(
    value => {
      submit({
        [column.getFormKey()]: value
      });
    },
    [submit, column]
  );

  const user = useUser();
  const values = form.getFieldsValue();
  const value = get(values, column?.getFormKey());

  if (
    !column ||
    !column.canInlineEdit() ||
    !column.canShowInEditFrom({ user, value, values, record })
  ) {
    return children;
  }

  if (column instanceof StringColumn || column instanceof NumberColumn) {
    if (editing) {
      return column.renderInForm({
        form,
        record,
        user,
        hideFormLabel: true,
        isEdit: true,
        formComponentProps: {
          ref: onFormItemRef,
          onPressEnter: save,
          onBlur: save
        }
      });
    }

    return (
      <ClickableDiv className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </ClickableDiv>
    );
  }

  if (column instanceof BooleanColumn) {
    return column.renderInFormItem({
      isEdit: true,
      formComponentProps: {
        checked: get(record, column.getKey()),
        onChange
      }
    });
  }

  return children;
}

EditableCell.propTypes = {
  column: PropTypes.instanceOf(Column),
  onComplete: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  record: PropTypes.object // eslint-disable-line react/forbid-prop-types
};

EditableCell.defaultProps = {
  column: null,
  onComplete: null,
  children: null,
  record: {}
};

export default React.memo(EditableCell);
