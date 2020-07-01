import StringColumn from './StringColumn';

export default class DateTimeColumn extends StringColumn {
  getFormat() {
    return this.config.getIn(['format'], 'YYYY-MM-DD');
  }
}
