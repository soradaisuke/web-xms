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
    return this.config.get('columns', table.getColumns());
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
}
