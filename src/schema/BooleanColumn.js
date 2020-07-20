import Immutable from 'immutable';
import Column from './Column';

export default class BooleanColumn extends Column {
  constructor(config) {
    super({
      ...config,
      form: {
        initialValue: false,
        ...(config.form || {})
      }
    });
  }

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
}
