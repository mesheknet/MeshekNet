import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('@/fb.js')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userId: null,
    farmId: null,
    cropCycle: [],
    fields: [],
    crops: []
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

    loadFields: state => {
      state.fields = []
      fb.field
        .where('farmId', '==', state.farmId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            state.fields.push({
              fieldId: doc.id,
              name: doc.data().name,
              area: doc.data().area
            })
          })
        })
    },

    loadCrops: state => {
      state.crops = []
      fb.crop.get().then(snapshot => {
        snapshot.forEach(doc => {
          state.crops.push({
            cropId: doc.id,
            name: doc.data().name,
            duration: doc.data().duration
          })
        })
      })
    },

    loadCropCycle: state => {
      state.cropCycle = []
      fb.cropCycle
        .where('farmId', '==', state.farmId)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            state.cropCycle.push({
              cropCycleId: doc.id,
              fieldId: doc.data().fieldId,
              cropId: doc.data().cropId,
              cropName: '',
              cropDuration: '',
              fieldName: '',
              fieldArea: '',
              startDate: doc.data().startDate
            })
          })
        })
    }
  }
})
