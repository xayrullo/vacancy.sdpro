import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/teams',
    name: 'teams',
    component: () => import('../views/teams.vue')
  },
  {
    path: '/teams/change',
    name: 'teams-change',
    component: () => import('../views/teams/change.vue')
  },
  {
    path: '/cities',
    name: 'cities',
    component: () => import('../views/cities.vue')
  },
  {
    path: '/cities/change',
    name: 'cities-change',
    component: () => import('../views/cities/change.vue')
  },
  {
    path: '/countries',
    name: 'countries',
    component: () => import('../views/countries.vue')
  },
  {
    path: '/countries/change',
    name: 'countries-change',
    component: () => import('../views/countries/change.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
