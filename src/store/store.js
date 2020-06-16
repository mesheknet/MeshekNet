import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const fb = require('@/fb.js')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: [],
    userId: null,
    farmId: null,
    cropCycle: [],
    fields: [],
    crops: []
  },
  mutations: {
    ...vuexfireMutations,
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
      fb.field.where('farmId', '==', state.farmId).onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            state.fields.push({
              fieldId: change.doc.id,
              name: change.doc.data().name,
              area: change.doc.data().area
            })
          }
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
  },

  actions: {
    //data binding using vuexfire

    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('users', fb.user)
    }),
    bindCropCycle: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'cropCycle',
        fb.cropCycle.where('farmId', '==', state.farmId)
      )
    })
  },

  getters: {
    userId: state => {
      return state.userId
    },
    farmId: state => {
      return state.farmId
    },
    users: state => {
      return state.users
    },
    cropCycle: state => {
      return state.cropCycle
    },
    fields: state => {
      return state.fields
    },
    crops: state => {
      return state.crops
    }
  }
})
