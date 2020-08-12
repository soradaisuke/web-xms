import React, { useState, useRef, useContext, useEffect, useMemo } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useEventCallback, ClickableDiv } from '@qt/react';
import { EditableContext } from './EditableTableRow';
import Column from '../../schema/Column';
import usePageConfig from '../../hooks/usePageConfig';
import useUser from '../../hooks/useUser';
import StringColumn from '../../schema/StringColumn';
import NumberColumn from '../../schema/NumberColumn';
import BooleanColumn from '../../schema/BooleanColumn';
import useActionConfig from '../../hooks/useActionConfig';
import FormItem from '../Form/FormItem';
import './EditableTableCell.less';

function EditableCell({ children, record, column, reload }) {
  const [editing, setEditing] = useState(false);
  const editor = useRef();
  const form = useContext(EditableContext);
  const user = useUser();
  const value = get(record, column.getKey());
  const { table } = usePageConfig();
  const { disabled, onOk } = useActionConfig({
    action: table.getEditAction(),
    record,
    reload,
  });

  useEffect(() => {
    if (editing && editor.current) {
      editor.current.focus();
    }
  }, [editing]);

  const toggleEdit = useEventCallback(() => {
    setEditing((pre) => !pre);
    form.setFieldsValue({
      [column.getFormItemName()]: get(record, column.getFormItemName()),
    });
  }, []);

  const onFormItemRef = useEventCallback(
    (node) => {
      editor.current = node;
    },
    [editor]
  );

  const save = useEventCallback(async () => {
    try {
      const body = await form.validateFields();
      toggleEdit();
      onOk({ data: { body } });
    } catch (e) {
      // error
    }
  }, [form, column, toggleEdit, onOk]);

  const disableInlineEdit = useMemo(
    () => disabled || !column.canEdit({ user, value, values: record, record }),
    [disabled, user, value, record, column]
  );

  useEffect(() => {
    if (column instanceof BooleanColumn && !disableInlineEdit) {
      form.setFieldsValue({
        [column.getFormItemName()]: get(record, column.getFormItemName()),
      });
    }
  }, [record, form, column, disableInlineEdit]);

  const props = useMemo(() => {
    const p = {
      isEdit: true,
      hideLabel: true,
      column,
      record,
    };

    if (column instanceof StringColumn || column instanceof NumberColumn) {
      return {
        ...p,
        formItemComponentProps: {
          ref: onFormItemRef,
          onPressEnter: save,
          onBlur: save,
        },
      };
    }
    if (column instanceof BooleanColumn) {
      return {
        ...p,
        formItemComponentProps: {
          onChange: save,
        },
      };
    }

    return p;
  }, [column, record, onFormItemRef, save]);

  if (disableInlineEdit) {
    return children;
  }

  if (column instanceof StringColumn || column instanceof NumberColumn) {
    if (editing) {
      return <FormItem {...props} />;
    }

    return (
      <ClickableDiv className="editable-cell-value-wrap" onClick={toggleEdit}>
        {children}
      </ClickableDiv>
    );
  }

  if (column instanceof BooleanColumn) {
    return <FormItem {...props} />;
  }

  return children;
}

EditableCell.propTypes = {
  column: PropTypes.instanceOf(Column),
  reload: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any,
  record: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

EditableCell.defaultProps = {
  column: null,
  reload: null,
  children: null,
  record: {},
};

export default React.memo(EditableCell);
