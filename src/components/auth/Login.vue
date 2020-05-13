<template >
  <div class="login container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center green-text">כניסה</h2>
      <div class="field">
        <label for="email">כתובת מייל:</label>
        <input type="email" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">סיסמה:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="red-text center" v-if="feedback">{{ feedback }}</p>
      <div class="field center">
        <button class="btn green">היכנס</button>
      </div>
    </form>
  </div>
</template>

<script>
const fb = require('@/fb.js')

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      feedback: null
    }
  },
  methods: {
    login() {
      if (this.email && this.password) {
        fb.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(cred => {
            console.log(cred.user)
            this.$router.push({ name: 'Notifications' })
          })
          .catch(err => {
            this.feedback = err.message
          })

        this.feedback = null
      } else {
        this.feedback = 'יש להכניס מייל וסיסמה'
      }
    }
  }
}
</script>

<style>
.login .field label {
  float: right;
}
</style>
