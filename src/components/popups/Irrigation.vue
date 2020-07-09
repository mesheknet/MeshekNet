<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mx-auto" color="light green" dark v-on="on">
        השקיה<v-icon right>&#x1F4A7;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        השקיה
      </v-card-title>

      <v-card-text>
        <v-select
          :items="[1, 2, 3, 4, 5, 6, 7]"
          v-model="daysIrrigation"
          label="בחר את מספר ימי ההשקיה בשבוע:"
        ></v-select>
        <v-row>
          <v-col>
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="cyan lighten-3">fas fa-faucet</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >כמות מים לפתיחה יומית לדונם:</v-list-item-title
                >
                <v-list-item-title
                  >{{
                    (calcWater() / daysIrrigation).toFixed(2)
                  }}
                  מ"ק</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="amber darken-2">fas fa-expand</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >כמות מים לפתיחה יומית לכל החלקה:</v-list-item-title
                >
                <v-list-item-title
                  >{{
                    (
                      (calcWater() * this.currentCycle.fieldArea) /
                      daysIrrigation
                    ).toFixed(2)
                  }}
                  מ"ק</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col>
            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="cyan lighten-3">fas fa-faucet</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>כמות מים שבועית לדונם:</v-list-item-title>
                <v-list-item-title
                  >{{ calcWater().toFixed(2) }} מ"ק</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>

            <v-list-item two-line>
              <v-list-item-icon>
                <v-icon color="amber darken-2">fas fa-expand</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title
                  >כמות מים שבועית לכל החלקה:</v-list-item-title
                >
                <v-list-item-title
                  >{{
                    (calcWater() * this.currentCycle.fieldArea).toFixed(2)
                  }}
                  מ"ק</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn block @click="dialog = false" color="success">חזרה</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'Irrigation',
  components: {},
  data() {
    return {
      dialog: null,
      daysIrrigation: 1
    }
  },
  methods: {
    calcWater() {
      let cropId = this.currentCycle.cropId
      let crop = this.crops.find(obj => obj.id == cropId)
      let farm = this.farms.find(obj => obj.userId == this.userId)
      let station = this.stations.find(obj => obj.id == farm.weatherStation)

      let res =
        crop.irrigation[moment().isoWeek() - 1] * station.ev[moment().month()]
      return res
    }
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'currentCycle',
      'crops',
      'stations',
      'farms',
      'farmId',
      'userId'
    ])
  }
}
</script>
