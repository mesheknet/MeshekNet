import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('@/fb.js')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userId: null,
    farmId: null,
    userData: []
  },
  mutations: {
    updateCred(state) {
      fb.auth.onAuthStateChanged(user => {
        if (user) {
          state.userId = user.uid
          fb.farm
            .where('userId', '==', user.uid)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                state.farmId = doc.id
              })
            })
        }
      })
    },

    addData: (state, data) => {
      state.userData = data
    }
  }
})
