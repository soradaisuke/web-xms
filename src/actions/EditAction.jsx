import { isFunction, get } from 'lodash';
import Action from './Action';

export default class EditAction extends Action {
  getShape() {
    return this.config.get('shape', 'circle');
  }

  getIcon() {
    return this.config.get('icon', 'edit');
  }

  getTitle() {
    return this.config.get('title', '编辑');
  }

  getColumns({ table }) {
    return this.columns || table.getColumns();
  }

  getHandler({ edit }) {
    return this.config.get('handler', edit);
  }

  getHandlingMessage() {
    return this.config.get('handlingMessage', '正在保存……');
  }

  // eslint-disable-next-line class-methods-use-this
  checkVisibility() {
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  canHandleGlobal() {
    return false;
  }

  isDisabled({ user, record, records, matchParams, table }) {
    const enable = this.config.get('enable');
    return (
      isFunction(enable) &&
      !enable({
        record,
        records,
        user,
        matchParams,
        id: get(record, table.getPrimaryKey())
      })
    );
  }

  // eslint-disable-next-line class-methods-use-this
  renderInline({ record, column, onClick } = {}) {
    return column.renderInlineEdit({ record, onClick });
  }

  setLink(link) {
    return new EditAction(this.config.set('link', link).toJS());
  }
}
