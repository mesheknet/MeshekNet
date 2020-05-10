<template>
  <v-app>
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
