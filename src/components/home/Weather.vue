<template>
  <v-container class="mx-auto">
    <v-layout row justify-space-around>
      <v-flex md12>
        <v-card class="mx-auto" max-width="700" tile>
          <v-card-title primary-title>
            <h4 class="text--secondary">מזג האויר היום באיזור המשק:</h4>
          </v-card-title>
          <img
            :src="
              'http://openweathermap.org/img/wn/' +
                this.weather.list[0].weather[0].icon +
                '@2x.png'
            "
          />
          <p>{{ this.weather.list[0].weather[0].description }}</p>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>טמפרטורה ממוצעת:</v-list-item-title>
              <v-list-item-subtitle
                >{{ this.weather.list[0].main.temp }}°c</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>לחות:</v-list-item-title>
              <v-list-item-subtitle
                >{{ this.weather.list[0].main.humidity }}%</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>מהירות הרוח:</v-list-item-title>
              <v-list-item-subtitle
                >{{
                  this.weather.list[0].wind.speed
                }}
                קמ"ש</v-list-item-subtitle
              >
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

let google

export default {
  name: 'Weather',
  stationName: null,

  data() {
    return {
      weather: null
    }
  },
  methods: {
    getWeather(position) {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      this.$http
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=cf89017588e993af02c5a5e11390cef3&units=metric&lang=he`
        )
        .then(
          response => {
            this.weather = response.body
            console.log(response.body)
          },
          error => {
            console.log(error)
          }
        )
    }
  },
  computed: {},
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.getWeather(position)
        },
        error => {
          console.log(error)
        }
      )
    }
    const autocomplete = new google.maps.places.Autocomplete(this.place)
    console.log(autocomplete)
  }
}
</script>
