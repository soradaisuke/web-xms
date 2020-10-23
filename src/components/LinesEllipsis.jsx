import React, { useState } from 'react';
import LinesEllipsisInner from 'react-lines-ellipsis';
import PropTypes from 'prop-types';
import { ClickableDiv, useEventCallback } from '@qt/react';
import './LinesEllipsis.less';

function LinesEllipsis({ text, ...props }) {
  const [expand, setExpand] = useState(false);

  const onClickButton = useEventCallback(() => {
    setExpand(pre => !pre);
  });

  return (
    <div>
      {expand
        ? <span>
          {text}
          <ClickableDiv className="xms-lines-ellipsis-button" onClick={onClickButton}>收起</ClickableDiv>
        </span>
        : <LinesEllipsisInner
          {...props}
          text={text}
          ellipsis={
            <span>
              ...
              <ClickableDiv className="xms-lines-ellipsis-button" onClick={onClickButton}>
                展开
              </ClickableDiv>
            </span>
          }
        />
      }
    </div>
  );
}

LinesEllipsis.propTypes = {
  text: PropTypes.string
};

LinesEllipsis.defaultProps = {
  text: ''
};

export default React.memo(LinesEllipsis);
