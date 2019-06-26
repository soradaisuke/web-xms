import StringColumn from './StringColumn';

export default class UrlColumn extends StringColumn {
  getFormPlaceholder() {
    return (
      this.config.getIn(['form', 'placeHolder']) ||
      `请输入${this.getTitle()}地址`
    );
  }

  // eslint-disable-next-line class-methods-use-this
  getFormDefaultRules() {
    return [
      {
        type: 'url',
        message: '格式不正确，要求为网络地址'
      }
    ];
  }
}
