"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrappedUploadFile = wrappedUploadFile;
exports.wrappedUploadImage = wrappedUploadImage;

var _uploadImage2 = _interopRequireDefault(require("@qt/web-core/lib/uploadImage"));

var _uploadFile2 = _interopRequireDefault(require("@qt/web-core/lib/uploadFile"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _join2 = _interopRequireDefault(require("lodash/join"));

var _drop2 = _interopRequireDefault(require("lodash/drop"));

var _includes2 = _interopRequireDefault(require("lodash/includes"));

var _split2 = _interopRequireDefault(require("lodash/split"));

var _shortid = _interopRequireDefault(require("shortid"));

var _env = require("@qt/env");

var _aliOss = _interopRequireDefault(require("ali-oss"));

var _request = _interopRequireDefault(require("../services/request"));

var uploadHost = "//cloud-upload.".concat(_env.isProduction ? '' : 'staging.', "qingtingfm.com");

function generateFileName(file) {
  var names = (0, _split2.default)(file.name, '.');
  var postfix;

  if (names.length === 1) {
    var _file$type$split = file.type.split('/');

    var _file$type$split2 = (0, _slicedToArray2.default)(_file$type$split, 2);

    postfix = _file$type$split2[1];
  } else {
    postfix = (0, _join2.default)((0, _drop2.default)(names), '.');
  }

  return "".concat(Date.now(), "_").concat(_shortid.default.generate(), ".").concat(postfix);
}

function uploadToAliyun(file, _ref) {
  var fileName = _ref.fileName,
      ssoToken = _ref.ssoToken;
  var finalFileName = fileName || generateFileName(file);
  return _request.default.post("".concat(uploadHost, "/intra/v1/sts_token"), {
    params: {
      app_id: _env.isProduction ? 'tuboshu' : 'tuboshudev',
      sso_token: ssoToken
    },
    body: {
      dir: (0, _split2.default)(window.location.host, '.')[0]
    }
  }).then(function () {
    var _ref3 = (0, _asyncToGenerator2.default)(_regenerator.default.mark(function _callee(_ref2) {
      var region, accessKeyId, accessKeySecret, bucket, stsToken, resource, domain, client;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              region = _ref2.bucket_region, accessKeyId = _ref2.access_key_id, accessKeySecret = _ref2.access_key_secret, bucket = _ref2.bucket, stsToken = _ref2.security_token, resource = _ref2.resource, domain = _ref2.cdn_domain;
              client = new _aliOss.default({
                endpoint: "https://oss-".concat(region, ".aliyuncs.com"),
                accessKeyId: accessKeyId,
                accessKeySecret: accessKeySecret,
                bucket: bucket,
                stsToken: stsToken
              });
              _context.next = 4;
              return client.put("/".concat(resource, "/").concat(finalFileName), file);

            case 4:
              return _context.abrupt("return", "https://".concat(domain, "/").concat(resource, "/").concat(finalFileName));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());
}

function wrappedUploadFile(file, _ref4) {
  var fileName = _ref4.fileName,
      ssoToken = _ref4.ssoToken;

  if ((0, _includes2.default)(window.location.host, 'tuboshu')) {
    return uploadToAliyun(file, {
      fileName: fileName,
      ssoToken: ssoToken
    });
  }

  return (0, _uploadFile2.default)(file, {
    fileName: fileName,
    ssoToken: ssoToken
  });
}

function wrappedUploadImage(file, _ref5) {
  var ssoToken = _ref5.ssoToken,
      bucket = _ref5.bucket,
      upYunSyncPreprocessor = _ref5.upYunSyncPreprocessor,
      deviceId = _ref5.deviceId;

  if ((0, _includes2.default)(window.location.host, 'tuboshu')) {
    return uploadToAliyun(file, {
      ssoToken: ssoToken
    });
  }

  return (0, _uploadImage2.default)(file, {
    ssoToken: ssoToken,
    bucket: bucket,
    upYunSyncPreprocessor: upYunSyncPreprocessor,
    deviceId: deviceId
  });
}