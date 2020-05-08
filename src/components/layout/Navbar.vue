<template>
  <div class="navbar">
    <nav class=" light-green darken-4">
      <div class="container">
        <router-link :to="{ name: 'Notifications' }" class="brand-logo right">משק.נט</router-link>
        <ul class="left">
          <li><router-link :to="{ name: 'Signup' }">הרשמה</router-link></li>
          <li><router-link :to="{ name: 'Login' }">כניסה</router-link></li>
          <li><a @click="logout">התנתק</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
const fb = require('@/fb.js')

export default {
  name: 'Navbar',
  data() {
    return {}
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
  },
}
</script>

<style></style>
