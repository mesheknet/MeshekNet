import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import moment from 'moment'
const fb = require('@/fb.js')

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    users: [],
    userId: null,
    farmId: null,
    allCycles: [],
    cropCycle: [],
    fields: [],
    crops: [],
    selectedCrop: {},
    currentField: null
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

    updateSelectedCrop(state, crop) {
      state.selectedCrop = crop
    },

    addCropCycle(state) {
      fb.cropCycle.add({
        cropId: state.selectedCrop.id,
        cropName: state.selectedCrop.name,
        duration: state.selectedCrop.duration,
        farmId: state.farmId,
        fieldId: state.currentField.id,
        fieldName: state.currentField.name,
        fieldArea: state.currentField.area,
        startDate: moment(this.startDate).format('L')
      })
    },

    updateCurrentField(state, field) {
      state.currentField = field
    }
  },

  actions: {
    //data binding using vuexfire

    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('users', fb.user)
    }),
    bindAllCycles: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('allCycles', fb.cropCycle)
    }),
    bindCropCycle: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'cropCycle',
        fb.cropCycle.where('farmId', '==', state.farmId)
      )
    }),
    bindFields: firestoreAction(({ state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'fields',
        fb.field.where('farmId', '==', state.farmId)
      )
    }),
    bindCrops: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('crops', fb.crop)
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
    },
    selectedCrop: state => {
      return state.selectedCrop
    },
    currentField: state => {
      return state.currentField
    }
  }
})
