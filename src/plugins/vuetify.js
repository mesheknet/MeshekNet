import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  rtl: true,
  iconfont: 'md',
  theme: {
    primary: '#33691E',
    success: '#1DE9B6',
    info: '#00B0FF',
    error: '#D32F2F'
  }
})
