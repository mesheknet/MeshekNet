<template>
  <v-container class="mx-auto">
    <v-layout row justify-space-around>
      <v-flex md12>
        <v-card class="mx-auto" max-width="700" tile>
          <v-card-title primary-title>
            <h4 class="text--secondary">מזג האויר כרגע באיזור המשק:</h4>
          </v-card-title>
          <v-card-text>
            <h5>{{ this.openWeather.list[0].weather[0].description }}</h5>
            <v-row align="center">
              <v-col class="display-3" cols="6">
                {{ this.openWeather.list[0].main.temp.toFixed(0) }}°c
              </v-col>
              <v-col cols="6">
                <v-img
                  :src="
                    'http://openweathermap.org/img/wn/' +
                      this.openWeather.list[0].weather[0].icon +
                      '@2x.png'
                  "
                  width="92"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>טמפרטורה ממוצעת:</v-list-item-title>
              <v-list-item-subtitle
                >{{
                  this.openWeather.list[0].main.temp.toFixed(0)
                }}°c</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>לחות:</v-list-item-title>
              <v-list-item-subtitle
                >{{
                  this.openWeather.list[0].main.humidity
                }}%</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>מהירות הרוח:</v-list-item-title>
              <v-list-item-subtitle
                >{{
                  (this.openWeather.list[0].wind.speed * 3.6).toFixed(0)
                }}
                קמ"ש</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>כיוון הרוח:</v-list-item-title>
              <v-list-item-subtitle
                >{{ degToCompass(this.openWeather.list[0].wind.deg) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-row :align="align" no-gutters style="height: 150px;">
          <v-col v-for="n in 3" :key="n">
            <v-card class="mx-auto" max-width="400">
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title
                    >מזג האויר כרגע באיזור המשק:</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdiWeatherWindy</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-cloud-download</v-icon>
                </v-list-item-icon>
                <v-list-item-subtitle>48%</v-list-item-subtitle>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
//const fb = require('@/fb.js')
//import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'Weather',
  stationName: null,

  data() {
    return {}
  },
  methods: {
    degToCompass(num) {
      var val = Math.floor(num / 22.5 + 0.5)
      var arr = [
        'צפון',
        'צפון-צפון-מזרח',
        'צפון-מזרח',
        'מזרח-צפון-מזרח',
        'מזרח',
        'מזרח-דרום-מזרח',
        'דרום-מזרח',
        'דרום-דרום-מזרח',
        'דרום',
        'דרום-דרום-מערב',
        'דרום-מערב',
        'מערב-דרום-מערב',
        'מערב',
        'מערב-צפון-מערב',
        'צפון-מערב',
        'צפון-צפון-מערב'
      ]
      return arr[val % 16]
    }
  },
  computed: {
    ...mapGetters(['openWeather'])
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.$store.dispatch('getWeather', position)
        },
        error => {
          console.log(error)
        }
      )
    }
  },
  mounted() {
    console.log(this.openWeather)
  }
}
</script>
