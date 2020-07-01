"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isNumber2 = _interopRequireDefault(require("lodash/isNumber"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var _webCommon = require("@qt/web-common");

var _reactLinesEllipsis = _interopRequireDefault(require("react-lines-ellipsis"));

var _Column = _interopRequireDefault(require("../../schema/Column"));

var _EditableCell = _interopRequireDefault(require("./EditableCell"));

var _useParentFilterValue = _interopRequireDefault(require("../../hooks/useParentFilterValue"));

var _InlineAudioPlayer = _interopRequireDefault(require("../Common/InlineAudioPlayer"));

var _DateTimeColumn = _interopRequireDefault(require("../../schema/DateTimeColumn"));

var _DurationColumn = _interopRequireDefault(require("../../schema/DurationColumn"));

var _ImageColumn = _interopRequireDefault(require("../../schema/ImageColumn"));

var _ObjectColumn = _interopRequireDefault(require("../../schema/ObjectColumn"));

var _AudioColumn = _interopRequireDefault(require("../../schema/AudioColumn"));

var _ZoomImg = _interopRequireDefault(require("../ZoomImg"));

var _RecordLink = _interopRequireDefault(require("../RecordLink"));

require("./EditableTableCell.less");

function renderInTable(_ref) {
  var column = _ref.column,
      value = _ref.value,
      parentFilterValue = _ref.parentFilterValue;

  if (column instanceof _AudioColumn.default) {
    return value ? _react.default.createElement(_InlineAudioPlayer.default, {
      showPlaybackRate: column.showPlaybackRate(),
      showChangeProgress: column.showChangeProgress(),
      url: value
    }) : null;
  }

  if (column instanceof _DateTimeColumn.default) {
    return value && (0, _moment.default)(value).isValid() ? (0, _moment.default)(value).format(column.getFormat()) : '';
  }

  if (column instanceof _DurationColumn.default) {
    return (0, _isNumber2.default)(value) ? (0, _moment.default)().startOf('day').add(value, 's').format(column.getFormat()) : '';
  }

  if (column instanceof _ImageColumn.default) {
    var src = (0, _webCommon.removeUrlProtocol)(value);
    return _react.default.createElement(_ZoomImg.default, {
      thumbnailWidth: column.getTableWidth(),
      src: src
    });
  }

  if (column instanceof _ObjectColumn.default) {
    return JSON.stringify(value);
  }

  var option = column.getFilterOption({
    value: value,
    parentFilterValue: parentFilterValue
  });

  if (option) {
    return option.text;
  }

  var maxLines = column.getTableMaxLines();

  if (maxLines > 0) {
    return _react.default.createElement(_reactLinesEllipsis.default, {
      text: value || '',
      maxLine: maxLines,
      ellipsis: "...",
      trimRight: true,
      basedOn: "letters"
    });
  }

  return value;
}

function EditableTableCell(_ref2) {
  var children = _ref2.children,
      record = _ref2.record,
      column = _ref2.column,
      onComplete = _ref2.onComplete,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, ["children", "record", "column", "onComplete"]);
  var parentFilterValue = (0, _useParentFilterValue.default)(column);
  var value = (0, _react.useMemo)(function () {
    return (0, _get2.default)(record, column === null || column === void 0 ? void 0 : column.getKey());
  }, [column, record]);
  var valueNode = (0, _react.useMemo)(function () {
    if (!column) {
      return children;
    }

    var render = column.getTableRender();

    if ((0, _isFunction2.default)(render)) {
      return render({
        value: value,
        record: record,
        reload: onComplete
      });
    }

    var link = column.getTableLink();

    if (link) {
      return _react.default.createElement(_RecordLink.default, {
        link: link,
        record: record
      }, renderInTable({
        value: value,
        parentFilterValue: parentFilterValue,
        column: column
      }));
    }

    if (column.isArray()) {
      return _react.default.createElement(_react.default.Fragment, null, (0, _map2.default)(value, function (v) {
        return _react.default.createElement(_react.default.Fragment, {
          key: v
        }, renderInTable({
          value: v,
          column: column,
          parentFilterValue: parentFilterValue
        }), _react.default.createElement("br", null));
      }));
    }

    return renderInTable({
      value: value,
      parentFilterValue: parentFilterValue,
      column: column
    });
  }, [column, value, parentFilterValue, children, record, onComplete]);
  var childrenNode = (0, _react.useMemo)(function () {
    if (column && column.canInlineEdit()) {
      return _react.default.createElement(_EditableCell.default, {
        record: record,
        column: column,
        onComplete: onComplete
      }, valueNode);
    }

    return valueNode;
  }, [column, valueNode, record, onComplete]);
  return _react.default.createElement("td", restProps, childrenNode);
}

EditableTableCell.propTypes = {
  children: _propTypes.default.any,
  column: _propTypes.default.instanceOf(_Column.default),
  onComplete: _propTypes.default.func,
  record: _propTypes.default.object
};
EditableTableCell.defaultProps = {
  children: null,
  column: null,
  onComplete: null,
  record: {}
};

var _default = _react.default.memo(EditableTableCell);

exports.default = _default;