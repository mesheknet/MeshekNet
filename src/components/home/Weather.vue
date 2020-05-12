<template>
  <v-container>
    <v-list> </v-list>
    <p>stationName:{{ this.stationName }}</p>
  </v-container>
</template>

<script>
export default {
  name: 'Weather',
  stationName: null,

  data() {
    return {}
  },
  mounted() {
    this.$http
      .get(
        'https://cors-anywhere.herokuapp.com/https://api.ims.gov.il/v1/envista/stations/23',
        {
          headers: {
            Authorization: 'ApiToken f058958a-d8bd-47cc-95d7-7ecf98610e47'
          }
        }
      )
      .then(
        response => {
          console.log(response)
        },
        err => {
          console.log(err)
        }
      )
  }
}
</script>
