<template>
  <div class="container">
    <h1>משק.נט</h1>
    <h4>ברוכים הבאים, {{ this.ownerName }}</h4>
    <h4>{{ this.farmName }}</h4>
    <h4>כניסה אחרונה למערכת: {{ this.lastSignIn }}</h4>
    <p></p>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
moment.locale('he')
const fb = require('@/fb.js')

export default {
  name: 'Notifications',
  data() {
    return {
      lastSignIn: null,
      currentUser: null,
      farmName: null,
      ownerName: null
    }
  },
  created() {
    //update local store data from firestore
    this.$store.commit('updateCred')
    console.log(this.farmId)
    this.$store.dispatch('bindUsers')
    this.$store.dispatch('bindFields')
    console.log(this.fields)
    this.$store.dispatch('bindCropCycle')
    this.$store.dispatch('bindCrops')
    this.$store.dispatch('bindAllCycles')
    console.log(this.cropCycle)
  },
  mounted() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.lastSignIn = moment(user.metadata.lastSignIn).calendar()
        let farmRef = fb.farm.where('userId', '==', user.uid)
        farmRef.get().then(snapshot => {
          snapshot.forEach(doc => {
            this.farmName = doc.data().name
          })
        })
        let ownerRef = fb.farmOwner.where('userId', '==', user.uid)
        ownerRef.get().then(snapshot => {
          snapshot.forEach(doc => {
            this.ownerName = doc.data().name
          })
        })
      }
    })
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId', 'farmId', 'fields', 'crops', 'cropCycle'])
  }
}
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}

.login .h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}
</style>
