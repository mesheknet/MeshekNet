<template>
  <div class="grey lighten-3 appFont">
    <Navbar />
    <router-view> </router-view>
  </div>
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

