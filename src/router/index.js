import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue'),
    redirect: '/home/personal',
    children: [
      { path: 'personal', name: 'personal', component: () => import('../views/home/componse/personal.vue') },
      { path: 'homeTable', name: 'homeTable', component: () => import('../views/home/componse/homeTable.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
