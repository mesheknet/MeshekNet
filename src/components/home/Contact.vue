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

          <v-row>
            <v-col>
              <v-file-input
                accept=".jpg"
                label="בחר תמונה"
                v-model="chosenFile"
                prepend-icon="fas fa-camera"
              >
              </v-file-input>
            </v-col>
            <v-col>
              <v-btn
                fab
                @click="onUpload"
                color="blue-grey"
                class="ma-2 white--text"
              >
                <v-icon dark>fas fa-cloud-upload-alt</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-progress-linear
              v-if="uploadValue > 0"
              v-model="uploadValue"
            ></v-progress-linear>
          </v-row>
          <v-row v-if="picture != null">
            <img class="preview" :src="picture" />
          </v-row>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4 mt-4"
            @click="submit"
          >
            שלח
          </v-btn>

          <v-btn color="error" class="mr-4 mt-4" @click="reset">
            נקה הכל
          </v-btn>
        </v-form>
        <v-snackbar v-model="snackbar"> ההודעה נשלחה בהצלחה. </v-snackbar>
      </v-container>
    </div>
  </div>
</template>

<script>
const fb = require('@/fb.js')
import firebase from 'firebase'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'Contact',

  stationName: null,

  data() {
    return {
      snackbar: false,
      chosenFile: null,
      imageData: null,
      picture: null,
      uploadValue: 0,
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
      if (this.$refs.form.validate()) {
        var NewMessage = {
          id: fb.Messages.doc().id,
          title: this.select,
          subject: this.Topic,
          mes: this.mes,
          PreviousPost: null,
          to: 'admin',
          imgURL: this.picture,
        }
      }
      this.$store.commit('SendMessage', NewMessage)
      this.$refs.form.reset()
      this.snackbar = true
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

    onUpload() {
      this.picture = null
      const storageRef = firebase
        .storage()
        .ref(`${this.chosenFile.name}`)
        .put(this.chosenFile)
      storageRef.on(
        `state_changed`,
        (snapshot) => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        (error) => {
          console.log(error.message)
        },
        () => {
          this.uploadValue = 100
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.picture = url
          })
        }
      )
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
.preview {
  height: 150px;
}
</style>
