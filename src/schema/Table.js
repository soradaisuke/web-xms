import Immutable from 'immutable';
import findCascadeColumn from '../utils/findCascadeColumn';

export default class Table {
  constructor(columns = []) {
    this.columns = Immutable.List(columns);

    this.findPrimaryKey();
    this.findDefaultSortOrder();
    this.findFixedSortOrder();
    this.findDefaultFilter();
    this.findCascadeColumn();
    this.calculateScrollWidth();
  }

  findPrimaryKey() {
    const primaryColumn = this.columns.find(column => column.isPrimaryKey());

    if (this.columns.size > 0 && !primaryColumn) {
      console.error('missing primary key');
    } else if (primaryColumn) {
      this.primaryKey = primaryColumn.getKey();
    }
  }

  findDefaultSortOrder() {
    const column = this.columns.find(c => !!c.getTableDefaultSortOrder());

    if (column) {
      this.defaultSortOrder = `${column.getKey()} ${column
        .getTableDefaultSortOrder()
        .replace('end', '')}`;
    }
  }

  findFixedSortOrder() {
    const column = this.columns.find(c => !!c.getTableFixedSortOrder());

    if (column) {
      this.fixedSortOrder = `${column.getKey()} ${column
        .getTableFixedSortOrder()
        .replace('end', '')}`;
    }
  }

  findDefaultFilter() {
    this.columns.forEach(column => {
      if (column.getFilterDefault()) {
        this.defaultFilter = this.defaultFilter || {};
        this.defaultFilter[column.getFilterKey()] = column.getFilterDefault();
      }
    });
  }

  findCascadeColumn() {
    findCascadeColumn(this.columns);
  }

  calculateScrollWidth() {
    let scrollWidth = 0;
    this.columns.forEach(c => {
      if (c.getTableWidth() > 0) {
        scrollWidth += c.getTableWidth();
      }
    });

    this.scrollWidth = scrollWidth > 0 ? scrollWidth * 1.2 : 0;
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

  getFixedSortOrder() {
    return this.fixedSortOrder;
  }

  getDefaultFilter() {
    return this.defaultFilter;
  }

  getScrollWidth() {
    return this.scrollWidth;
  }
}
