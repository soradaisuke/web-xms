import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isNumber } from 'lodash';
import { css } from 'glamor';
import {
  ColumnWidthOutlined,
  ColumnHeightOutlined,
  RedoOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { Row, Button } from 'antd';
import Zoom from 'react-medium-image-zoom';
import { useEventCallback } from '@qt/react';
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
    const style = {};

    if (thumbnailWidth) {
      style.width = isNumber(thumbnailWidth)
        ? `${thumbnailWidth}px`
        : thumbnailWidth;
    }

    return src ? (
      <img
        alt=""
        className={classNames(imgClassName, 'zoom-img-activator')}
        src={src}
        style={style}
      />
    ) : null;
  }, [imgClassName, src, thumbnailWidth]);

  const zoomImgClassName = useMemo(
    () =>
      css({
        transform: `rotate(${rotate}deg) scale(${scaleX}, ${scaleY})`,
        backgroundImage: `url(${src})`,
      }).toString(),
    [rotate, scaleX, scaleY, src]
  );

  const onVisibleChange = useEventCallback((visible) => {
    if (visible) {
      setRotate(0);
      setScaleX(1);
      setScaleY(1);
    }
  });

  return (
    <ActivatorModal
      activator={activator}
      width={window.innerHeight - 200}
      onVisibleChange={onVisibleChange}
    >
      <Row>
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon={<ColumnWidthOutlined />}
          onClick={scallXCallback}
        />
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon={<ColumnHeightOutlined />}
          onClick={scallYCallback}
        />
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon={<UndoOutlined />}
          onClick={rotateCounterClockwiseCallback}
        />
        <Button
          className="action"
          type="primary"
          shape="circle"
          icon={<RedoOutlined />}
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
  thumbnailWidth: PropTypes.number,
};

ZoomImg.defaultProps = {
  imgClassName: '',
  thumbnailWidth: null,
};

export default React.memo(ZoomImg);
