<template>
  <v-app class="grey lighten-3 appFont">
    <v-content>
      <Navbar />
      <router-view> </router-view>
      <Footer />
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
    Footer
  }
}
</script>

