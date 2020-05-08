<template>
  <div class="container"></div>
</template>

<script>
const fb = require('@/fb.js')

export default {
  name: 'Notifications',
  currentUser: null,
  data() {
    return {}
  },
  mounted() {
    console.log(fb.currentUser)
  },
}
</script>

<style>
.login {
  max-width: 400px;
  margin-top: 60px;
}

.login .h2 {
  font-size: 2.4em;
}

.login .field {
  margin-bottom: 16px;
}
</style>
