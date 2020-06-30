import Immutable from 'immutable';
import findCascadeColumn from '../utils/findCascadeColumn';
import CreateAction from '../actions/CreateAction';
import EditAction from '../actions/EditAction';
import DeleteAction from '../actions/DeleteAction';

export default class Table {
  constructor(columns = [], actions = []) {
    this.columns = Immutable.List(columns);
    this.actions = Immutable.List(actions);

    this.columns.forEach(column => {
      if (column.isPrimaryKey()) {
        if (this.primaryKey) {
          console.error('multiple primary key');
        } else {
          this.primaryKey = column.getKey();
        }
      }

      if (column.getTableDefaultSortDirection()) {
        if (this.defaultSortOrder) {
          console.error('multiple default sort order');
        } else {
          this.defaultSortOrder = `${column.getKey()} ${column
            .getTableDefaultSortDirection()
            .replace('end', '')}`;
        }
      }

      if (column.getTableFixedSortDirection()) {
        if (this.fixedSortOrder) {
          console.error('multiple fixed sort order');
        } else {
          this.fixedSortOrder = `${column.getKey()} ${column
            .getTableFixedSortDirection()
            .replace('end', '')}`;
        }
      }

      if (column.getFilterDefault()) {
        this.defaultFilter = this.defaultFilter || {};
        this.defaultFilter[column.getFilterKey()] = column.getFilterDefault();
      }
    });

    if (this.columns.size > 0 && !this.primaryKey) {
      console.error('missing primary key');
    }

    findCascadeColumn(this.columns);

    this.processActions();
  }

  processActions() {
    this.rowActions = Immutable.List();
    this.globalActions = Immutable.List();
    this.multipleActions = Immutable.List();

    this.actions.forEach(action => {
      if (action.isRowAction()) {
        this.rowActions = this.rowActions.push(action);
      }

      if (action.isMultipleAction()) {
        this.multipleActions = this.multipleActions.push(action);
      }
      if (action.isGlobalAction() || action.isMultipleAction()) {
        this.globalActions = this.globalActions.push(action);
      }
      if (action instanceof EditAction) {
        this.editAction = action;
      }
      if (action instanceof CreateAction) {
        this.createAction = action;
      }
      if (action instanceof DeleteAction) {
        this.deleteAction = action;
      }
    });
  }

  getActions() {
    return this.actions;
  }

  getRowActions() {
    return this.rowActions;
  }

  getMultipleActions() {
    return this.multipleActions;
  }

  getGlobalActions() {
    return this.globalActions;
  }

  getEditAction() {
    return this.editAction;
  }

  getCreateAction() {
    return this.createAction;
  }

  getDeleteAction() {
    return this.deleteAction;
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
}
