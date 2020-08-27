import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/font/font.css'
import echarts from './core/echars'
import BaiduMap from 'vue-baidu-map'

//访问应用(AK)
Vue.use(BaiduMap, {
  ak: 'QvO3odQxOaz5R2X4IdxBlt8xjjqu2xci'
})

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);

Vue.config.productionTip = false;



new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')
