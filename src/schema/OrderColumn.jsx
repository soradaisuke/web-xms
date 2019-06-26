import Immutable from 'immutable';
import NumberColumn from './NumberColumn';

export default class OrderColumn extends NumberColumn {
  constructor(config) {
    super(config);

    if (super.getTableSortDirections().size > 0) {
      console.error('Column.Order can not have sortDirections');
    }

    if (super.getTableDefaultSortOrder()) {
      console.error('Column.Order can not have defaultSortOrder');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getTableSortDirections() {
    return Immutable.List(['ascend']);
  }

  // eslint-disable-next-line class-methods-use-this
  getTableDefaultSortOrder() {
    return 'ascend';
  }
}
