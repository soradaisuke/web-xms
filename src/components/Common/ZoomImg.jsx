import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Img } from '@qt/react-core';
import { generateUpYunImageUrl } from '@qt/web-core';
import { Col, Slider, Switch } from 'antd';
import ActivatorModal from '../ActivatorModal';
import './ZoomImg.less';

export default class ZoomImg extends React.PureComponent {
  static displayName = 'ZoomImg';

  static propTypes = {
    src: PropTypes.string,
    imgClassName: PropTypes.string,
    modalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showLeftRightFlip: PropTypes.bool,
    showTopDownFlip: PropTypes.bool
  };

  static defaultProps = {
    src: '',
    imgClassName: '',
    modalWidth: '',
    showLeftRightFlip: false,
    showTopDownFlip: false
  };

  state = {
    zoomValue: 1,
    isLeftRightFlip: false,
    isTopDownFlip: false
  };

  changeZoomValue = zoomValue => {
    this.setState({
      zoomValue
    });
  };

  onChangeLeftRightFlip = isLeftRightFlip => {
    this.setState({
      isLeftRightFlip,
      isTopDownFlip: false
    });
  };

  onChangeTopDownFlip = isTopDownFlip => {
    this.setState({
      isTopDownFlip,
      isLeftRightFlip: false
    });
  };

  render() {
    const {
      src,
      showLeftRightFlip,
      showTopDownFlip,
      modalWidth,
      imgClassName
    } = this.props;
    const { zoomValue, isLeftRightFlip, isTopDownFlip } = this.state;
    const children = (
      <Img
        src={src}
        className={classNames(imgClassName, 'zoom-img-activator')}
      />
    );
    let flip = '';
    if (isLeftRightFlip) {
      flip = '/flip/left,right';
    } else if (isTopDownFlip) {
      flip = '/flip/top,down';
    }

    return (
      <ActivatorModal
        activator={children}
        width={modalWidth || window.innerWidth - 300}
      >
        <Col>
          {showLeftRightFlip && (
            <Switch
              checkedChildren="左右翻转"
              unCheckedChildren="左右不翻转"
              className="zoom-switch"
              checked={isLeftRightFlip}
              onChange={this.onChangeLeftRightFlip}
            />
          )}
          {showTopDownFlip && (
            <Switch
              checkedChildren="上下翻转"
              unCheckedChildren="上下不翻转"
              className="zoom-switch"
              checked={isTopDownFlip}
              onChange={this.onChangeTopDownFlip}
            />
          )}
          <div
            className="zoom-img-wrapper"
            style={{ height: `${window.innerHeight - 300}px` }}
          >
            <div
              className="zoom-img"
              style={{
                width: `${100 * zoomValue}%`,
                height: `${100 * zoomValue}%`,
                backgroundImage: `url(${generateUpYunImageUrl(src, flip)})`
              }}
            />
          </div>
          <Slider
            min={1}
            max={5}
            step={0.1}
            onChange={this.changeZoomValue}
            value={zoomValue}
          />
        </Col>
      </ActivatorModal>
    );
  }
}
