import Immutable from 'immutable';
import EditAction from './EditAction';

export default class TableActions {
  constructor(actions = []) {
    this.actions = Immutable.List(actions);
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
      if (action.isGlobalAction()) {
        this.globalActions = this.globalActions.push(action);
      }
      if (action instanceof EditAction) {
        this.editAction = action;
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
}
