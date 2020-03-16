import Immutable from 'immutable';
import { findIndex } from 'lodash';

export default class Table {
  constructor(columns = []) {
    this.columns = Immutable.List(columns);
    this.generateCustomize();
    this.findPrimaryKey();
    this.findDefaultSortOrder();
    this.findFixedSortOrder();
    this.findDefaultFilter();
    this.findCascadeColumn();
    this.calculateScrollWidth({
      selectedCustomizeMap: this.getDefaultSelectedCustomizeMap()
    });
    this.findHasFilter();
  }

  generateCustomize() {
    this.defaultSelectedCustomizeMap = Immutable.Map({});
    this.customizeColumns = [];
    this.columns.forEach(column => {
      if (column.isCustomize()) {
        this.defaultSelectedCustomizeMap = this.defaultSelectedCustomizeMap.set(
          column.getKey(),
          column.isCustomizeDefaultSelected()
        );
        this.customizeColumns.push(column);
      }
    });
  }

  getDefaultSelectedCustomizeMap() {
    return this.defaultSelectedCustomizeMap;
  }

  getCustomizeColumns() {
    return this.customizeColumns;
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
      if (column.getTableFilterDefault()) {
        this.defaultFilter = this.defaultFilter || {};
        this.defaultFilter[
          column.getTableFilterKey()
        ] = column.getTableFilterDefault();
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

          parentColumn.childColumn = (parentColumn.childColumn || []).concat(
            column
          );
        }
      }
    });
  }

  calculateScrollWidth({ user, selectedCustomizeMap } = {}) {
    let scrollWidth = 0;
    this.columns.forEach(c => {
      if (
        c.getTableWidth() > 0 &&
        c.canShowInTable({ user, selectedCustomizeMap })
      ) {
        scrollWidth += c.getTableWidth();
      }
    });
    this.scrollWidth = scrollWidth > 0 ? scrollWidth * 1.2 : 0;
  }

  findHasFilter() {
    this.hasFilter =
      findIndex(this.columns, column => column.canFilterInTable()) !== -1;
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

  getHasFilter() {
    return this.hasFilter;
  }
}
