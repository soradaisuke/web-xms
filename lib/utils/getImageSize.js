"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getImageSize;

function getImageSize(_ref) {
  var file = _ref.file,
      url = _ref.url;
  return new Promise(function (resolve) {
    if (file) {
      var fr = new FileReader();

      fr.onload = function () {
        var img = new Image();

        img.onload = function () {
          resolve({
            width: img.width,
            height: img.height
          });
        };

        img.src = fr.result;
      };

      fr.readAsDataURL(file);
    } else {
      var img = new Image();

      img.onload = function () {
        resolve({
          width: img.width,
          height: img.height
        });
      };

      img.src = url;
    }
  });
}