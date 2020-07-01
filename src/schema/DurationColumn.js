import NumberColumn from './NumberColumn';

export default class DurationColumn extends NumberColumn {
  getFormat() {
    return this.config.getIn(['format'], 'HH:mm:ss');
  }
}
