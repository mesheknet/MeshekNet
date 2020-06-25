<template>
  <v-container fluid>
    <v-card v-for="n in 3" :key="n" class="ma-3 pa-6" outlined tile>
      Column
    </v-card>
  </v-container>
</template>

<script>
//const fb = require('@/fb.js')
import { mapGetters } from 'vuex'
//import moment from 'moment'

export default {
  name: 'Weather',
  stationName: null,

  data() {
    return {}
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['weather', 'farmId'])
  },
  mounted() {
    let tempWeather = this.weather.find(obj => obj.farmId == this.farmId).data

    console.log(tempWeather.find(obj => obj.name == 'WD'))
  }
}
</script>
