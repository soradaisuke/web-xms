import Immutable from 'immutable';

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

    if (!primaryColumn) {
      throw new Error('missing primary key');
    } else {
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
      const valueOptions = (
        column.getValueOptions() || Immutable.List()
      ).filter(option => option.get('default'));
      if (valueOptions.size > 0) {
        this.defaultFilter = this.defaultFilter || {};
        this.defaultFilter[
          column.getTableFilterKey()
        ] = column.canFilterMultipleInTable()
          ? valueOptions.map(option => option.get('value')).toArray()
          : valueOptions.getIn([0, 'value']);
      }
    });
  }

  findCascadeColumn() {
    this.columns.forEach(column => {
      const parentKey = column.getParentKey();
      if (parentKey) {
        const parentColumn = this.columns.find(c => c.getKey() === parentKey);
        if (parentColumn) {
          // eslint-disable-next-line no-param-reassign
          column.parentColumn = parentColumn;
          parentColumn.childColumn = column;
        }
      }
    });
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
