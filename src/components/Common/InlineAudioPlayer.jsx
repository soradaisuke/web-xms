import React from 'react';
import PropTypes from 'prop-types';
import Player from 'react-player';
import { connect } from 'dva';
import classNames from 'classnames';
import shortId from 'shortid';
import {
  MinusOutlined,
  PlusOutlined,
  PauseOutlined,
  CaretRightOutlined
} from '@ant-design/icons';
import { Button, Radio, Progress } from 'antd';
import './InlineAudioPlayer.less';

const ButtonGroup = Button.Group;

class InlineAudioPlayer extends React.PureComponent {
  static displayName = 'InlineAudioPlayer';

  static propTypes = {
    playbackRates: PropTypes.arrayOf(PropTypes.number),
    changePlayedAudio: PropTypes.func.isRequired,
    id: PropTypes.string,
    url: PropTypes.string,
    loop: PropTypes.bool,
    showPlaybackRate: PropTypes.bool,
    showChangeProgress: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    id: null,
    playbackRates: [1, 2],
    url: '',
    className: '',
    loop: false,
    showPlaybackRate: false,
    showChangeProgress: false
  };

  state = {
    played: 0,
    playbackRate: 1.0,
    id: shortId.generate()
  };

  setPlaybackRate = v => {
    this.setState({ playbackRate: v });
  };

  onProgress = state => {
    this.setState(state);
  };

  onEnded = () => {
    const { loop, changePlayedAudio } = this.props;
    if (!loop) {
      changePlayedAudio('');
    }
  };

  ref = player => {
    this.player = player;
  };

  onClickableRef = el => {
    this.el = el;
  };

  onClickPlay = () => {
    const { changePlayedAudio, id } = this.props;
    const { id: myId } = this.state;
    if (id === myId) {
      changePlayedAudio('');
    } else {
      changePlayedAudio(myId);
    }
  };

  onChangeRate = e => {
    this.setPlaybackRate(e.target.value);
  };

  increase = () => {
    const { played } = this.state;
    this.player.seekTo(played + 0.1 < 1 ? played + 0.1 : 0.9999);
  };

  decline = () => {
    const { played } = this.state;
    this.player.seekTo(played - 0.1 >= 0 ? played - 0.1 : 0);
  };

  render() {
    const {
      url,
      className,
      loop,
      showPlaybackRate,
      showChangeProgress,
      playbackRates,
      id
    } = this.props;
    const { played, playbackRate, id: myId } = this.state;
    const playing = myId === id;

    return (
      <div className={classNames('inline-audio-player-wrapper', className)}>
        {showChangeProgress && (
          <ButtonGroup size="small">
            <Button onClick={this.decline} icon={<MinusOutlined />} />
            <Button onClick={this.increase} icon={<PlusOutlined />} />
          </ButtonGroup>
        )}
        <Player
          ref={this.ref}
          height="0"
          width="0"
          url={url}
          playing={playing}
          loop={loop}
          playbackRate={playbackRate}
          volume={1}
          onEnded={this.onEnded}
          onProgress={this.onProgress}
          onSeek={this.onSeek}
        />
        <Progress
          type="circle"
          width={44}
          strokeWidth={12}
          style={{ padding: 0 }}
          percent={played * 100}
          format={() => (
            <Button
              type={playing ? '' : 'primary'}
              shape="circle"
              onClick={this.onClickPlay}
              icon={playing ? <PauseOutlined /> : <CaretRightOutlined />}
            />
          )}
        />
        {showPlaybackRate && (
          <Radio.Group
            size="small"
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  id: state.audio
});

const mapDispatchToProps = dispatch => ({
  changePlayedAudio: async id =>
    dispatch({
      type: 'audio/changePlayedAudio',
      payload: {
        id
      }
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(InlineAudioPlayer);
