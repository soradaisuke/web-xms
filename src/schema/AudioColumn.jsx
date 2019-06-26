import React from 'react';
import InlineAudioPlayer from '../components/Common/InlineAudioPlayer';
import StringColumn from './StringColumn';

export default class AudioColumn extends StringColumn {
  // eslint-disable-next-line class-methods-use-this
  renderInTableValueDefault({ value }) {
    return value ? (
      <InlineAudioPlayer
        showPlaybackRate={this.showPlaybackRate()}
        showChangeProgress={this.showChangeProgress()}
        url={value}
      />
    ) : null;
  }

  showPlaybackRate() {
    return this.config.getIn(['table', 'showPlaybackRate']);
  }

  showChangeProgress() {
    return this.config.getIn(['table', 'showChangeProgress']);
  }

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
