import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import moment from 'moment'
import VueInstance from '@/main'
const fb = require('@/fb.js')
//plugin that saves state on page refresh
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [
    //plugin that saves state on page refresh
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    LOADED: false,
    stations: [],
    users: [],
    userId: null,
    farmId: null,
    farms: [],
    farmOwners: [],
    fields: [],
    crops: [],
    allCycles: [],
    cropCycle: [],
    weather: null,
    openWeather: null,
    selectedCrop: {},
    currentCycle: {},
    startDate: null,

    //for coop
    coop: [],
    coopId: null,
    Chickens: [],
    allchickCycle:  [],
    chickCycle: [],
    selectedchickCycle: {},
    currentchickCycle: {}
    



  },
  mutations: {
    ...vuexfireMutations,

    updateUid: (state, uid) => {
      state.userId = uid
    },

    updateFid: (state, fid) => {
      state.farmId = fid
      state.LOADED = true
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
    },
    getWeather(state, response) {
      state.openWeather = response
    },

    //for coop

    setchickCycle(state, cycle) {
      state.chickCycle = cycle
    },
    updatecoopid: (state, Cid) => {
      state.coopId = Cid
    },

    updateselectedchickCycle(state, Chickens) {
      state.selectedchickCycle = Chickens
    },

    addchickCycle(state, chick) {
      fb.chickCycle.doc().set({
        chickId: state.selectedchickCycle.id,
        namechickCycle: state.selectedchickCycle.name,
        farmId: state.farmId,
        coopId: state.coopId,
        quantity: chick.quantity,
        startDate: moment(state.startDate).format('L')
      })
    },

  /*  addCoop(state, NewCoop) {
      fb.coop.doc().set({
        farmId: state.farmId,
        maxCapacity:NewCoop.maxCapacity

      })
    },*/
    
  },
  actions: {
    //data binding using vuexfire
    bindStations: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('stations', fb.station)
    }),
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
    bindWeather: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('weather', fb.weather)
    }),
    //actions that change state data

    async updateUid({ commit }) {
      let uid = null
      await fb.auth.onAuthStateChanged(user => {
        if (user) {
          uid = user.uid
        }
      })
      commit('updateUid', uid)
    },

    updateFid({ commit, state }) {
      let fid = state.farms.find(obj => obj.userId == state.userId).id
      commit('updateFid', fid)
    },

    //`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cf89017588e993af02c5a5e11390cef3&units=metric&lang=he`

    getWeather(commit, position) {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      VueInstance.$http
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=cf89017588e993af02c5a5e11390cef3&units=metric&lang=he`
        )
        .then(
          response => {
            this.commit('getWeather', response.body)
          },
          error => {
            console.log(error)
          }
        )
    },
    //for coop
    
    bindallchickCycle: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('allchickCycle', fb.chickCycle)
    }),
    bindchickCycle: firestoreAction(({state, bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'chickCycle',
        fb.chickCycle.where('farmId', '==', state.farmId)
      )
    }),
    bindcoop: firestoreAction(({ state,bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef(
        'coop',
        fb.coop.where('farmId', '==', state.farmId)
      )
    }),
    bindChickens: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef('Chickens', fb.Chickens)
    }),
   
    updatecoopid({ commit, state }) {
      let Cid = state.coop.find(obj => obj.farmId == state.farmId).id
      commit('updatecoopid', Cid)
    },

  },

  getters: {
    //tells if data finished loading from firestore.
    LOADED: state => {
      return state.LOADED
    },

    stations: state => {
      return state.stations
    },
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
    },
    weather: state => {
      return state.weather
    },
    openWeather: state => {
      return state.openWeather
    },

    //for coop

    coop: state => {
      return state.coop
    },
    Chickens: state => {
      return state.Chickens
    },
    chickCycle: state => {
      return state.chickCycle
    },
    selectedchickCycle:  state => {
      return state.selectedchickCycle
    },
    currentchickCycle:  state => {
      return state.currentchickCycle
    },
    coopId: state => {
      return state.coopId
    },

  }
})
