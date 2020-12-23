import Action from './Action';

export default class CreateAction extends Action {
  constructor(config = {}) {
    super({
      successMessage: '新建成功',
      ...config,
      global: true,
      multiple: false,
    });
  }

  getTitle() {
    return this.config.get('title', '新建');
  }

  getHandlingMessage() {
    return this.config.get('handlingMessage', '正在保存……');
  }

  setLink(link) {
    return new CreateAction(this.config.set('link', link).toJS());
  }

  setTitle(title) {
    return new CreateAction(this.config.set('title', title).toJS());
  }
}
