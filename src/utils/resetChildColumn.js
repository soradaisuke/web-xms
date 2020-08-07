import { forEach } from 'lodash';
import getFullFormItemName from './getFullFormItemName';

export function resetChildColumn({ column, form, forForm, prefix }) {
  if (column.childColumn) {
    forEach(column.childColumn, (childColumn) => {
      form.resetFields([
        forForm
          ? getFullFormItemName({ prefix, column: childColumn })
          : childColumn.getFilterKey()
      ]);
      // eslint-disable-next-line no-use-before-define
      resetColumn({ column: childColumn, form, forForm, prefix });
    });
  }
}

export function resetColumn({ column, form, forForm, prefix }) {
  if (!forForm && column.getFilterRequired() && column.getFilterDefault()) {
    form.setFieldsValue({
      [column.getFilterKey()]: column.getFilterDefault(),
    });
  } else {
    form.resetFields([
      getFullFormItemName({ prefix, column })
    ]);
  }
  resetChildColumn({ column, form, prefix });
}

export default {
  resetChildColumn,
  resetColumn
};
