"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _default = {
  namespace: 'audio',
  state: '',
  reducers: {
    save: function save(_, _ref) {
      var id = _ref.payload.id;
      return id;
    }
  },
  effects: {
    changePlayedAudio: _regenerator.default.mark(function changePlayedAudio(_ref2, _ref3) {
      var _ref2$payload, _ref2$payload$id, id, put;

      return _regenerator.default.wrap(function changePlayedAudio$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _ref2$payload = _ref2.payload;
              _ref2$payload = _ref2$payload === void 0 ? {} : _ref2$payload;
              _ref2$payload$id = _ref2$payload.id, id = _ref2$payload$id === void 0 ? '' : _ref2$payload$id;
              put = _ref3.put;
              _context.next = 6;
              return put({
                type: 'save',
                payload: {
                  id: id
                }
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, changePlayedAudio);
    })
  }
};
exports.default = _default;