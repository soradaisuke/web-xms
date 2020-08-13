import StringColumn from './StringColumn';

export default class FileColumn extends StringColumn {
  getPlatform() {
    return this.config.get('platform', 'aliyun');
  }
}
