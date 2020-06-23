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
    farms: [],
    farmOwners: [],
    fields: [],
    crops: [],
    allCycles: [],
    cropCycle: [],
    selectedCrop: {},
    currentCycle: {},
    startDate: null
  },
  mutations: {
    ...vuexfireMutations,

    updateUid: (state, uid) => {
      state.userId = uid
    },

    updateFid(state) {
      state.farmId = state.farms.find(obj => obj.userId == state.userId).id
    },

    updateSelectedCrop(state, crop) {
      state.selectedCrop = crop
    },

    addCropCycle(state, field) {
      fb.cropCycle.doc().set({
        cropId: state.selectedCrop.id,
        cropName: state.selectedCrop.name,
        duration: state.selectedCrop.duration,
        farmId: state.farmId,
        fieldId: field.id,
        fieldName: field.name,
        fieldArea: field.area,
        startDate: moment(state.startDate).format('L')
      })
    },

    addNewField(state, field) {
      fb.field.doc(field.id).set(field)
    },
    setStartDate(state, startDate) {
      state.startDate = startDate
    },
    setCurrentCycle(state, cycle) {
      state.currentCycle = cycle
    }
  },
  actions: {
    //data binding using vuexfire

    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('users', fb.user)
    }),
    bindFarmOwners: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('farmOwners', fb.farmOwner)
    }),
    bindFarms: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('farms', fb.farm)
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
    }),

    //actions that change state data

    updateUid: async context => {
      let uid = null
      await fb.auth.onAuthStateChanged(user => {
        if (user) {
          uid = user.uid
        }
      })
      context.commit('updateUid', uid)
    }
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
    farms: state => {
      return state.farms
    },
    farmOwners: state => {
      return state.farmOwners
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
    currentCycle: state => {
      return state.currentCycle
    }
  }
})
