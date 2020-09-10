import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Notifications from '@/components/home/Notifications'
import Landing from '@/components/layout/Landing'
import Weather from '@/components/home/Weather'
import MyCrops from '@/components/home/MyCrops'
import MyCoop from '@/components/home/MyCoop'
import Contact from '@/components/home/Contact'
import Admin from '@/components/admin/Admin'
import TransitionPage from '@/components/home/TransitionPage'

Vue.use(Router)

const routes = [
  {
    path: '/Notifications',
    name: 'Notifications',
    component: Notifications,
    meta: {
      title: 'משק.נט - התראות',
      reqAuth: true
    }
  },
  {
    path: '/TransitionPage',
    name: 'TransitionPage',
    component: TransitionPage,
    meta: {
      title: 'ברוך הבא למשק.נט',
      reqAuth: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      title: 'משק.נט - הרשמה למערכת',
      reqAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'משק.נט - כניסה למערכת',
      reqAuth: false
    }
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    meta: {
      title: 'ברוך הבא למשק.נט',
      reqAuth: false
    }
  },
  {
    path: '/weather',
    name: 'Weather',
    component: Weather,
    meta: {
      title: 'משק.נט - מזג אויר ',
      reqAuth: false
    }
  },

  {
    path: '/MyCrops',
    name: 'MyCrops',
    component: MyCrops,
    meta: {
      title: 'משק.נט - הגידולים שלי',
      reqAuth: true
    }
  },

  {
    path: '/myCoop',
    name: 'MyCoop',
    component: MyCoop,
    meta: {
      title: 'משק.נט - הלול שלי',
      reqAuth: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      title: 'משק.נט - צור קשר',
      reqAuth: true
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      title: 'משק.נט - מנהל מערכת',
      reqAuth: true
    }
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//routes guard - only auth users can go to specific components. checked by farm id in store
router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.reqAuth)) {
    if (router.app.$store.state.LOADED) {
      next()
    } else {
      next({ name: 'Landing' })
    }
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
