import Immutable from 'immutable';
import StringColumn from './StringColumn';

export default class DateTimeColumn extends StringColumn {
  getFormat() {
    return this.config.getIn(['format'], 'YYYY-MM-DD HH:mm:ss');
  }

  getFilterPresets() {
    return this.config.getIn(['table', 'filterPresets'], Immutable.List([]));
  }

  getFormPresets() {
    return this.config.getIn(['form', 'presets'], Immutable.List([]));
  }
}
