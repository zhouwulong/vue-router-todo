const state = {
  user: [],
  userName: '',
  token: '',
  allData: {}
}
const getters = {
  user: state => state.user,
  token: state => state.token,
  allData: state => state.allData
}
const mutations = {
  getUserData (state) {
    state.user = JSON.parse(localStorage.getItem('user'))
  },
  getToken (state) {
    state.token = localStorage.getItem('token') || ''
  },
  addTableData (state, data) {
    state.allData.data[data.index].list.push(data.data)
  },
  addAlldata (state, allData) {
    state.allData = allData
  },
  saveData (state, data) {
    let hasToken = localStorage.getItem('token')
    for (let i = 0; i < state.user.length; i++) {
      if (hasToken === JSON.stringify(state.user[i].token)) {
        state.user[i] = state.allData
      }
    }
    localStorage.setItem('user', JSON.stringify(state.user))
  },
  clickChange (state, data) {
    state.allData.data[data.index].list[data.indexChange].check = data.check
  },
  delTableData (state, data) {
    state.allData.data[data.index].list.splice(data.delindex, 1)
  },
  modifyTableData (state, data) {
    state.allData.data[data.index].list[data.indexModify].mome = data.mome
  }
  // setALLData (state) {

  // }
}
const actions = {
  getUserData ({ commit }) {
    commit('getUserData')
  },
  getToken ({ commit }) {
    commit('getToken')
  },
  // 添加事件
  addTableData ({ commit }, addTableIndex) {
    commit('addTableData', addTableIndex)
    commit('saveData')
    // commit('setALLData')
  },
  delTableData ({ commit }, data) {
    commit('delTableData', data)
    commit('saveData')
    // commit('setALLData')
  },
  clickChange ({ commit }, data) {
    commit('clickChange', data)
    commit('saveData')
  },
  modifyTableData ({ commit }, data) {
    commit('modifyTableData', data)
    commit('saveData')
  },
  addAlldata ({ commit }, allData) {
    commit('addAlldata', allData)
  }
}

export default { state, getters, mutations, actions }
