<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="mx-auto white--text"
        color="light green"
        v-on="on"
        min-width="200"
      >
        הודעות<v-icon right>far fa-envelope</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הודעות
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-row>
            <v-col class="mr-8">שם</v-col>
            <v-col>כותרת</v-col>
            <v-col>נושא</v-col>
            <v-col class="mr-12">תאריך</v-col>
          </v-row>
          <v-expansion-panels focusable class="mb-6" v-model="model">
            <v-expansion-panel
              v-for="(Messages, index) in AMesseg"
              :key="index"
              @click="setcurrentMess(Messages)"
              multiple
            >
              <v-expansion-panel-header expand-icon="fa fa-exclamation">
                <v-col>{{ setOwners(Messages.userid) }} </v-col>
                <v-col>{{ Messages.title }} </v-col>
                <v-col>{{ Messages.subject }}</v-col>
                <v-col>{{ Messages.startDate }} </v-col>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-row>
                  {{ Messages.mes }}
                </v-row>
                <v-row v-if="Messages.imgURL">
                  <v-expansion-panels focusable class="mb-6">
                    <v-expansion-panel multiple>
                      <v-expansion-panel-header>
                       לחץ להצגת תמונה מצורפת
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <img
                          :src="Messages.imgURL"
                          height="100%"
                          width="100%"
                        />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>
                <v-col cols="4">
                  <MessageFromAdmin />
                </v-col>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel
              v-for="(Messages, index) in AMessegDone"
              :key="index"
            >
              <v-expansion-panel-header>
                <v-col>{{ setOwners(Messages.userid) }} </v-col>
                <v-col>{{ Messages.title }} </v-col>
                <v-col>{{ Messages.subject }}</v-col>
                <v-col>{{ Messages.startDate }} </v-col>
                <template v-slot:actions>
                  <v-icon color="green">fa fa-check</v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  {{ Messages.mes }}
                </v-row>
                <v-row v-if="Messages.imgURL">
                  <v-expansion-panels focusable class="mb-6">
                    <v-expansion-panel multiple>
                      <v-expansion-panel-header>
                        לחץ להצגת תמונה מצורפת
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <img :src="Messages.imgURL" height="100%" width="100%" />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <MessageFromAdmin />
                  </v-col>

                  <v-col cols="4">
                    <v-btn
                      text
                      color="primary"
                      @click="
                        close()
                        setcurrentMess(Messages)
                        deleteMessages()
                      "
                      >מחק</v-btn
                    >
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
const fb = require('@/fb.js')
import { mapGetters } from 'vuex'
import MessageFromAdmin from './MessageFromAdmin'
export default {
  name: 'AdminMesseg',
  components: { MessageFromAdmin },
  data() {
    return {
      model: [],
      loading: false,
      dialog: null,
      dosage: null,
      vol: null
    }
  },
  created() {},
  methods: {
    setcurrentMess(Messages) {
      this.$store.commit('setcurrentMessages', Messages)
    },
    setOwners(MessagesUid) {
      return (this.ownerName = this.farmOwners.find(function(m) {
        return m.userId == MessagesUid
      }).name)
    },

    deleteMessages() {
      fb.Messages.doc(this.currentMessages.id).delete()
      this.currentMessages(null)
    },
    close() {
      this.model = []
    }
  },

  updated() {},
  computed: {
    AMesseg: function() {
      return this.Messages.filter(function(m) {
        return m.to == 'admin' && m.Done == false
      })
    },
    AMessegDone: function() {
      return this.Messages.filter(function(m) {
        return m.to == 'admin' && m.Done == true
      })
    },

    //get local data from firestore using the store
    ...mapGetters(['Messages', 'userId', 'farmOwners', 'currentMessages'])
  }
}
</script>
