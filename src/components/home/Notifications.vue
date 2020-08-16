<!-------  When you want to enter notifications you need to do:
var NewNotifications = {
          id: fb.notification.doc().id,
          title: 
          subject: 
          mes: 
          to: //To which user (userid)

        }
        this.$store.commit('NewNotifications', NewNotifications) 
 ------->

<template>
  <div class="container_fluid">
    <div>
      <v-container class="mx-auto">
        <v-expansion-panels class="mb-6 ">
          <!-------  for Messages  ------->
          <v-expansion-panel
            v-for="(Messages, index) in UidMessages"
            :key="index"
            @click="setcurrentMess(Messages)"
          >
            <v-expansion-panel-header expand-icon="fa fa-exclamation">
              <v-col>{{ Messages.title }} </v-col>
              <v-col> {{ Messages.subject }}</v-col>
              <v-col>{{ Messages.startDate }} </v-col></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row>
                <v-card color="#d6cfcf" width="552">
                  <v-card-subtitle text color="black">{{
                    Messages.PreviousPost
                  }}</v-card-subtitle>
                </v-card>
              </v-row>

              <v-row>
                {{ Messages.mes }}
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-btn text color="primary" @click="UpdateDone()">בוצע</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <!-------  for notifications  ------->
          <v-expansion-panel
            v-for="(notifications, index) in Uidnotifications"
            :key="index"
            @click="setcurrentNoti(notifications)"
          >
            <v-expansion-panel-header expand-icon="fa fa-exclamation">
              <v-col>{{ notifications.title }} </v-col>
              <v-col> {{ notifications.subject }}</v-col>
              <v-col>{{ notifications.startDate }} </v-col></v-expansion-panel-header
            >
            <v-expansion-panel-content>
              

              <v-row>
                {{ notifications.mes }}
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-btn text color="primary" @click="UpdateDonenotifications()">בוצע</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <div v-if="UidMessages == false && Uidnotifications == false ">
            <v-card color="#d6cfcf">
              <v-card-subtitle text color="black">
                אין התראות חדשות
              </v-card-subtitle>
            </v-card>
          </div>
        </v-expansion-panels>





        <!-------  for Messages Done ------->
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(Messages, index) in UidMessagesDone"
            :key="index"
            @click="setcurrentMess(Messages)"
          >
            <v-expansion-panel-header>
              <v-col>{{ Messages.title }} </v-col>
              <v-col> {{ Messages.subject }}</v-col>
              <v-col>{{ Messages.startDate }} </v-col>
              <template v-slot:actions>
                <v-icon color="green">fa fa-check</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-card color="#d6cfcf">
                  <v-card-subtitle text color="black">{{
                    Messages.PreviousPost
                  }}</v-card-subtitle>
                </v-card>
              </v-row>
              <v-row>
                {{ Messages.mes }}
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-btn text color="primary" @click="deleteMessages()"
                    >מחק</v-btn
                  >
                </v-col>
              </v-row>
              <!-------  for notifications Done ------->
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel
            v-for="(notifications, index) in UidnotificationsDone"
            :key="index"
            @click="setcurrentNoti(notifications)"
          >
            <v-expansion-panel-header>
              <v-col>{{ notifications.title }} </v-col>
              <v-col> {{ notifications.subject }}</v-col>
              <v-col>{{ notifications.startDate }} </v-col>
              <template v-slot:actions>
                <v-icon color="green">fa fa-check</v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
             
              <v-row>
                {{ notifications.mes }}
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-btn text color="primary" @click="deletenotifications()"
                    >מחק</v-btn
                  >
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <div v-if="UidMessagesDone == false && UidnotificationsDone == false">
            <v-card color="#d6cfcf">
              <v-card-subtitle text color="black">
                אין התראות שבוצעו
              </v-card-subtitle>
            </v-card>
          </div>
        </v-expansion-panels>
      </v-container>
    </div>
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
      nodaata: true,
      loading: true
    }
  },
  created() {
    fb.auth.onAuthStateChanged(user => {
      if (user) {
        this.lastSignIn = moment(user.metadata.lastSignInTime).calendar()
        this.setDetails()
      }
    })
  },
  mounted() {},
  updated() {},
  methods: {
    setcurrentMess(Messages) {
      this.$store.commit('setcurrentMessages', Messages)
    },
     setcurrentNoti(notifications) {
      this.$store.commit('setcurrentnotifications', notifications)
    },
    UpdateDone() {
      fb.Messages.doc(this.currentMessages.id).update({
        Done: true
      })
    },
    deleteMessages() {
      fb.Messages.doc(this.currentMessages.id).delete()
      this.currentMessages(null)
    },
    UpdateDonenotifications() {
      fb.notification.doc(this.currentnotifications.id).update({
        Done: true
      })
    },
    deletenotifications() {
      fb.notification.doc(this.currentnotifications.id).delete()
      this.currentnotifications(null)
    },
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
      'cropCycle',
      'currentMessages',
      'currentnotifications',
      'notifications',
      'Messages'
    ]),

    UidMessages: function() {
      return this.Messages.filter(m => {
        return m.to == this.userId && m.Done == false
      })
    },

    UidMessagesDone: function() {
      return this.Messages.filter(m => {
        return m.to == this.userId && m.Done == true
      })
    },
    Uidnotifications: function() {
      return this.notifications.filter(n => {
        return n.to == this.userId && n.Done == false
      })
    },

    UidnotificationsDone: function() {
      return this.notifications.filter(n => {
        return n.to == this.userId && n.Done == true
      })
    },
  }
}
</script>

<style scoped>
.container_fluid {
  background: linear-gradient(to right, #074c00, #42a341, #b8e2a3);

  padding: 15px;
  height: 90vh;
}
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
