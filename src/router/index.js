import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Notifications from '@/components/home/Notifications'
import Landing from '@/components/home/Landing'
import Weather from '@/components/home/Weather'

Vue.use(Router)

const routes = [
  {
    path: '/Notifications',
    name: 'Notifications',
    component: Notifications
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
