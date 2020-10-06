"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _immutable = _interopRequireDefault(require("immutable"));

var _migrate = require("../utils/migrate");

var _findCascadeColumn = _interopRequireDefault(require("../utils/findCascadeColumn"));

var Action = function () {
  function Action() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Action);
    this.config = _immutable.default.fromJS((0, _migrate.migrateAction)(config));

    if (config.columns) {
      this.columns = _immutable.default.List(config.columns);
      (0, _findCascadeColumn.default)(this.columns);
    }
  }

  (0, _createClass2.default)(Action, [{
    key: "isRowAction",
    value: function isRowAction() {
      return !this.config.get('global');
    }
  }, {
    key: "isMultipleAction",
    value: function isMultipleAction() {
      return this.config.get('multiple');
    }
  }, {
    key: "isGlobalAction",
    value: function isGlobalAction() {
      return this.config.get('global');
    }
  }, {
    key: "getTitle",
    value: function getTitle() {
      return this.config.get('title');
    }
  }, {
    key: "getConfirmType",
    value: function getConfirmType() {
      return this.config.getIn(['confirm', 'type']);
    }
  }, {
    key: "getConfirmTitle",
    value: function getConfirmTitle() {
      return this.config.getIn(['confirm', 'title']);
    }
  }, {
    key: "getConfirmContent",
    value: function getConfirmContent() {
      return this.config.getIn(['confirm', 'content']);
    }
  }, {
    key: "getConfirmProps",
    value: function getConfirmProps() {
      if (!this.confirmProps) {
        this.confirmProps = this.config.getIn(['confirm', 'confirmProps'], _immutable.default.Map()).toJS();
      }

      return this.confirmProps;
    }
  }, {
    key: "showConfirmModal",
    value: function showConfirmModal() {
      return !!this.config.get('confirm');
    }
  }, {
    key: "getLink",
    value: function getLink() {
      return this.config.get('link');
    }
  }, {
    key: "getHandler",
    value: function getHandler(defaultHandler) {
      return this.config.get('handler', defaultHandler);
    }
  }, {
    key: "getHandlingMessage",
    value: function getHandlingMessage() {
      return this.config.get('handlingMessage');
    }
  }, {
    key: "getSuccessMessage",
    value: function getSuccessMessage() {
      return this.config.get('successMessage');
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      return this.columns;
    }
  }, {
    key: "getOnComplete",
    value: function getOnComplete() {
      return this.config.get('onComplete');
    }
  }, {
    key: "getEnable",
    value: function getEnable() {
      return this.config.get('enable');
    }
  }, {
    key: "getInvisible",
    value: function getInvisible() {
      return this.config.get('invisible');
    }
  }, {
    key: "getRender",
    value: function getRender() {
      return this.config.get('render');
    }
  }, {
    key: "getModalProps",
    value: function getModalProps() {
      if (!this.modalProps) {
        this.modalProps = this.config.get('modalProps', _immutable.default.Map()).toJS();
      }

      return this.modalProps;
    }
  }, {
    key: "needReload",
    value: function needReload() {
      return this.config.get('reload');
    }
  }, {
    key: "isFormAction",
    value: function isFormAction() {
      return this.config.get('form');
    }
  }, {
    key: "getButtonProps",
    value: function getButtonProps() {
      if (!this.buttonProps) {
        this.buttonProps = this.config.get('buttonProps', _immutable.default.Map()).toJS();
      }

      return this.buttonProps;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.config.getIn(['buttonProps', 'type'], this.config.get('type', 'primary'));
    }
  }, {
    key: "getShape",
    value: function getShape() {
      return this.config.getIn(['buttonProps', 'shape'], this.config.get('shape'));
    }
  }, {
    key: "getPermissions",
    value: function getPermissions() {
      if ((0, _isUndefined2.default)(this.permissions)) {
        this.permissions = this.config.get('permissions', null);

        if (_immutable.default.isList(this.permissions)) {
          this.permissions = this.permissions.toJS();
        }
      }

      return this.permissions;
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      var _this$config$get$toJS, _this$config$get, _this$config$get$toJS2;

      return this.config.getIn(['buttonProps', 'icon'], (_this$config$get$toJS = (_this$config$get = this.config.get('icon')) === null || _this$config$get === void 0 ? void 0 : (_this$config$get$toJS2 = _this$config$get.toJS) === null || _this$config$get$toJS2 === void 0 ? void 0 : _this$config$get$toJS2.call(_this$config$get)) !== null && _this$config$get$toJS !== void 0 ? _this$config$get$toJS : this.config.get('icon'));
    }
  }, {
    key: "getNormalize",
    value: function getNormalize() {
      return this.config.get('normalize');
    }
  }, {
    key: "isVisible",
    value: function isVisible(params) {
      var invisible = this.getInvisible();

      if ((0, _isFunction2.default)(invisible)) {
        try {
          return !invisible(params);
        } catch (e) {
          console.error(e);
          return false;
        }
      }

      return true;
    }
  }, {
    key: "isEnable",
    value: function isEnable(params) {
      var enable = this.getEnable();

      if ((0, _isFunction2.default)(enable)) {
        try {
          return enable(params);
        } catch (e) {
          console.error(e);
          return false;
        }
      }

      return true;
    }
  }]);
  return Action;
}();

exports.default = Action;