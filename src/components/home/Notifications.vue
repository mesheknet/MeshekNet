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
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.lastSignIn = moment(user.metadata.lastSignIn).calendar()
      }
    })
  },
  mounted() {
    this.setDetails()
  },
  methods: {
    setDetails() {
      this.farmName = this.farms.find(obj => obj.userId == this.userId).name
      this.ownerName = this.farmOwners.find(
        obj => obj.userId == this.userId
      ).name
    }
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'users',
      'farmOwners',
      'farms',
      'fields',
      'crops',
      'cropCycle'
    ])
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
