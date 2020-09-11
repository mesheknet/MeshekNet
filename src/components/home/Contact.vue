<template>
  <div class="container_fluid">
    <div class="container_content">
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'נדרש לבחור סיבת פניה']"
            label="בחר סיבת פניה"
            required
          ></v-select>

          <v-text-field
            v-model="Topic"
            :counter="20"
            :rules="nameRules"
            label="נושא"
            required
          ></v-text-field>

          <v-textarea
            v-model="mes"
            :rules="messageRules"
            label="כתוב הודעה"
            auto-grow
            row-height="15"
            required
          ></v-textarea>

          <v-file-input
            v-model="files"
            label="העלאת תמונה"
            prepend-icon="fas fa-camera"
          ></v-file-input>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="submit"
          >
            שלח
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> נקה הכל </v-btn>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
const fb = require('@/fb.js')
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'Contact',

  stationName: null,

  data() {
    return {
      files: null,
      valid: true,
      Topic: null,
      nameRules: [
        (v) => !!v || 'נדרש לכתוב נושא פניה',
        (v) => (v && v.length <= 20) || 'נושא הפניה צריך להיות קטן מ20 אותיות',
      ],
      mes: null,
      messageRules: [
        (v) => !!v || 'נדרש לכתוב את תוכן הודעה',
        (v) => (v && v.length > 10) || 'תוכן ההודעה צריך להיות גדול מ10 אותיות',
      ],
      select: null,
      items: ['לול', 'גידולי שדה', 'דיווח על בעיות תוכנה', 'מזג אוויר'],
    }
  },
  methods: {
    submit() {
      console.log(this.files)

      if (this.$refs.form.validate()) {
        var NewMessage = {
          id: fb.Messages.doc().id,
          title: this.select,
          subject: this.Topic,
          mes: this.mes,
          PreviousPost: null,
          to: 'admin',
        }
      }
      this.$store.commit('SendMessage', NewMessage)
      this.$refs.form.reset()
    },
    formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
  },
  computed: {
    ...mapGetters(['userId', 'Messages']),
  },
}
</script>

<style scoped>
.container_fluid {
  padding: 15px;
}
.container_content {
  width: 800px;
  margin: auto;
  background-color: #f7f8f7;
  padding: 15px;

  box-shadow: 5px 5px 8px #888888;
  height: 100%;
  background-color: snow;
}
</style>
