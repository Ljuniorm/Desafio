import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/forecast/:city',
    name: 'Forecast',
    component: () => import('../views/Forecast.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
