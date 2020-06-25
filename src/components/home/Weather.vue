<template>
  <v-container class="mt-4">
    <v-layout row justify-space-around>
      <v-flex md3>
        <v-card class="pa-2" outlined tile>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline"
                >San Francisco</v-list-item-title
              >
              <v-list-item-subtitle
                >Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col class="display-3" cols="6">
                23&deg;C
              </v-col>
              <v-col cols="6">
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/sun.png"
                  alt="Sunny image"
                  width="92"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-send</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cloud-download</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>48%</v-list-item-subtitle>
          </v-list-item>

          <v-slider
            v-model="time"
            :max="6"
            :tick-labels="labels"
            class="mx-4"
            ticks
          ></v-slider>

          <v-list class="transparent">
            <v-list-item v-for="item in forecast" :key="item.day">
              <v-list-item-title>{{ item.day }}</v-list-item-title>

              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-subtitle class="text-right">
                {{ item.temp }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text>Full Report</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3>
        <v-card class="pa-2" outlined tile>
          One of three columns
        </v-card>
      </v-flex>
      <v-flex md3>
        <v-card class="pa-2" outlined tile>
          One of three columns
        </v-card>
      </v-flex>
    </v-layout>
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
