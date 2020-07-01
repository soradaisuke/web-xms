"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _immutable = _interopRequireDefault(require("immutable"));

var Action = function () {
  function Action() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Action);
    this.config = _immutable.default.fromJS(config);

    if (config.columns) {
      this.columns = _immutable.default.List(config.columns);
      this.findCascadeColumn();
    }
  }

  (0, _createClass2.default)(Action, [{
    key: "findCascadeColumn",
    value: function findCascadeColumn() {
      var _this = this;

      this.columns.forEach(function (column) {
        var parentKey = column.getParentKey();

        if (parentKey) {
          var parentColumn = _this.columns.find(function (c) {
            return c.getKey() === parentKey;
          });

          if (parentColumn) {
            column.parentColumn = parentColumn;
            parentColumn.childColumn = (parentColumn.childColumn || []).concat(column);
          }
        }
      });
    }
  }, {
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
    key: "getType",
    value: function getType() {
      return this.config.get('type', 'primary');
    }
  }, {
    key: "getShape",
    value: function getShape() {
      return this.config.get('shape');
    }
  }, {
    key: "getIcon",
    value: function getIcon() {
      return this.config.get('icon');
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
    key: "getButtonProps",
    value: function getButtonProps() {
      if (!this.buttonProps) {
        this.buttonProps = this.config.get('buttonProps', _immutable.default.Map()).toJS();
      }

      return this.buttonProps;
    }
  }, {
    key: "needReload",
    value: function needReload() {
      return this.config.get('reload');
    }
  }, {
    key: "isVisible",
    value: function isVisible(user) {
      var invisible = this.config.get('invisible');

      if ((0, _isFunction2.default)(invisible)) {
        if (!user) {
          return false;
        }

        return !invisible({
          user: user
        });
      }

      return !invisible;
    }
  }]);
  return Action;
}();

exports.default = Action;