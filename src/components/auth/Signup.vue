<template>
  <div class="signup container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center green-text darken-3">יצירת משתמש חדש</h2>
      <div class="field">
        <label for="email">כתובת מייל:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">סיסמה:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <!-- כאן אפשר להוסיף משתנים שיישמרו למשתמש בדטבייס !-->
      <div class="field">
        <label for="farmName">שם בעל המשק:</label>
        <input type="text" name="farmOwner" v-model="farmOwner" />
      </div>
      <div class="field">
        <label for="farmName">שם המשק:</label>
        <input type="text" name="farmName" v-model="farmName" />
      </div>
      <div class="field">
        <label for="address">כתובת המשק:</label>
        <input type="text" name="address" v-model="address" />
      </div>
      <div class="field">
        <label for="phone">מספר טלפון:</label>
        <input type="tel" name="phone" v-model="phone" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn light-green darken-3">הירשם</button>
      </div>
    </form>
  </div>
</template>

<script>
import moment from 'moment'
const fb = require('@/fb.js')

export default {
  name: 'Signup',
  data() {
    return {
      userId: null,
      email: null,
      password: null,
      farmOwner: null,
      farmName: null,
      address: null,
      phone: null,
      feedback: null
    }
  },
  methods: {
    signup() {
      if (this.email && this.password) {
        //כאן צריך להוסיף את המשתנים הנוספים של המשתמש - לשנות מהALIAS
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
                  regDate: moment().unix(),
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
