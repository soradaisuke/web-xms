"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _useEventCallback2 = _interopRequireDefault(require("@qt/react/lib/useEventCallback"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _RecordLink = _interopRequireDefault(require("./RecordLink"));

var _Action = _interopRequireDefault(require("../actions/Action"));

var _CreateAction = _interopRequireDefault(require("../actions/CreateAction"));

var _EditAction = _interopRequireDefault(require("../actions/EditAction"));

var _usePageConfig2 = _interopRequireDefault(require("../hooks/usePageConfig"));

var _useForm = _interopRequireDefault(require("../hooks/useForm"));

var _useActionConfig2 = _interopRequireDefault(require("../hooks/useActionConfig"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Action(_ref) {
  var action = _ref.action,
      record = _ref.record,
      records = _ref.records,
      onComplete = _ref.onComplete,
      reload = _ref.reload,
      disabledRecordModal = _ref.disabledRecordModal;
  var form = (0, _useForm.default)();

  var _usePageConfig = (0, _usePageConfig2.default)(),
      table = _usePageConfig.table;

  var _useActionConfig = (0, _useActionConfig2.default)({
    action: action,
    record: record,
    records: records,
    reload: reload,
    onComplete: onComplete
  }),
      params = _useActionConfig.params,
      disabled = _useActionConfig.disabled,
      invisible = _useActionConfig.invisible,
      onOk = _useActionConfig.onOk;

  var buttonProps = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({
      className: 'action-button',
      type: action.getLink() && !disabled && !(action instanceof _CreateAction.default) && !(action instanceof _EditAction.default) ? 'link' : action.getType(),
      shape: action.getShape(),
      icon: action.getIcon(),
      children: action.getShape() !== 'circle' ? action.getTitle() : null
    }, action.getButtonProps()), {}, {
      disabled: disabled
    });
  }, [action, disabled]);
  var onFormOk = (0, _useEventCallback2.default)(function (f) {
    return (f || form).validateFields().then(function () {
      var _ref2 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(values) {
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return onOk({
                  data: {
                    body: values
                  },
                  throwError: true,
                  reload: true
                });

              case 3:
                return _context.abrupt("return", true);

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", false);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()).catch(function () {
      if (disabledRecordModal) {
        return false;
      }

      return Promise.reject();
    });
  }, [form, onOk]);
  var onClick = (0, _useEventCallback2.default)(function () {
    var onOkInternal = disabledRecordModal ? onFormOk : onOk;

    if (action.showConfirmModal()) {
      var confirmTitle = action.getConfirmTitle();
      var confirmContent = action.getConfirmContent();

      _modal.default.confirm(_objectSpread(_objectSpread({
        title: (0, _isFunction2.default)(confirmTitle) ? confirmTitle(params) : confirmTitle,
        content: (0, _isFunction2.default)(confirmContent) ? confirmContent(params) : confirmContent
      }, action.getConfirmProps()), {}, {
        onOk: onOkInternal
      }));
    } else {
      onOkInternal();
    }
  }, [action, params, onOk, disabledRecordModal, onFormOk]);
  var onRecordModalClick = (0, _useEventCallback2.default)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (action.showConfirmModal()) {
      var confirmTitle = action.getConfirmTitle();
      var confirmContent = action.getConfirmContent();
      return new Promise(function (resolve) {
        _modal.default.confirm(_objectSpread(_objectSpread({
          title: (0, _isFunction2.default)(confirmTitle) ? confirmTitle(params) : confirmTitle,
          content: (0, _isFunction2.default)(confirmContent) ? confirmContent(params) : confirmContent
        }, action.getConfirmProps()), {}, {
          onCancel: function onCancel() {
            return resolve(false);
          },
          onOk: function onOk() {
            return resolve(onFormOk.apply(void 0, args));
          }
        }));
      });
    }

    return onFormOk.apply(void 0, args);
  }, [action, params, onFormOk]);

  if (invisible) {
    return null;
  }

  if ((0, _isFunction2.default)(action.getRender())) {
    return action.getRender()(_objectSpread(_objectSpread({}, params), {}, {
      reload: reload
    }));
  }

  if (action.getLink() && !disabled) {
    return _react.default.createElement(_RecordLink.default, {
      link: action.getLink(),
      record: record || records,
      buttonProps: buttonProps
    });
  }

  if ((action.getColumns() || action instanceof _CreateAction.default || action instanceof _EditAction.default) && !disabledRecordModal) {
    var props = action.getColumns() ? {
      columns: action.getColumns()
    } : {
      columns: table === null || table === void 0 ? void 0 : table.getColumns(),
      actions: table === null || table === void 0 ? void 0 : table.getFormActions()
    };

    var RecordModal = require('./RecordModal').default;

    return _react.default.createElement(RecordModal, (0, _extends2.default)({}, action.getModalProps(), props, {
      checkEditable: action instanceof _EditAction.default,
      checkCreatable: action instanceof _CreateAction.default,
      key: action.getTitle(),
      title: action.getTitle(),
      record: record,
      records: records,
      onOk: onRecordModalClick
    }), _react.default.createElement(_button.default, buttonProps));
  }

  if (!disabled && action.getConfirmType() === 'pop') {
    var confirmTitle = action.getConfirmTitle();
    return _react.default.createElement(_popconfirm.default, (0, _extends2.default)({}, action.getConfirmProps(), {
      key: action.getTitle(),
      title: (0, _isFunction2.default)(confirmTitle) ? confirmTitle(params) : confirmTitle,
      onConfirm: onOk
    }), _react.default.createElement(_button.default, buttonProps));
  }

  return _react.default.createElement(_button.default, (0, _extends2.default)({}, buttonProps, {
    onClick: onClick
  }));
}

Action.propTypes = {
  action: _propTypes.default.instanceOf(_Action.default).isRequired,
  record: _propTypes.default.object,
  records: _propTypes.default.array,
  onComplete: _propTypes.default.func,
  reload: _propTypes.default.func,
  disabledRecordModal: _propTypes.default.bool
};
Action.defaultProps = {
  reload: null,
  record: null,
  records: null,
  onComplete: null,
  disabledRecordModal: false
};

var _default = _react.default.memo(Action);

exports.default = _default;