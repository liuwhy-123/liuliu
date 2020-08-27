import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import test from './test';
import test1 from './test1'
import test2 from './test2';

export default new Vuex.Store({
  modules: { test, test1,test2 }
})
