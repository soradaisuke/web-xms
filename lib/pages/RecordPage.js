"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/descriptions/style");

var _descriptions = _interopRequireDefault(require("antd/lib/descriptions"));

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/collapse/style");

var _collapse = _interopRequireDefault(require("antd/lib/collapse"));

require("antd/lib/tabs/style");

var _tabs = _interopRequireDefault(require("antd/lib/tabs"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Page = _interopRequireDefault(require("./Page"));

var _Action = _interopRequireDefault(require("../components/Action"));

var _EditableDescriptionCell = _interopRequireDefault(require("../components/Editable/EditableDescriptionCell"));

var _EditableDescriptions = _interopRequireDefault(require("../components/Editable/EditableDescriptions"));

var _usePageConfig2 = _interopRequireDefault(require("../hooks/usePageConfig"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _usePageData = _interopRequireDefault(require("../hooks/usePageData"));

var TabPane = _tabs.default.TabPane;
var Panel = _collapse.default.Panel;

function RecordPage(_ref) {
  var isLoading = _ref.isLoading,
      routes = _ref.routes;
  var pageData = (0, _usePageData.default)();
  var record = pageData.record;

  var _usePageConfig = (0, _usePageConfig2.default)(),
      Component = _usePageConfig.component,
      inline = _usePageConfig.inline,
      layout = _usePageConfig.layout,
      table = _usePageConfig.table,
      fetch = _usePageConfig.fetch,
      descriptionsProps = _usePageConfig.descriptionsProps;

  var user = (0, _useUser.default)();
  var columns = (0, _react.useMemo)(function () {
    return table.getColumns().filter(function (column) {
      return column.canShowInDescription({
        user: user,
        record: record
      });
    });
  }, [record, table, user]);
  var actions = (0, _react.useMemo)(function () {
    return table.getActions();
  }, [table]);
  var renderRouteChunk = (0, _react.useCallback)(function (chunk) {
    if (chunk && chunk.length) {
      var chunkLayout = chunk[0].layout || layout;

      switch (chunkLayout) {
        case 'collapse':
          return _react.default.createElement(_card.default, {
            key: chunk[0].path,
            className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
          }, _react.default.createElement(_collapse.default, null, (0, _map2.default)(chunk, function (_ref2) {
            var Com = _ref2.component,
                path = _ref2.path,
                _ref2$title = _ref2.title,
                title = _ref2$title === void 0 ? '' : _ref2$title;
            return _react.default.createElement(Panel, {
              header: title,
              key: path
            }, _react.default.createElement(Com, {
              inline: true
            }));
          })));

        case 'tab':
          return _react.default.createElement(_card.default, {
            key: chunk[0].path,
            className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
          }, _react.default.createElement(_tabs.default, null, (0, _map2.default)(chunk, function (_ref3) {
            var Com = _ref3.component,
                path = _ref3.path,
                _ref3$title = _ref3.title,
                title = _ref3$title === void 0 ? '' : _ref3$title;
            return _react.default.createElement(TabPane, {
              tab: title,
              key: path
            }, _react.default.createElement(Com, {
              inline: true
            }));
          })));

        case 'card':
        default:
          return (0, _map2.default)(chunk, function (_ref4) {
            var Com = _ref4.component,
                path = _ref4.path,
                _ref4$title = _ref4.title,
                title = _ref4$title === void 0 ? '' : _ref4$title;
            return _react.default.createElement(_card.default, {
              key: path,
              title: title,
              className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
            }, _react.default.createElement(Com, {
              inline: true
            }));
          });
      }
    }

    return null;
  }, [layout, inline]);
  var actionsNode = (0, _react.useMemo)(function () {
    if (actions.size === 0) {
      return null;
    }

    return _react.default.createElement(_descriptions.default.Item, {
      label: "\u64CD\u4F5C"
    }, actions.map(function (action) {
      return _react.default.createElement(_Action.default, {
        key: action.getTitle(),
        action: action,
        record: record,
        reload: fetch
      });
    }));
  }, [actions, record, fetch]);
  var contentNode = (0, _react.useMemo)(function () {
    if (!record || columns.size === 0) {
      return null;
    }

    var children = _react.default.createElement(_EditableDescriptions.default, (0, _extends2.default)({
      column: 2
    }, descriptionsProps), columns.map(function (column) {
      return _react.default.createElement(_descriptions.default.Item, (0, _extends2.default)({}, column.getDescriptionItemProps(), {
        label: column.getTitle(),
        key: column.getKey()
      }), _react.default.createElement(_EditableDescriptionCell.default, {
        record: record,
        column: column,
        reload: fetch
      }));
    }), actionsNode);

    return inline ? children : _react.default.createElement(_card.default, {
      className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
    }, children);
  }, [record, columns, descriptionsProps, actionsNode, inline, fetch]);
  var routesNode = (0, _react.useMemo)(function () {
    if (routes && routes.length) {
      return (0, _map2.default)((0, _reduce2.default)(routes, function (result, route) {
        if (result.length === 0) {
          result.push([route]);
        } else {
          var routeLayout = route.layout || layout;
          var last = result[result.length - 1];
          var lastLayout = last[0].layout || layout;

          if (routeLayout === lastLayout) {
            last.push(route);
          } else {
            result.push([route]);
          }
        }

        return result;
      }, []), function (chunk) {
        return renderRouteChunk(chunk);
      });
    }

    return null;
  }, [layout, routes, renderRouteChunk]);
  (0, _react.useEffect)(function () {
    if (columns.size > 0) {
      fetch();
    }
  }, [columns.size, fetch]);
  return _react.default.createElement(_Page.default, {
    isLoading: isLoading
  }, Component ? _react.default.createElement(_card.default, {
    className: (0, _classnames.default)('content-card', inline ? 'inline' : '')
  }, _react.default.createElement(Component, null)) : null, contentNode, routesNode);
}

RecordPage.propTypes = {
  routes: _propTypes.default.arrayOf(_propTypes.default.shape({
    component: _propTypes.default.bode
  })),
  isLoading: _propTypes.default.bool
};
RecordPage.defaultProps = {
  routes: [],
  isLoading: false
};
var _default = RecordPage;
exports.default = _default;