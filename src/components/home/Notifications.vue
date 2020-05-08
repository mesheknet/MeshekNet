<template>
  <div class="container">
    <h1>משק.נט</h1>
    <p>
      מערכת זאת מיודעת לשמש בעלי משקים ולהוות עבורם מקור מהימן למידע מקצועי.<br />
      המערכת עוזרת בכל הקשור לאירגון מידע ולתזכורות למשימות השונות שבעלי המשקים
      צריכים לבצע
    </p>
  </div>
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
  }
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
