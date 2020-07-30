"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DragableBodyRow;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _icons = require("@ant-design/icons");

require("./DragableBodyRow.less");

var type = 'DragableBodyRow';

function DragableBodyRow(_ref) {
  var index = _ref.index,
      moveRow = _ref.moveRow,
      className = _ref.className,
      showArrowUp = _ref.showArrowUp,
      showArrowDown = _ref.showArrowDown,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, ["index", "moveRow", "className", "showArrowUp", "showArrowDown", "children"]);
  var ref = (0, _react.useRef)();

  var _useDrop = (0, _reactDnd.useDrop)({
    accept: type,
    collect: function collect(monitor) {
      var _ref2 = monitor.getItem() || {},
          dragIndex = _ref2.index;

      if (dragIndex === index) {
        return {};
      }

      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? 'drop-over-downward' : 'drop-over-upward'
      };
    },
    drop: function drop(item) {
      moveRow(item.index, index);
    }
  }),
      _useDrop2 = (0, _slicedToArray2.default)(_useDrop, 2),
      _useDrop2$ = _useDrop2[0],
      isOver = _useDrop2$.isOver,
      dropClassName = _useDrop2$.dropClassName,
      drop = _useDrop2[1];

  var _useDrag = (0, _reactDnd.useDrag)({
    item: {
      type: type,
      index: index
    },
    collect: function collect(monitor) {
      return {
        isDragging: monitor.isDragging()
      };
    }
  }),
      _useDrag2 = (0, _slicedToArray2.default)(_useDrag, 2),
      drag = _useDrag2[1];

  drop(drag(ref));
  return _react.default.createElement("tr", (0, _extends2.default)({
    ref: ref,
    className: (0, _classnames.default)(className, isOver ? dropClassName : '')
  }, restProps), children, showArrowUp || showArrowDown ? _react.default.createElement("td", null, showArrowUp && _react.default.createElement(_icons.ArrowUpOutlined, {
    onClick: function onClick(e) {
      e.stopPropagation();
      moveRow(index, index - 1);
    }
  }), showArrowDown && _react.default.createElement(_icons.ArrowDownOutlined, {
    onClick: function onClick(e) {
      e.stopPropagation();
      moveRow(index, index + 1);
    }
  })) : null);
}

DragableBodyRow.propTypes = {
  moveRow: _propTypes.default.func,
  index: _propTypes.default.number,
  showArrowUp: _propTypes.default.bool,
  showArrowDown: _propTypes.default.bool,
  className: _propTypes.default.string,
  children: _propTypes.default.node
};
DragableBodyRow.defaultProps = {
  moveRow: function moveRow() {},
  index: 0,
  showArrowUp: false,
  showArrowDown: false,
  className: '',
  children: null
};