import Action from './Action';

export default class DeleteAction extends Action {
  getType() {
    return this.config.get('type', 'danger');
  }

  getShape() {
    return this.config.get('shape', 'circle');
  }

  getIcon() {
    return this.config.get('icon', 'delete');
  }

  getTitle() {
    return this.config.get('title', '删除');
  }

  getConfirmType() {
    return this.config.getIn(['confirm', 'type'], 'pop');
  }

  getConfirmTitle() {
    return this.config.getIn(['confirm', 'title'], '确认删除?');
  }

  getHandler({ remove }) {
    return this.config.get('handler', remove);
  }

  getHandlingMessage() {
    return this.config.get('handlingMessage', '正在删除……');
  }

  // eslint-disable-next-line class-methods-use-this
  canHandleGlobal() {
    return false;
  }

  // eslint-disable-next-line class-methods-use-this
  needReload() {
    return true;
  }
}
