import Action from './Action';

export default class CreateAction extends Action {
  constructor(config = {}) {
    super({
      ...config,
      global: true,
      multiple: false
    });
  }

  getTitle() {
    return this.config.get('title', '新建');
  }

  getHandler({ create }) {
    return this.config.get('handler', create);
  }

  getHandlingMessage() {
    return this.config.get('handlingMessage', '正在保存……');
  }

  getColumns({ table }) {
    return this.config.get('columns', table.getColumns());
  }

  // eslint-disable-next-line class-methods-use-this
  checkVisibility() {
    return true;
  }
}
