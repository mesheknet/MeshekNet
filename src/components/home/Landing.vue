<template>
  <v-content>
    <v-toolbar flat class="success">
      <v-toolbar-side-icon
        ><v-img
          :to="{ name: 'Notifications' }"
          max-height="70"
          max-width="70"
          src="https://firebasestorage.googleapis.com/v0/b/mesheknetapp.appspot.com/o/app%20base%20files%2FmeshekNet_logo.png?alt=media&token=77731a26-1333-40ad-ad50-77a6b53c9080"
        ></v-img
      ></v-toolbar-side-icon>
    </v-toolbar>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 class="text-xs-center" mt-5>
          <h1>ברוכים הבאים למשק שלך.</h1>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
          <blockquote class="blockquote text-xs-center">
            מערכת זו מיודעת לשמש בעלי משקים ולהוות עבורם מקור מהימן למידע
            מקצועי.<br />
            המערכת עוזרת בכל הקשור לארגון מידע ולתזכורות למשימות השונות שבעלי
            המשקים צריכים לבצע
          </blockquote>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
          <v-btn color="success" to="/signup">הרשמה</v-btn>
          <v-btn to="/login">כניסה</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {}
  }
}
</script>
