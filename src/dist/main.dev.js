"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _elementUi = _interopRequireDefault(require("element-ui"));

require("./assets/font/font.css");

var _echars = _interopRequireDefault(require("./core/echars"));

var _vueBaiduMap = _interopRequireDefault(require("vue-baidu-map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//访问应用(AK)
_vue["default"].use(_vueBaiduMap["default"], {
  ak: 'QvO3odQxOaz5R2X4IdxBlt8xjjqu2xci'
});

_vue["default"].prototype.$echarts = _echars["default"];

_vue["default"].use(_elementUi["default"]);

_vue["default"].config.productionTip = false;
new _vue["default"]({
  store: _store["default"],
  router: _router["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');