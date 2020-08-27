"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var state = {
  data: []
};
var getters = {
  data: function data(s) {
    return s.data;
  },
  count: function count(s) {
    return s.data.length;
  }
};
var mutations = {
  pull: function pull(s, data) {
    return s.data = data;
  },
  add: function add(s, item) {
    return s.data.push(item);
  }
};
var _default = {
  namespaced: true,
  mutations: mutations,
  getters: getters,
  state: state
};
exports["default"] = _default;