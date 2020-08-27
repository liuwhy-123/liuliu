"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _test = _interopRequireDefault(require("./test"));

var _test2 = _interopRequireDefault(require("./test1"));

var _test3 = _interopRequireDefault(require("./test2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var _default = new _vuex["default"].Store({
  modules: {
    test: _test["default"],
    test1: _test2["default"],
    test2: _test3["default"]
  }
});

exports["default"] = _default;