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
  mounted() {
    this.$store.commit('updateCred')
    this.$store.dispatch('bindUsers')
    this.$store.dispatch('bindCropCycle')
    console.log(this.$store.state.cropCycle)

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
