<template>
  <v-app class="light-green lighten-4 appFont">
    <v-content>
      <Navbar />
      <router-view> </router-view>
      <Footer v-if="$route.name != 'Landing'" />
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
}

//for app build and upload:
//npm run build
//firebase deploy --only hosting
</script>

