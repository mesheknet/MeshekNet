import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'materialize-css/dist/css/materialize.css'
import 'materialize-css/dist/js/materialize.min'

Vue.use(VueResource)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

//Vue.http.options.root = '/root'
//Vue.http.headers['Authorization'] =
// 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
Vue.config.productionTip = false
