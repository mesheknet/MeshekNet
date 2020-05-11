<template>
  <v-toolbar app class="success">
    <v-toolbar-title
      ><v-img
        max-height="100"
        max-width="100"
        src="https://firebasestorage.googleapis.com/v0/b/mesheknetapp.appspot.com/o/app%20base%20files%2Flogo.PNG?alt=media&token=205d4fcf-6cdc-488c-95c9-13d16f18da35"
      ></v-img
    ></v-toolbar-title>

    <v-toolbar-items v-for="link in links" :key="link.name">
      <v-btn class="success white--text" :to="{ name: link.route }">
        <span>{{ link.name }}</span>
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-btn :to="{ name: '' }">
      <span>פרטי המשק</span>
    </v-btn>

    <v-btn @click="logout">
      <span>התנתק</span>
    </v-btn>
  </v-toolbar>
</template>

<script>
const fb = require('@/fb.js')

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        { name: 'התראות', route: '/' },
        { name: 'הגידולים שלי', route: '/' },
        { name: 'הלול שלי', route: '/' },
        { name: 'מזג אויר', route: '/' },
        { name: 'צור קשר עם איש מקצוע', route: '/' }
      ]
    }
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
.navbar ul {
  position: relative;
  top: -10px;
}
.navbar nav img {
  position: relative;
  top: -10px;
  left: 7px;
}
</style>
