import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    name: 'test',
    path: '/test',
    component: () => import('../views/menus.vue'),
    children: [{
      name: '设备管理',
      path: '/test/page',
      component: () => import('../views/test.vue'),
    }, {
      name: '区域设置',
      path: '/test/setting',
      component: () => import('../views/setting.vue')
    }, {
      name: '设备点位',
      path: '/test/positioning',
      component: () => import('../views/positioning.vue')
    }, {
      name: '统计分析',
      path: '/test/statistics',
      component: () => import('../views/statistics.vue')
    }, {
      name: '地图监控',
      path: '/test/maps',
      component: () => import('../views/maps.vue')
    }]
  }, {
    path: '*',
    redirect: '/test/maps'
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router