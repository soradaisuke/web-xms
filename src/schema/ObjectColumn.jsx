import Column from './Column';

export default class ObjectColumn extends Column {
  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    return JSON.stringify(value);
  }
}
