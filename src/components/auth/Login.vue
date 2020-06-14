<template>
  <v-container>
    <v-layout>
      <v-flex xl2>
        <v-card class="mx-auto text-center">
          <v-card-title>
            <h4 class="green-text darken-3">כניסה למערכת</h4>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
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
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const fb = require('@/fb.js')

export default {
  name: 'Login',
  data() {
    return {
      email: null,
      password: null,
      feedback: null,
      emailRules: [
        v => !!v || 'נא להזין כתובת מייל',
        v => /.+@.+\..+/.test(v) || 'נא להזין כתובת מייל חוקית'
      ],
      passwordRules: [v => !!v || 'נא להזין סיסמה'],
      show: false,
      valid: true,
      loading: false
    }
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true
        fb.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            this.$router.push({ name: 'Notifications' })
            this.$store.commit('updateCred')
          })
          .catch(err => {
            this.feedback = err.message
          })

        this.feedback = null
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
