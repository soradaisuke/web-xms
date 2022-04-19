"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/lib/card/style");

var _card = _interopRequireDefault(require("antd/lib/card"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/row/style");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/button/style");

var _button = _interopRequireDefault(require("antd/lib/button"));

require("antd/lib/form/style");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _dva = require("dva");

var _immutable = _interopRequireDefault(require("immutable"));

var _Page = _interopRequireDefault(require("./Page"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

var _FormContext = _interopRequireDefault(require("../contexts/FormContext"));

var _usePageConfig2 = _interopRequireDefault(require("../hooks/usePageConfig"));

var _Action = _interopRequireDefault(require("../components/Action"));

var _CreateAction = _interopRequireDefault(require("../actions/CreateAction"));

var _EditAction = _interopRequireDefault(require("../actions/EditAction"));

var _DeleteAction = _interopRequireDefault(require("../actions/DeleteAction"));

var _FormItem = _interopRequireDefault(require("../components/Form/FormItem"));

var _usePageData = _interopRequireDefault(require("../hooks/usePageData"));

var _useFormInitialValues = _interopRequireDefault(require("../hooks/useFormInitialValues"));

require("./RecordsPage.less");

var useParams = _dva.router.useParams,
    useHistory = _dva.router.useHistory;
var formItemLayout = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 8
    },
    md: {
      span: 6
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 16
    },
    md: {
      span: 18
    }
  }
};
var tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    },
    md: {
      span: 18,
      offset: 6
    }
  }
};

function RecordFormPage() {
  var pageData = (0, _usePageData.default)();
  var record = pageData.record;

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      error = _useState2[0],
      setError = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var user = (0, _useUser.default)();
  var history = useHistory();

  var _usePageConfig = (0, _usePageConfig2.default)(),
      formProps = _usePageConfig.formProps,
      idIdentifier = _usePageConfig.idIdentifier,
      table = _usePageConfig.table,
      reset = _usePageConfig.reset,
      fetch = _usePageConfig.fetch;

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var params = useParams();
  var id = params[idIdentifier];
  var isEdit = id !== 'new';
  var columns = (0, _react.useMemo)(function () {
    if (isEdit) {
      return table.getColumns().filter(function (c) {
        return c.canShowInEditFrom({
          record: record,
          user: user
        });
      });
    }

    return table.getColumns().filter(function (c) {
      return c.canShowInCreateFrom({
        user: user
      });
    });
  }, [isEdit, record, table, user]);
  var fetchInternal = (0, _react.useCallback)(function () {
    if (fetch) {
      setIsLoading(true);
      setError(null);
      fetch({
        id: id
      }).then(function () {
        setIsLoading(false);
        setError(null);
        form.resetFields();
      }).catch(function (e) {
        setIsLoading(true);
        setError(e);
      });
    }
  }, [fetch, id, form]);
  var renderActions = (0, _react.useMemo)(function () {
    var _table$getEditAction, _table$getCreateActio;

    var result = _immutable.default.List([isEdit ? (_table$getEditAction = table.getEditAction()) === null || _table$getEditAction === void 0 ? void 0 : _table$getEditAction.setLink(null).setTitle('保存').setIcon(null).setShape(null) : (_table$getCreateActio = table.getCreateAction()) === null || _table$getCreateActio === void 0 ? void 0 : _table$getCreateActio.setLink(null).setTitle('保存')]);

    result = result.concat(table.getFormActions());
    return result;
  }, [table, isEdit]);
  var initialValues = (0, _useFormInitialValues.default)({
    record: record
  });
  (0, _react.useEffect)(function () {
    if (isEdit) {
      fetchInternal();
    }

    return function () {
      return reset();
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return _react.default.createElement(_FormContext.default.Provider, {
    value: form
  }, _react.default.createElement(_Page.default, {
    isLoading: isLoading,
    isError: !!error,
    errorMessage: error ? error.message : ''
  }, _react.default.createElement(_card.default, {
    title: isEdit ? '编辑' : '新建',
    className: "content-card"
  }, (!isEdit || record) && _react.default.createElement(_form.default, (0, _extends2.default)({}, formItemLayout, {
    scrollToFirstError: true
  }, formProps, {
    initialValues: initialValues,
    form: form
  }), columns.map(function (column) {
    return _react.default.createElement(_FormItem.default, {
      isEdit: isEdit,
      key: column.getTitle(),
      record: record,
      column: column
    });
  }), _react.default.createElement(_form.default.Item, tailFormItemLayout, _react.default.createElement(_row.default, {
    type: "flex",
    align: "middle",
    className: "actions"
  }, _react.default.createElement(_popconfirm.default, {
    key: "\u53D6\u6D88",
    title: "\u786E\u8BA4\u53D6\u6D88\u5E76\u8FD4\u56DE\u4E0A\u4E00\u9875\uFF1F",
    onConfirm: history.goBack
  }, _react.default.createElement(_button.default, {
    style: {
      marginLeft: 0
    }
  }, "\u53D6\u6D88")), renderActions.map(function (a) {
    return _react.default.createElement(_Action.default, {
      key: a.getKey(),
      disabledRecordModal: a instanceof _CreateAction.default || a instanceof _EditAction.default,
      action: a,
      record: record,
      loading: isLoading,
      reload: a instanceof _EditAction.default ? fetchInternal : null,
      onComplete: a instanceof _CreateAction.default || a instanceof _DeleteAction.default ? history.goBack : null
    });
  })))))));
}

var _default = _react.default.memo(RecordFormPage);

exports.default = _default;