import router from './router'
import store from './store'
import { Message } from 'element-ui'
// import Element from 'element-ui'

const whiteList = ['/']
router.beforeEach((to, from, next) => {
  store.dispatch('getUserData')
  store.dispatch('getToken')
  const hasToken = store.getters.token
  const user = store.getters.user
  if (hasToken) {
    for (let i = 0; i < user.length; i++) {
      if (hasToken === JSON.stringify(user[i].token)) {
        const allData = user[i]
        store.dispatch('addAlldata', allData)
      }
    }
    next()
  } else if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    next()
    setTimeout(() => {
      Message({
        message: '请先登录',
        type: 'warning',
        center: true,
        offset: 300
      })
      next({ path: '/' })
    }, 3000)
  }
})
