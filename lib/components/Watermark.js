"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Watermark;

var _react = _interopRequireDefault(require("react"));

var _useUser = _interopRequireDefault(require("../hooks/useUser"));

function Watermark() {
  var user = (0, _useUser.default)();
  var watermark = '蜻蜓FM';

  if (user) {
    watermark = "".concat(watermark, " ").concat(user.get('nickname') || '');
    var phone = user.get('phone');

    if (phone && phone.length >= 4) {
      watermark = "".concat(watermark).concat(phone.substr(phone.length - 4, 4));
    }
  }

  var backgroundImage = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' height='300px' width='600px'><text x='50%' y='50%' fill='rgba(0, 0, 0, 0.1)' font-size='16'>".concat(watermark, "</text></svg>\")");
  return _react.default.createElement("div", {
    className: "watermark-wrapper"
  }, _react.default.createElement("div", {
    className: "watermark",
    style: {
      backgroundImage: backgroundImage
    }
  }));
}