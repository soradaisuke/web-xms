"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/breadcrumb/style");

var _breadcrumb = _interopRequireDefault(require("antd/lib/breadcrumb"));

var _forEach2 = _interopRequireDefault(require("lodash/forEach"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dva = require("dva");

var _BreadcrumbContent = _interopRequireDefault(require("./BreadcrumbContent"));

var matchPath = _dva.router.matchPath,
    useLocation = _dva.router.useLocation;

function addBreadcrumbItem(_ref) {
  var pathname = _ref.pathname,
      routes = _ref.routes,
      items = _ref.items;
  (0, _forEach2.default)(routes, function (_ref2) {
    var path = _ref2.path,
        component = _ref2.component,
        title = _ref2.title,
        inline = _ref2.inline,
        breadcrumb = _ref2.breadcrumb,
        namespace = _ref2.namespace,
        childRoutes = _ref2.routes;

    if (matchPath(pathname, {
      path: path
    })) {
      if ((title || breadcrumb) && !inline) {
        items.push(_react.default.createElement(_breadcrumb.default.Item, {
          key: path
        }, _react.default.createElement(_BreadcrumbContent.default, {
          namespace: namespace,
          hasLink: !!component,
          path: path,
          title: title,
          breadcrumb: breadcrumb
        })));
      }

      if (childRoutes && childRoutes.length > 0) {
        addBreadcrumbItem({
          pathname: pathname,
          routes: childRoutes,
          items: items
        });
      }

      return false;
    }

    return true;
  });
}

function NavBreadcrumb(_ref3) {
  var routes = _ref3.routes;

  var _useLocation = useLocation(),
      pathname = _useLocation.pathname;

  var items = (0, _react.useMemo)(function () {
    var array = [];
    addBreadcrumbItem({
      pathname: pathname,
      routes: routes,
      items: array
    });
    return array;
  }, [routes, pathname]);
  return _react.default.createElement(_breadcrumb.default, null, items);
}

NavBreadcrumb.propTypes = {
  routes: _propTypes.default.array.isRequired
};

var _default = _react.default.memo(NavBreadcrumb);

exports.default = _default;