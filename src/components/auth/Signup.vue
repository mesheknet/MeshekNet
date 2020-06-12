<template>
  <v-container>
    <v-layout>
      <v-flex xl2>
        <v-card class="mx-auto text-center">
          <v-card-title>
            <h4 class="green-text darken-3">יצירת משתמש חדש</h4>
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

              <v-text-field
                v-model="phone"
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
                :rules="passwordRules"
                label="בחר סיסמה"
                required
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                color="success"
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
import moment from 'moment'
const fb = require('@/fb.js')

export default {
  name: 'Signup',
  data() {
    return {
      valid: true,
      nameRules: [v => !!v || 'נא להזין שם'],
      emailRules: [
        v => !!v || 'נא להזין כתובת מייל',
        v => /.+@.+\..+/.test(v) || 'נא להזין כתובת מייל חוקית'
      ],
      passwordRules: [
        v => !!v || 'נא להזין סיסמה',
        v => (v || '').length <= 8 || 'סיסמה בת 8 תווים לפחות'
      ],
      phoneRules: [v => !!v || 'נא להזין מספר טלפון'],
      email: null,
      userId: null,
      password: null,
      farmOwner: null,
      farmName: null,
      address: null,
      phone: null,
      feedback: null,
      loading: false
    }
  },
  methods: {
    //create new user and save data fields to firebase
    signup() {
      if (this.$refs.form.validate()) {
        if (this.email && this.password) {
          this.loading = true
          let ref = fb.user.doc(this.email)
          let refOwner = fb.farmOwner.doc()
          let refFarm = fb.farm.doc()
          ref.get().then(doc => {
            if (doc.exists) {
              this.feedback = 'משתמש קיים במערכת'
            } else {
              fb.auth
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(cred => {
                  this.userId = cred.user.uid
                  ref.set({
                    email: this.email,
                    userId: this.userId,
                    regDate: moment().format('L'),
                    phone: this.phone
                  })
                })
                .then(() => {
                  refOwner.set({
                    userId: this.userId,
                    name: this.farmOwner
                  })
                })
                .then(() => {
                  refFarm.set({
                    name: this.farmName,
                    address: this.address,
                    userId: this.userId
                  })
                })
                .then(() => {
                  this.$router.push({ name: 'Notifications' })
                })
                .catch(err => {
                  console.log(err)
                  this.feedback = err.message
                })
            }
          })
        } else {
          this.feedback = 'חייב להכניס את כל השדות'
        }
      }
    }
  }
}
</script>

<style>
.signup {
  max-width: 400px;
  margin-top: 60px;
}
.signup h2 {
  font-size: 2.4em;
}
.signup field {
  margin-bottom: 16px;
}
</style>
