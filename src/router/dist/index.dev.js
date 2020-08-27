"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [// {
//   path: '/',
//   name: 'Home',
//   component: Home
// },
{
  name: 'test',
  path: '/test',
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('../views/menus.vue'));
    });
  },
  children: [{
    name: '设备管理',
    path: '/test/page',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/test.vue'));
      });
    }
  }, {
    name: '区域设置',
    path: '/test/setting',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/setting.vue'));
      });
    }
  }, {
    name: '设备点位',
    path: '/test/positioning',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/positioning.vue'));
      });
    }
  }, {
    name: '统计分析',
    path: '/test/statistics',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/statistics.vue'));
      });
    }
  }, {
    name: '地图监控',
    path: '/test/maps',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('../views/maps.vue'));
      });
    }
  }]
}, {
  path: '*',
  redirect: '/test/maps'
}];
var router = new _vueRouter["default"]({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;