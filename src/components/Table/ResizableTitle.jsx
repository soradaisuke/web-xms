import React from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';
import './ResizableTitle.less';

function ResizableTitle({ onResize, width, ...restProps }) {
  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span
          className="react-resizable-handle"
          onClick={e => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
}

ResizableTitle.propTypes = {
  onResize: PropTypes.func,
  width: PropTypes.number
};

ResizableTitle.defaultProps = {
  onResize: null,
  width: 0
};

export default ResizableTitle;
