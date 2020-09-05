<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md12>
        <v-card class="mx-auto text-center">
          <v-card-title>
            <h4 class="green--text darken-3">יצירת משתמש חדש</h4>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="farmOwner"
                :rules="nameRules"
                label="שם בעל המשק"
                required
              ></v-text-field>

              <v-text-field
                v-model="farmName"
                :rules="nameRules"
                label="שם המשק"
                required
              ></v-text-field>

              <v-text-field
                v-model="address"
                label="כתובת המשק"
                required
              ></v-text-field>

              <v-select
                v-model="selectedStation"
                :items="stations"
                label="בחר איזור לנתוני מזג אויר"
                item-text="name"
                return-object
              ></v-select>

              <v-text-field
                v-model="phone"
                :type="'phone'"
                label="מספר טלפון"
                :counter="10"
                :rules="phoneRules"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="כתובת מייל"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                @click:append="show = !show"
                :counter="8"
                :rules="passwordRules"
                label="בחר סיסמה"
                required
              ></v-text-field>
              <v-spacer></v-spacer>
              <p>{{ this.feedback }}</p>
              <v-btn
                block
                dark
                :disabled="!valid"
                color="#558B2F"
                @click="signup"
                :loading="loading"
              >
                הירשם
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
const fb = require('@/fb.js')

export default {
  name: 'Signup',
  data() {
    return {
      valid: true,
      nameRules: [(v) => !!v || 'נא להזין שם'],
      emailRules: [
        (v) => !!v || 'נא להזין כתובת מייל',
        (v) => /.+@.+\..+/.test(v) || 'נא להזין כתובת מייל חוקית',
      ],
      passwordRules: [
        (v) => !!v || 'נא להזין סיסמה',
        (v) => v.length >= 8 || 'סיסמה בת 8 תווים לפחות',
      ],
      phoneRules: [(v) => !!v || 'נא להזין מספר טלפון'],
      show: false,
      email: null,
      userId: null,
      password: null,
      farmOwner: null,
      farmName: null,
      address: null,
      phone: null,
      feedback: null,
      loading: false,
      selectedStation: null,
    }
  },
  methods: {
    //create new user and save data fields to firebase
    signup() {
      if (this.$refs.form.validate()) {
        this.loading = true
        let ref = fb.user.doc(this.email)
        let refOwner = fb.farmOwner.doc()
        let refFarm = fb.farm.doc()
        ref.get().then((doc) => {
          if (doc.exists) {
            this.feedback = 'משתמש קיים במערכת'
          } else {
            fb.auth
              .createUserWithEmailAndPassword(this.email, this.password)
              .then((cred) => {
                this.userId = cred.user.uid
                ref.set({
                  email: this.email,
                  userId: this.userId,
                  farmId: refFarm.id,
                  regDate: moment().format('L'),
                  lastLogin: moment().format('L'),
                  currentLogin: moment().format('L'),
                  phone: this.phone,
                })
              })
              .then(() => {
                refOwner.set({
                  userId: this.userId,
                  name: this.farmOwner,
                })
              })
              .then(() => {
                refFarm.set({
                  name: this.farmName,
                  address: this.address,
                  userId: this.userId,
                  weatherStation: this.selectedStation.id,
                })
              })
              .then(() => {
                this.$router.push({ name: 'Login' })
              })
              .catch((err) => {
                console.log(err)
                this.feedback = err.message
              })
          }
        })
      }
    },
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['stations']),
  },
}
</script>

