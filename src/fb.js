import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
var config = {
  apiKey: 'AIzaSyAqy1fgjfl5WMVl_l7eAWmTg8enASNBdlo',
  authDomain: 'mesheknetapp.firebaseapp.com',
  databaseURL: 'https://mesheknetapp.firebaseio.com',
  projectId: 'mesheknetapp',
  storageBucket: 'mesheknetapp.appspot.com',
  messagingSenderId: '250422026154',
  appId: '1:250422026154:web:d7acdb4b15251b2a2ad5d3'
}
// Initialize Firebase
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const station = db.collection('stations')
const user = db.collection('user')
const weather = db.collection('weather')
const chickCycle = db.collection('chickCycle')
const coop = db.collection('coop')
const crop = db.collection('crop')
const cropCycle = db.collection('cropCycle')
const cycleData = db.collection('cycleData')
const disease = db.collection('disease')
const drug = db.collection('drug')
const farm = db.collection('farm')
const farmOwner = db.collection('farmOwner')
const fertilizer = db.collection('fertilizer')
const field = db.collection('field')
const fieldCycle = db.collection('fieldCycle')
const notification = db.collection('notification')
const pest = db.collection('pest')
const pesticide = db.collection('pesticide')
const service = db.collection('service')
const sysAdmin = db.collection('sysAdmin')
const treatType = db.collection('treatType')
const treatment = db.collection('treatment')

export {
  db,
  auth,
  currentUser,
  user,
  weather,
  chickCycle,
  coop,
  crop,
  cropCycle,
  cycleData,
  disease,
  drug,
  farm,
  farmOwner,
  fertilizer,
  field,
  fieldCycle,
  notification,
  pest,
  pesticide,
  service,
  sysAdmin,
  treatType,
  treatment,
  station
}
