

<template>
 <div>
  <div class="container">
    <h1>משק.נט</h1>
    <h4>ברוך הבא, {{ this.ownerName }}</h4>
    <h4>{{ this.farmName }}</h4>
    <h4>כניסה אחרונה למערכת: {{ this.lastSignIn }}</h4>
    <p></p>
  </div>
  
 <v-container class="mx-auto">
    <v-expansion-panels class="mb-6 ">
      <v-expansion-panel
         v-for="(Messages,index) in UidMessages"
      :key="index"
      >
        <v-expansion-panel-header expand-icon="fa fa-exclamation"> <v-col>{{Messages.title}} </v-col>
                <v-col> {{Messages.subject}}</v-col>
                <v-col>{{Messages.startDate}} </v-col></v-expansion-panel-header>
        <v-expansion-panel-content>{{Messages.mes}}</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          התראות שבוצעו
          <template v-slot:actions>
            <v-icon color="green">fa fa-check</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
 </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'Notifications',
  data() {
    return {
      
      lastSignIn: null,
      currentUser: null,
      farmName: null,
      ownerName: null,
      loading: true,
    }
  },
  created() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        this.lastSignIn = moment(user.metadata.lastSignInTime).calendar()
        this.setDetails()
      }
    })
  },
  mounted() {},
  updated() {},
  methods: {
    
    setDetails() {
      this.farmName = this.farms.find((obj) => obj.userId == this.userId).name
      this.ownerName = this.farmOwners.find(
        (obj) => obj.userId == this.userId
      ).name
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
      'Messages'
    ]),

    UidMessages: function() {
       return this.Messages.filter(m => {
         return m.to == this.userId
     })
   },
  },
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
