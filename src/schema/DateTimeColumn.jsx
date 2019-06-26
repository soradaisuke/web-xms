import moment from 'moment';
import { isFunction } from 'lodash';
import BaseDateTimeColumn from './BaseDateTimeColumn';

export default class DateTimeColumn extends BaseDateTimeColumn {
  // eslint-disable-next-line class-methods-use-this
  getDefaultInTableFormat() {
    return 'YYYY-MM-DD HH:mm:ss';
  }

  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    return moment(value).isValid()
      ? moment(value).format(this.getInTableFormat())
      : '';
  }

  // eslint-disable-next-line class-methods-use-this
  showTime() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  formatFilterValue(v) {
    return v && isFunction(v.toISOString) ? v.toISOString() : v;
  }
}
