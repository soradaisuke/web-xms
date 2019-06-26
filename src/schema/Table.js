import Immutable from 'immutable';
import OrderColumn from './OrderColumn';

export default class Table {
  constructor(columns = []) {
    this.columns = Immutable.List(columns);

    this.findPrimaryKey();
    this.findOrderColumn();
    this.findDefaultSortOrder();
  }

  findPrimaryKey() {
    const primaryColumn = this.columns.find(column => column.isPrimaryKey());

    if (!primaryColumn) {
      throw new Error('missing primary key');
    } else {
      this.primaryKey = primaryColumn.getKey();
    }
  }

  findDefaultSortOrder() {
    const column =
      this.getOrderColumn() ||
      this.columns.find(c => !!c.getTableDefaultSortOrder());

    if (column) {
      this.defaultSortOrder = `${column.getKey()} ${column
        .getTableDefaultSortOrder()
        .replace('end', '')}`;
    }
  }

  findOrderColumn() {
    this.orderColumn = this.columns.find(
      column => column instanceof OrderColumn
    );
  }

  getColumns() {
    return this.columns;
  }

  getPrimaryKey() {
    return this.primaryKey;
  }

  getDefaultSortOrder() {
    return this.defaultSortOrder;
  }

  getOrderColumn() {
    return this.orderColumn;
  }
}
