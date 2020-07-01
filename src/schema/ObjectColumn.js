import Immutable from 'immutable';
import Column from './Column';
import findCascadeColumn from '../utils/findCascadeColumn';

export default class ObjectColumn extends Column {
  constructor(data) {
    super(data);

    this.columns = data && data.columns ? Immutable.List(data.columns) : null;
    findCascadeColumn(this.columns);
  }

  getColumns() {
    return this.columns;
  }

  resetFilters() {
    super.resetFilters();

    if (this.columns && this.columns.size) {
      this.columns.forEach(column => column.resetFilters());
    }
  }
}
