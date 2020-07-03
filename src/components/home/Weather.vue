<template>
  <v-container class="mx-auto">
    <v-layout row justify-space-around>
      <v-flex md12>
        <v-card class="mx-auto" max-width="700" tile>
          <v-card-title primary-title>
            <h4 class="text--secondary">מזג האויר כרגע באיזור המשק:</h4>
          </v-card-title>
          <img
            :src="
              'http://openweathermap.org/img/wn/' +
                this.openWeather.list[0].weather[0].icon +
                '@2x.png'
            "
          />
          <p>{{ this.openWeather.list[0].weather[0].description }}</p>
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
