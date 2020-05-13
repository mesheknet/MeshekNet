<template>
  <v-app class="grey lighten-3 appFont">
    <v-content>
      <Navbar />
      <router-view> </router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

