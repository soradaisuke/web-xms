"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useActionConfig;

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = require("react");

var _hasPermission = _interopRequireDefault(require("../utils/hasPermission"));

var _usePageConfig2 = _interopRequireDefault(require("./usePageConfig"));

var _useActionParams = _interopRequireDefault(require("./useActionParams"));

var _visiblePromise = _interopRequireDefault(require("../utils/visiblePromise"));

var _CreateAction = _interopRequireDefault(require("../actions/CreateAction"));

var _EditAction = _interopRequireDefault(require("../actions/EditAction"));

var _DeleteAction = _interopRequireDefault(require("../actions/DeleteAction"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useActionConfig(_ref) {
  var action = _ref.action,
      record = _ref.record,
      records = _ref.records,
      _onComplete = _ref.onComplete,
      reloadFunc = _ref.reload;
  var params = (0, _useActionParams.default)({
    record: record,
    records: records
  });
  var user = params.user;
  var shouldHandleEvery = (0, _react.useMemo)(function () {
    return !action.isGlobalAction() || action instanceof _EditAction.default || action instanceof _DeleteAction.default;
  }, [action]);
  var filteredRecords = (0, _react.useMemo)(function () {
    return records && action.isMultipleAction() && shouldHandleEvery ? (0, _filter2.default)(records, function (r) {
      return action.isEnable(_objectSpread(_objectSpread({}, params), {}, {
        records: null,
        record: r
      }));
    }) : null;
  }, [action, records, params, shouldHandleEvery]);
  var disabled = (0, _react.useMemo)(function () {
    if (filteredRecords) {
      return filteredRecords.length === 0;
    }

    if (action.isGlobalAction()) {
      return action.isMultipleAction() && records && records.length === 0 || !action.isEnable(params);
    }

    return !action.isEnable(params);
  }, [action, params, filteredRecords, records]);
  var invisible = (0, _react.useMemo)(function () {
    return !action.isVisible(params);
  }, [action, params]);
  var hasPermission = (0, _react.useMemo)(function () {
    return (0, _hasPermission.default)({
      configPermissions: action.getPermissions(),
      userPermissions: user === null || user === void 0 ? void 0 : user.get('permissions')
    });
  }, [user, action]);

  var _usePageConfig = (0, _usePageConfig2.default)(),
      edit = _usePageConfig.edit,
      remove = _usePageConfig.remove,
      create = _usePageConfig.create,
      table = _usePageConfig.table;

  var handler = (0, _react.useMemo)(function () {
    var defaultHandler;

    if (action instanceof _CreateAction.default) {
      defaultHandler = create;
    } else if (action instanceof _EditAction.default) {
      defaultHandler = edit;
    } else if (action instanceof _DeleteAction.default) {
      defaultHandler = remove;
    }

    return action === null || action === void 0 ? void 0 : action.getHandler(defaultHandler);
  }, [action, create, edit, remove]);
  var normalize = (0, _react.useMemo)(function () {
    return action.getNormalize();
  }, [action]);
  var onOk = (0, _useEventCallback2.default)(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$data = _ref2.data,
        preData = _ref2$data === void 0 ? {} : _ref2$data,
        _ref2$loadingMessage = _ref2.loadingMessage,
        loadingMessage = _ref2$loadingMessage === void 0 ? action.getHandlingMessage() : _ref2$loadingMessage,
        _ref2$successMessage = _ref2.successMessage,
        successMessage = _ref2$successMessage === void 0 ? action.getSuccessMessage() : _ref2$successMessage,
        _ref2$throwError = _ref2.throwError,
        throwError = _ref2$throwError === void 0 ? false : _ref2$throwError,
        _ref2$reload = _ref2.reload,
        reload = _ref2$reload === void 0 ? action.needReload() : _ref2$reload;

    var data = preData;

    if (data.body && (0, _isFunction2.default)(normalize)) {
      data.body = normalize(data.body);
    }

    if ((0, _isFunction2.default)(handler)) {
      var promise;

      if (action.isGlobalAction() && !shouldHandleEvery) {
        promise = handler(_objectSpread(_objectSpread({}, params), data));
      } else if (filteredRecords) {
        promise = Promise.all((0, _map2.default)(filteredRecords, function (r) {
          return handler(_objectSpread(_objectSpread({}, params), {}, {
            records: null,
            record: r,
            id: (0, _get2.default)(r, table.getPrimaryKey())
          }, data));
        }));
      } else {
        promise = handler(_objectSpread(_objectSpread({}, params), {}, {
          id: (0, _get2.default)(record, table.getPrimaryKey())
        }, data));
      }

      return (0, _visiblePromise.default)({
        promise: promise,
        loadingMessage: loadingMessage,
        successMessage: successMessage,
        throwError: throwError,
        onComplete: function onComplete() {
          var onActionComplete = action.getOnComplete();

          if ((0, _isFunction2.default)(onActionComplete)) {
            onActionComplete.apply(void 0, arguments);
          }

          if (reload && (0, _isFunction2.default)(reloadFunc)) {
            reloadFunc.apply(void 0, arguments);
          }

          if ((0, _isFunction2.default)(_onComplete)) {
            _onComplete.apply(void 0, arguments);
          }
        }
      });
    }

    return Promise.resolve();
  }, [params, record, handler, normalize, filteredRecords, reloadFunc, _onComplete]);
  return {
    invisible: invisible || !hasPermission,
    params: params,
    disabled: disabled,
    onOk: onOk
  };
}