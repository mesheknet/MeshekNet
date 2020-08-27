<template>
  <div class="main">
    <v-container class="mx-auto">
      <v-layout justify-center>
        <v-card mx-auto max-width="700">
          <v-card-title>היי {{ this.ownerName }},</v-card-title>
          <v-card-text
            >ברוך הבא למשק.נט. בחר באפשרות המתאימה בסרגל, ונתחיל
            לעבוד!</v-card-text
          >
          <v-row>
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/mesheknetapp.appspot.com/o/app%20base%20files%2FmeshekNet_logo.png?alt=media&token=77731a26-1333-40ad-ad50-77a6b53c9080"
              aspect-ratio="1.7"
              contain
            ></v-img
          ></v-row>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
//import moment from 'moment'
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'TransitionPage',
  data() {
    return {
      currentUser: null,
      farmName: null,
      ownerName: null,
      loading: true,
    }
  },
  created() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setDetails()
      }
    })
  },
  mounted() {},
  updated() {},
  methods: {
    setDetails() {
      this.farmName = this.farms.find((obj) => obj.userId == this.userId).name
      let fullName = this.farmOwners.find((obj) => obj.userId == this.userId)
        .name
      let tempStr = fullName.split(' ')
      this.ownerName = tempStr[0]
    },
    updateUserNotifications() {
      if (this.openWeather.current.temp > 20) console.log('high temp')
      // let notification = {
      //     id: fb.notification.doc().id,
      //     title: ,
      //     subject: ,
      //     mes: ,
      //     to: //To which user (userid)

      //   }
      //   this.$store.commit('NewNotifications', notification)
    },
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
      'cropCycle',
      'currentMessages',
      'Messages',
      'openWeather',
    ]),
  },
}
</script>

<style scoped>
.main {
  height: 90vh;
}
</style>
