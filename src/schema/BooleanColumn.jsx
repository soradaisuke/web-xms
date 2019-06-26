import Immutable from 'immutable';
import Column from './Column';

export default class BooleanColumn extends Column {
  getValueOptions() {
    return (
      super.getValueOptions() ||
      Immutable.fromJS([
        {
          text: '是',
          value: true
        },
        {
          text: '否',
          value: false
        }
      ])
    );
  }

  // eslint-disable-next-line class-methods-use-this
  useValueOptionsInTable() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v && v !== 'false';
  }
}
