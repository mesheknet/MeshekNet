import firebase from 'firebase'
import 'firebase/firestore'
var config = {
  apiKey: 'AIzaSyAqy1fgjfl5WMVl_l7eAWmTg8enASNBdlo',
  authDomain: 'mesheknetapp.firebaseapp.com',
  databaseURL: 'https://mesheknetapp.firebaseio.com',
  projectId: 'mesheknetapp',
  storageBucket: 'mesheknetapp.appspot.com',
  messagingSenderId: '250422026154',
  appId: '1:250422026154:web:d7acdb4b15251b2a2ad5d3',
}
// Initialize Firebase
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true,
}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export { db, auth, currentUser, usersCollection, postsCollection, commentsCollection, likesCollection }
