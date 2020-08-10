<template>
  <v-dialog max-width="600" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn text color="primary" v-on="on">
        השב
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        השב הודעה
      </v-card-title>

      <div class="container_fluid">
        <div class="container_content">
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-col cols="12">
                <v-textarea
                  solo
                  auto-grow
                  label="השב"
                  row-height="40"
                  v-model="AdminMessage"
                ></v-textarea>
              </v-col>

              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="submit"
              >
                שלח
              </v-btn>

              <v-btn color="error" class="mr-4" @click="dialog = false">
                חזור
              </v-btn>
            </v-form>
          </v-container>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
const fb = require('@/fb.js')
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'MessageFromAdmin',
  components: {},
  data() {
    return {
      valid: true,
      AdminMessage: null,
      loading: false,
      dialog: null,
      dosage: null,
      vol: null
    }
  },
  created() {
    this.setDetails()
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        var NewMessage = {
          id: fb.Messages.doc().id,
          title: this.currentMessages.title,
          subject: this.currentMessages.subject,
          mes: this.AdminMessage,
          to: this.currentMessages.userid
        }
      }

      this.$store.commit('SendMessage', NewMessage)
      fb.Messages.doc(this.currentMessages.id).update({
        Done: true
      })
      this.$refs.form.reset()
    },
    formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    },
    validate() {
      this.$refs.form.validate()
    }
  },

  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['Messages', 'userId', 'farmOwners', 'currentMessages'])
  }
}
</script>
