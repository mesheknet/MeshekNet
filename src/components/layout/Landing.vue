<template>
  <div class="landing">
    <v-parallax
      src="https://firebasestorage.googleapis.com/v0/b/mesheknetapp.appspot.com/o/app%20base%20files%2FIMG_3134.JPG?alt=media&token=0e3acfb6-1f6c-4bf0-a91c-c5e3134d46f4"
    >
      <v-row>
        <v-col class="text-right" cols="12">
          <h1 class=" mb-4">ברוך הבא למשק שלך.</h1>
          <h4 class="subheading">
            ניהול המשק ביעילות ובפשטות<br />
            הישאר מחובר למשק שלך
          </h4>
        </v-col>
        <span>
          <v-btn
            x-large
            :to="{ name: 'Login' }"
            class="ma-4 light-green darken-2 white-text"
            >כניסה</v-btn
          >
          <v-btn
            x-large
            :to="{ name: 'Signup' }"
            class="ma-4 deep-purple darken-1 white-text"
            >הרשמה</v-btn
          >
        </span>
      </v-row>
    </v-parallax>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  data() {
    return {}
  },
  async mounted() {
    await this.$store.dispatch('bindStations')
  }
}
</script>

<style></style>
