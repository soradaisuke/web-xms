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

  getHandlingMessage() {
    return this.config.get('handlingMessage', '正在保存……');
  }

  // eslint-disable-next-line class-methods-use-this
  checkVisibility() {
    return true;
  }

  setLink(link) {
    return new CreateAction(this.config.set('link', link).toJS());
  }
}
