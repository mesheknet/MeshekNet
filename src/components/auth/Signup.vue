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
        <label for="farmName">שם המשק:</label>
        <input type="text" name="farmName" v-model="farmName" />
      </div>
      <div class="field">
        <label for="address">כתובת המשק:</label>
        <input type="text" name="address" v-model="address" />
      </div>
      <div class="field">
        <label for="birthDate">תאריך לידה:</label>
        <input type="date" name="birthDate" v-model="birthDate" />
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
import slugify from 'slugify'
const fb = require('@/fb.js')

export default {
  name: 'Signup',
  data() {
    return {
      email: null,
      password: null,
      farmName: null,
      address: null,
      birthDate: null,
      phone: null,
      feedback: null,
      slug: null
    }
  },
  methods: {
    signup() {
      if (this.alias && this.email && this.password) {
        this.slug = slugify(this.alias, {
          replacement: '-',
          remove: /[$]/g,
          lower: true
        })
        //כאן צריך להוסיף את המשתנים הנוספים של המשתמש - לשנות מהALIAS
        let ref = fb.usersCollection.doc(this.slug)
        ref.get().then(doc => {
          if (doc.exists) {
            this.feedback = 'הכינוי כבר קיים'
          } else {
            fb.auth
              .createUserWithEmailAndPassword(this.email, this.password)
              .then(cred => {
                ref.set({
                  alias: this.alias,
                  user_id: cred.user.uid
                })
              })
              .then(() => {
                this.$router.push({ name: 'Notifications' })
              })
              .catch(err => {
                console.log(err)
                this.feedback = err.message
              })
            this.feedback = 'הכינוי זמין'
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
