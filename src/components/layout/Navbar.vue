<template>
  <nav>
    <v-toolbar flat class="success">
      <v-toolbar-side-icon
        ><v-img
          max-height="70"
          max-width="70"
          src="https://firebasestorage.googleapis.com/v0/b/mesheknetapp.appspot.com/o/app%20base%20files%2FmeshekNet_logo.png?alt=media&token=77731a26-1333-40ad-ad50-77a6b53c9080"
        ></v-img
      ></v-toolbar-side-icon>

      <v-toolbar-items v-for="link in links" :key="link.name">
        <v-btn flat color="success" :to="{ name: link.route }">
          <span>{{ link.name }}</span>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat color="success" :to="{ name: '' }">
          <span>פרטי המשק</span>
        </v-btn>

        <v-btn flat color="success" @click="logout">
          <span>התנתק</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </nav>
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
