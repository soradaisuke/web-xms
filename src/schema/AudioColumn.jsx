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
}
