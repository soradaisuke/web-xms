import React from 'react';
import PropTypes from 'prop-types';
import Player from 'react-player';
import classNames from 'classnames';
import { Button, Slider, Radio } from 'antd';
import { formatDuration } from 'web-core';
import { ClickableDiv } from 'react-core';
import './AudioPlayer.less';

export default class AudioPlayer extends React.PureComponent {
  static displayName = 'AudioPlayer';

  static propTypes = {
    playbackRates: PropTypes.arrayOf(PropTypes.number),
    url: PropTypes.string,
    loop: PropTypes.bool,
    showPlaybackRate: PropTypes.bool,
    showVolume: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    playbackRates: [1, 1.25, 1.5, 2],
    url: '',
    className: '',
    loop: false,
    showPlaybackRate: true,
    showVolume: true
  };

  state = {
    playing: false,
    volume: 1.0,
    played: 0,
    playbackRate: 1.0,
    seekTo: 0
  };

  getProgressByEvent(event) {
    let progress =
      (event.pageX - this.el.getBoundingClientRect().left) /
      this.el.offsetWidth;
    progress = Math.max(0, progress);
    progress = Math.min(1, progress);
    return progress;
  }

  pause = () => {
    this.setState({ playing: false });
  };

  setVolume = value => {
    this.setState({ volume: value / 100 });
  };

  setPlaybackRate = v => {
    this.setState({ playbackRate: v });
  };

  onSeekStart = () => {
    this.addEventListeners();
    this.setState({
      seeking: true,
      playing: false
    });
  };

  onSeekEnd = () => {
    this.removeEventListenrs();
    this.setState({
      seeking: false,
      playing: true
    });
  };

  onProgress = state => {
    this.setState(state);
  };

  onSeek = seconds => {
    this.setState({
      seekTo: seconds
    });
  };

  onChangeProgress = e => {
    this.player.seekTo(this.getProgressByEvent(e));
  };

  onEnded = () => {
    const { loop } = this.props;
    this.setState({ playing: loop });
  };

  ref = player => {
    this.player = player;
  };

  onClickableRef = el => {
    this.el = el;
  };

  onClickPlay = () => {
    const { playing } = this.state;
    this.setState({
      playing: !playing
    });
  };

  onChangeRate = e => {
    this.setPlaybackRate(e.target.value);
  };

  addEventListeners() {
    window.addEventListener('mouseup', this.onSeekEnd);
    window.addEventListener('mousemove', this.onChangeProgress);
  }

  removeEventListenrs() {
    window.removeEventListener('mouseup', this.onSeekEnd);
    window.removeEventListener('mousemove', this.onChangeProgress);
  }

  render() {
    const {
      url,
      className,
      loop,
      showPlaybackRate,
      showVolume,
      playbackRates
    } = this.props;
    const {
      playing,
      volume,
      played,
      seekTo,
      seeking,
      playbackRate,
      playedSeconds
    } = this.state;
    const duration =
      this.player && this.player.getDuration() ? this.player.getDuration() : 0;
    const currentPlayed =
      seeking && duration && seekTo ? seekTo / duration : played;

    return (
      <div className={classNames('audio-player-wrapper', className)}>
        <Player
          ref={this.ref}
          height="0"
          width="0"
          url={url}
          playing={playing}
          loop={loop}
          playbackRate={playbackRate}
          volume={volume}
          onEnded={this.onEnded}
          onProgress={this.onProgress}
          onSeek={this.onSeek}
        />
        <ClickableDiv
          className="audio-player-progress"
          onClick={this.onChangeProgress}
          onNodeRef={this.onClickableRef}
        >
          <div className="audio-player-rail" />
          <div
            className="audio-player-track"
            style={{ width: `${currentPlayed * 100}%` }}
          />
          <button
            type="button"
            className="audio-player-handle"
            style={{ left: `${currentPlayed * 100}%` }}
            onMouseDown={this.onSeekStart}
          />
        </ClickableDiv>
        <div className="audio-player-controls">
          <Button
            type={playing ? '' : 'primary'}
            shape="circle"
            onClick={this.onClickPlay}
            icon={playing ? 'pause' : 'caret-right'}
          />
          <div className="audio-player-duration">
            {formatDuration({ seconds: playedSeconds })}/
            {formatDuration({ seconds: duration })}
          </div>
          {showPlaybackRate && (
            <Radio.Group
              value={playbackRate}
              onChange={this.onChangeRate}
              buttonStyle="solid"
              className="audio-player-rates"
            >
              {playbackRates.map(v => (
                <Radio.Button key={v} value={v}>{`${v}x`}</Radio.Button>
              ))}
            </Radio.Group>
          )}
          {showVolume && (
            <div className="audio-player-sound">
              <Button size="small" shape="circle" icon="sound" />
              <Slider
                className="audio-player-sound-slider"
                defaultValue={volume * 100}
                onChange={this.setVolume}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
