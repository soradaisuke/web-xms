import { forEach } from 'lodash';

export function resetChildColumn({ column, form, forForm }) {
  if (column.childColumn) {
    forEach(column.childColumn, (childColumn) => {
      form.resetFields([forForm ? childColumn.getFormItemName() : childColumn.getFilterKey()]);
      // eslint-disable-next-line no-use-before-define
      resetColumn({ column: childColumn, form, forForm });
    });
  }
}

export function resetColumn({ column, form, forForm }) {
  const key = forForm ? column.getFormItemName() : column.getFilterKey()
  if (!forForm && column.getFilterRequired() && column.getFilterDefault()) {
    form.setFieldsValue({
      [key]: column.getFilterDefault(),
    });
  } else {
    form.resetFields([key]);
  }
  resetChildColumn({ column, form });
}

export default {
  resetChildColumn,
  resetColumn
};
