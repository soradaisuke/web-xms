"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _default(promise) {
  var hasCanceled = false;
  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled ? reject(new Error('promise is been canceled')) : resolve(val);
    }, function (error) {
      return hasCanceled ? reject(new Error('promise is been canceled')) : reject(error);
    });
  });

  wrappedPromise.cancel = function () {
    hasCanceled = true;
  };

  return wrappedPromise;
}