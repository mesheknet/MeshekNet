<template>
  <div>
    <v-container fluid fill-height class="mx-auto">
      <v-layout row justify-space-around>
        <v-flex md12>
          <v-card class="mx-auto" max-width="700" tile>
            <v-card-title>
              מזג האויר כרגע באיזור המשק
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col>
                  <h5>{{ openWeather.current.weather[0].description }}</h5>
                </v-col>
              </v-row>

              <v-row align="center">
                <v-col class="display-3">
                  {{ openWeather.current.temp.toFixed(0) }}°c
                </v-col>
                <v-col>
                  <v-img
                    :src="
                      'http://openweathermap.org/img/wn/' +
                      openWeather.current.weather[0].icon +
                      '@2x.png'
                    "
                    width="92"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-list-item two-line>
                    <v-list-item-icon>
                      <v-icon color="indigo accent-2">fas fa-tint</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>לחות:</v-list-item-title>
                      <v-list-item-subtitle
                        >{{
                          openWeather.current.humidity
                        }}%</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col>
                  <v-list-item two-line>
                    <v-list-item-icon>
                      <v-icon color="deep-purple ">fas fa-wind</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>מהירות הרוח:</v-list-item-title>
                      <v-list-item-subtitle
                        >{{
                          (openWeather.current.wind_speed * 3.6).toFixed(0)
                        }}
                        קמ"ש</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
                <v-col>
                  <v-list-item two-line>
                    <v-list-item-icon>
                      <v-icon color="teal accent-5">fas fa-compass</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>כיוון הרוח:</v-list-item-title>
                      <v-list-item-subtitle
                        >{{ degToCompass(openWeather.current.wind_deg) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-row class="mt-4">
            <v-col v-for="n in 3" :key="n">
              <v-row>
                <v-col>
                  <v-card>
                    <v-card-title>
                      תחזית ליום
                      {{ moment().add(n, 'd').format('dddd') }}
                    </v-card-title>
                    <v-card-text>
                      <h5>
                        {{ openWeather.daily[n].weather[0].description }}
                      </h5>
                      <v-row align="center">
                        <v-col class="display-3">
                          {{ openWeather.daily[n].temp.day.toFixed(0) }}°c
                        </v-col>
                        <v-col>
                          <v-img
                            :src="
                              'http://openweathermap.org/img/wn/' +
                              openWeather.daily[n].weather[0].icon +
                              '@2x.png'
                            "
                            width="92"
                          ></v-img>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col>
                          <v-list-item two-line>
                            <v-list-item-icon>
                              <v-icon color="indigo accent-2"
                                >fas fa-tint</v-icon
                              >
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>לחות:</v-list-item-title>
                              <v-list-item-subtitle
                                >{{
                                  openWeather.daily[n].humidity
                                }}%</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col>
                          <v-list-item two-line>
                            <v-list-item-icon>
                              <v-icon color="deep-purple ">fas fa-wind</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title
                                >מהירות הרוח:</v-list-item-title
                              >
                              <v-list-item-subtitle
                                >{{
                                  (
                                    openWeather.daily[n].wind_speed * 3.6
                                  ).toFixed(0)
                                }}
                                קמ"ש</v-list-item-subtitle
                              >
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                        <v-col>
                          <v-list-item two-line>
                            <v-list-item-icon>
                              <v-icon color="teal accent-5"
                                >fas fa-compass</v-icon
                              >
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title>כיוון הרוח:</v-list-item-title>
                              <v-list-item-subtitle
                                >{{
                                  degToCompass(openWeather.daily[n].wind_deg)
                                }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
//const fb = require('@/fb.js')
import moment from 'moment'
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
        'צפון-צפון-מערב',
      ]
      return arr[val % 16]
    },
  },
  computed: {
    ...mapGetters(['openWeather']),
  },
  created() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.$store.dispatch('getWeather', position)
        },
        (error) => {
          console.log(error)
        }
      )
    }
  },
  mounted() {
    console.log(moment().add(1).format('dddd'))
  },
}
</script>
<style >
</style>