import Column from './Column';

export default class StringColumn extends Column {
  getFormMultipleLine() {
    return this.config.getIn(['form', 'multipleLine']);
  }
}
