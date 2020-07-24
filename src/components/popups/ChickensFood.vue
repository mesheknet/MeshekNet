<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        class="mt-6 white--text"
        color="light green"
        v-on="on"
        @click="
          updateCurrentCycleData()
          updateCurrentCycle()
          calcFood()
        "
      >
        מזון<v-icon right>fas fa-carrot</v-icon>
      </v-btn>
    </template>

    <v-card v-if="this.currentChickCycle">
      <v-card-title class="green lighten-3" primary-title>
        מזון
      </v-card-title>

      <v-card-text>
        <h5>
          כמות תערובת נוכחית: {{ this.currentChickCycle.currentFood }} קילוגרם
        </h5>
        <h5>כמות זו תספיק לעוד {{ this.remainingFoodDays }} ימים</h5>

        <v-btn text class="ma-2" color="success" @click="addFill = true"
          >הוסף מילוי אחרון
        </v-btn>
        <v-form class="px-3" ref="form" v-if="addFill">
          <v-row>
            <v-col>
              <v-text-field
                label="כמות מזון"
                suffix="קילוגרם"
                v-model="lastFill"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    prepend-icon="date_range"
                    :value="formattedDate"
                    label="תאריך מילוי "
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="he-il"
                  v-model="fillDate"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              text
              class="ma-2"
              color="success"
              @click="
                addNewFill()
                calcFood()
                addFill = false
              "
              >הוסף</v-btn
            >
          </v-row>
        </v-form>
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
const fb = require('@/fb.js')

export default {
  name: 'ChickensFood',
  components: {},
  data() {
    return {
      dialog: null,
      dateMenu: false,
      remainingFoodDays: null,
      currentChickCycle: null,
      addFill: false,
      lastFill: 0,
      fillDate: new Date().toISOString().substr(0, 10),
    }
  },
  methods: {
    calcFood() {
      let dailyFood = this.Chickens.find(
        (item) => item.id == this.currentChickCycle.chickId
      ).DayAverageFood
      this.remainingFoodDays = (
        this.currentChickCycle.currentFood /
        (this.currentChickCycle.currentChickens * dailyFood)
      ).toFixed(0)
    },

    //add silo fill record to daily data, if not exist -> create new daily data object
    addNewFill() {
      //add last fill to total amount of food

      fb.chickCycle.doc(this.currentChickCycle.id).update({
        currentFood:
          parseInt(this.currentChickCycle.currentFood) +
          parseInt(this.lastFill),
      })

      let fillDateData = this.cycleData.find(
        (item) => item.date == moment(this.fillDate).format('L')
      )
      if (!fillDateData) {
        fb.cycleData.doc().set({
          cycleId: this.currentchickCycle.id,
          dailyEggs: null,
          dailyDeath: null,
          foodFill: this.lastFill,
          date: moment(this.fillDate).format('L'),
        })
      } else {
        let currentCycleDataId = this.cycleData.find(
          (item) => item.date == moment(this.fillDate).format('L')
        ).id
        fb.cycleData.doc(currentCycleDataId).update({
          foodFill: this.lastFill,
        })
      }
      this.updateCurrentCycle()
    },

    //get current cycle data using store
    updateCurrentCycleData() {
      this.$store.dispatch('bindCycleData')
    },
    //update current food in local chickCycle object
    updateCurrentCycle() {
      this.currentChickCycle = this.allchickCycle.find(
        (item) => item.id == this.currentchickCycle.id
      )
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'coop',
      'Chickens',
      'currentchickCycle',
      'chickCycle',
      'allchickCycle',
      'cycleData',
      'Chickens',
    ]),
    formattedDate() {
      return this.fillDate ? moment(this.fillDate).format('L') : ''
    },
  },
}
</script>
