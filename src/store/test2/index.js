const state = {
  data: []
}
const getters = {
  data: (s) => s.data,
  count: (s) => s.data.length
}
const mutations = {
  pull: (s, data) => s.data = data,
  add: (s, item) => s.data.push(item),
}

export default {
  namespaced: true,
  mutations: mutations,
  getters: getters,
  state: state
}