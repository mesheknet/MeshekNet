<template>
  <v-container fluid fill-height class="mx-auto">
    <v-layout row>
      <v-flex md12>
        <v-card class="mt-6 text-center">
          <v-card-title>
            <h4 class="green-text darken-3">כניסה למערכת</h4>
          </v-card-title>
          <v-card-text>
            <v-form
              @keyup.native.enter="login"
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                v-model="email"
                :type="'email'"
                :rules="emailRules"
                label="כתובת מייל"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
                label="סיסמה"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-spacer></v-spacer>
              <p>{{ this.feedback }}</p>
              <v-row
                ><v-col>
                  <v-btn
                    block
                    dark
                    :disabled="!valid"
                    color="#558B2F"
                    @click="login"
                    :loading="loading"
                  >
                    היכנס
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn
                    :disabled="!valid"
                    block
                    dark
                    color="#558B2F"
                    @click="
                      resetPassword
                      snackbar = true
                    "
                  >
                    שכחתי סיסמה
                  </v-btn>
                </v-col></v-row
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar v-model="snackbar">
      הודעה לשחזור סיסמה נשלחה לכתובת המייל שלך.
    </v-snackbar>
  </v-container>
</template>

<script>
const fb = require('@/fb.js')
import moment from 'moment'
import { mapGetters } from 'vuex'
moment.locale('he')

export default {
  name: 'Login',
  data() {
    return {
      snackbar: false,
      email: null,
      password: null,
      feedback: null,
      emailRules: [
        (v) => !!v || 'נא להזין כתובת מייל',
        (v) => /.+@.+\..+/.test(v) || 'נא להזין כתובת מייל חוקית',
      ],
      passwordRules: [(v) => !!v || 'נא להזין סיסמה'],
      show: false,
      valid: true,
      loading: false,
    }
  },
  methods: {
    async login() {
      if (this.$refs.form.validate()) {
        this.loading = true
        fb.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.bindDB()
              .then(() => {
                this.updateLoginData() //get weather details from ims, update record in firestore
                this.getWeatherData(
                  this.farms.find((obj) => obj.id == this.farmId).weatherStation
                )
                this.$store.dispatch('bindWeather')

                this.feedback = null
              })
              .then(() => {
                this.loading = false
              })
              .then(() => {
                this.$router.push({ name: 'TransitionPage' })
              })
          })
          .catch((err) => {
            this.feedback = err.message
          })
        //set vuex store to hold db data and keep it locally synced
      }
    },
    //set vuex store to hold db data and keep it locally synced
    async bindDB() {
      await this.$store.dispatch('updateUid')
      await this.$store.dispatch('bindCurrentUser')
      await this.$store.dispatch('bindUsers')
      await this.$store.dispatch('updateFid')
      await this.$store.dispatch('bindFarms')
      await this.$store.dispatch('bindFarmOwners')
      await this.$store.dispatch('bindCrops')
      await this.$store.dispatch('bindFields')
      await this.$store.dispatch('bindAllCycles')
      await this.$store.dispatch('bindCropCycle')
      await this.$store.dispatch('bindPests')
      await this.$store.dispatch('bindPesticides')
      await this.$store.dispatch('bindPimplement')
      await this.$store.dispatch('bindFerts')
      await this.$store.dispatch('bindMessages')
      await this.$store.dispatch('bindNotifications')
      //for coop

      await this.$store.dispatch('bindChickens')
      await this.$store.dispatch('bindcoop')
      await this.$store.dispatch('bindallchickCycle')
      await this.$store.dispatch('bindchickCycle')
      await this.$store.dispatch('bindTreatType')
      await this.$store.dispatch('bindDisease')
      await this.$store.dispatch('bindTreatment')
      await this.$store.dispatch('bindDrug')
    },

    async getWeatherData(station) {
      let response
      response = await this.$http.get(
        'https://cors-anywhere.herokuapp.com/https://api.ims.gov.il/v1/envista/stations/' +
          station +
          '/data/latest',
        {
          headers: {
            Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47',
          },
        }
      )
      let now = moment(Date.now()).format('X')
      let weather = {
        farmId: this.farmId,
        date: now,
        data: response.body.data[0].channels,
      }
      this.clearOldWeather(now)
      fb.weather.doc().set(weather)
    },
    //keep only updated weather data in firestore
    clearOldWeather(now) {
      fb.weather
        .where('farmId', '==', this.farmId)
        .where('date', '<', now)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            doc.ref.delete()
          })
        })
    },

    //update user's login time data
    updateLoginData() {
      let userLastLogin = this.currentUser[0].currentLogin
      fb.user.doc(this.currentUser[0].email).update({
        lastLogin: userLastLogin,
        currentLogin: moment().format('L'),
      })
    },

    resetPassword() {
      fb.auth
        .sendPasswordResetEmail(this.email)
        .then(function () {
          this.feedback =
            'אנא בדוק את תיבת הדואר האלקטרוני לצורך הגדרת סיסמה חדשה'
        })
        .catch(function (error) {
          this.feedback = error
        })
    },
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'farmId',
      'farms',
      'userId',
      'users',
      'currentUser',
      'LOADED',
    ]),
  },
}
</script>
