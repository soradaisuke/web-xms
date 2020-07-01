import UrlColumn from './UrlColumn';

export default class AudioColumn extends UrlColumn {
  showPlaybackRate() {
    return this.config.getIn(['table', 'showPlaybackRate']);
  }

  showChangeProgress() {
    return this.config.getIn(['table', 'showChangeProgress']);
  }
}
