import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classNames from 'classnames';
import { Row, Button } from 'antd';
import Zoom from 'react-medium-image-zoom';
import ActivatorModal from './ActivatorModal';
import 'react-medium-image-zoom/dist/styles.css';
import './ZoomImg.less';

function ZoomImg({ src, thumbnailWidth, imgClassName }) {
  const [rotate, setRotate] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  const rotateClockwiseCallback = useCallback(() => {
    setRotate(rotate + 90);
  }, [rotate, setRotate]);

  const rotateCounterClockwiseCallback = useCallback(() => {
    setRotate(rotate - 90);
  }, [rotate, setRotate]);

  const scallXCallback = useCallback(() => {
    setScaleX(-scaleX);
  }, [scaleX, setScaleX]);

  const scallYCallback = useCallback(() => {
    setScaleY(-scaleY);
  }, [scaleY, setScaleY]);

  const activator = useMemo(() => {
    return (
      <img
        alt=""
        className={classNames(imgClassName, 'zoom-img-activator')}
        src={src}
        style={thumbnailWidth ? { width: thumbnailWidth } : null}
      />
    );
  }, [src]);

  const zoomImgClassName = useMemo(
    () =>
      css({
        transform: `rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`,
        backgroundImage: `url(${src})`
      }).toString(),
    [rotate, scaleX, scaleY, src]
  );

  return (
    <ActivatorModal activator={activator} width={window.innerHeight - 200}>
      <Row>
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon="column-width"
          onClick={scallXCallback}
        />
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon="column-height"
          onClick={scallYCallback}
        />
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon="undo"
          onClick={rotateCounterClockwiseCallback}
        />
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon="redo"
          onClick={rotateClockwiseCallback}
        />
      </Row>
      <Zoom>
        <div className={classNames('zoom-img', zoomImgClassName)} />
      </Zoom>
    </ActivatorModal>
  );
}

ZoomImg.propTypes = {
  src: PropTypes.string.isRequired,
  imgClassName: PropTypes.string,
  thumbnailWidth: PropTypes.number
};

ZoomImg.defaultProps = {
  imgClassName: '',
  thumbnailWidth: null
};

export default React.memo(ZoomImg);
