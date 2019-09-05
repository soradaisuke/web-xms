import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Img } from '@qt/react-core';
import { generateUpYunImageUrl } from '@qt/web-core';
import { Col, Slider, Switch, Button } from 'antd';
import ActivatorModal from './ActivatorModal';
import './ZoomImg.less';

export default class ZoomImg extends React.PureComponent {
  static displayName = 'ZoomImg';

  static propTypes = {
    src: PropTypes.string,
    imgClassName: PropTypes.string,
    modalWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    showLeftRightFlip: PropTypes.bool,
    showTopDownFlip: PropTypes.bool,
    showRotate: PropTypes.bool
  };

  static defaultProps = {
    src: '',
    imgClassName: '',
    modalWidth: '',
    showLeftRightFlip: false,
    showTopDownFlip: false,
    showRotate: false
  };

  state = {
    zoomValue: 1,
    isLeftRightFlip: false,
    isTopDownFlip: false,
    rotate: 0
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

  onClickRotateLeft = () => {
    const { rotate } = this.state;
    this.setState({ rotate: (rotate - 90) % 360 });
  };

  onClickRotateRight = () => {
    const { rotate } = this.state;
    this.setState({ rotate: (rotate + 90) % 360 });
  };

  render() {
    const {
      src,
      showLeftRightFlip,
      showTopDownFlip,
      showRotate,
      modalWidth,
      imgClassName
    } = this.props;
    const { zoomValue, isLeftRightFlip, isTopDownFlip, rotate } = this.state;
    const children = (
      <Img
        src={src}
        className={classNames(imgClassName, 'zoom-img-activator')}
      />
    );

    let format = rotate > 0 ? `/rotate/${rotate}` : '';
    if (isLeftRightFlip) {
      format = `${format}/flip/left,right`;
    } else if (isTopDownFlip) {
      format = `${format}/flip/top,down`;
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
              className="action"
              checked={isLeftRightFlip}
              onChange={this.onChangeLeftRightFlip}
            />
          )}
          {showTopDownFlip && (
            <Switch
              checkedChildren="上下翻转"
              unCheckedChildren="上下不翻转"
              className="action"
              checked={isTopDownFlip}
              onChange={this.onChangeTopDownFlip}
            />
          )}
          {showRotate && (
            <>
              <Button
                className="action"
                type="primary"
                shape="circle"
                icon="undo"
                onClick={this.onClickRotateLeft}
              />
              <Button
                className="action"
                type="primary"
                shape="circle"
                icon="redo"
                onClick={this.onClickRotateRight}
              />
            </>
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
                backgroundImage: `url(${generateUpYunImageUrl(src, format)})`
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
