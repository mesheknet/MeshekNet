<template>
  <div class="navbar">
    <nav class=" light-green darken-4">
      <div class="container">
        <router-link :to="{ name: 'Notifications' }" class="brand-logo right"
          ><img src="src/assets/logo" />
        </router-link>

        <ul
          class="right"
          v-if="this.$route.path !== '/signup' && this.$route.path !== '/login'"
        >
          <li>
            <router-link :to="{ name: '' }">צור קשר עם איש מקצוע</router-link>
          </li>
          <li><router-link :to="{ name: '' }">מזג אויר</router-link></li>
          <li><router-link :to="{ name: '' }">הגידולים שלי</router-link></li>
          <li><router-link :to="{ name: '' }">הלול שלי</router-link></li>
          <li>
            <router-link :to="{ name: 'Notifications' }">התראות</router-link>
          </li>
        </ul>
        <ul class="left">
          <li><router-link :to="{ name: 'Login' }">כניסה</router-link></li>
          <li><router-link :to="{ name: 'Signup' }">הרשמה</router-link></li>
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
    }
  }
}
</script>

<style>
.navbar nav img {
  position: relative;
  left: 7px;
}
</style>
