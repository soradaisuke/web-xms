import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './DraggableBodyRow.less';

const type = 'DraggableBodyRow';

function DraggableBodyRow({
  index,
  moveRow,
  className,
  showArrowUp,
  showArrowDown,
  children,
  ...restProps
}) {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? 'drop-over-downward' : 'drop-over-upward',
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });

  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={classNames(className, isOver ? dropClassName : '')}
      {...restProps}
    >
      {children}
      {showArrowUp || showArrowDown ? (
        <td>
          {showArrowUp && (
            <ArrowUpOutlined
              onClick={(e) => {
                e.stopPropagation();
                moveRow(index, index - 1);
              }}
            />
          )}
          {showArrowDown && (
            <ArrowDownOutlined
              onClick={(e) => {
                e.stopPropagation();
                moveRow(index, index + 1);
              }}
            />
          )}
        </td>
      ) : null}
    </tr>
  );
}

DraggableBodyRow.propTypes = {
  moveRow: PropTypes.func,
  index: PropTypes.number,
  showArrowUp: PropTypes.bool,
  showArrowDown: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

DraggableBodyRow.defaultProps = {
  moveRow: () => {},
  index: 0,
  showArrowUp: false,
  showArrowDown: false,
  className: '',
  children: null,
};

export default React.memo(DraggableBodyRow);
