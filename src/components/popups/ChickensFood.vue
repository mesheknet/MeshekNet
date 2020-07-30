<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        class="white--text"
        color="light green"
        v-on="on"
        @click="
          calcFood()
          createFoodData()
        "
      >
        מזון<v-icon right>fas fa-carrot</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        מזון
      </v-card-title>

      <v-card-text>
        <h5>הערכת כמות מזון במיכל: {{ getCurrentFood() }} קילוגרם</h5>
        <h5>מילוי נדרש בעוד {{ this.remainingFoodDays }} ימים בקירוב</h5>

        <v-btn text class="ma-2" color="success" @click="addFill = true"
          >הוסף מילוי אחרון
        </v-btn>
        <v-form class="px-3" ref="form" v-if="addFill">
          <v-row>
            <v-col>
              <v-text-field
                v-model="lastFill"
                label="כמות מזון"
                suffix="קילוגרם"
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
                addFill = false
              "
              >הוסף</v-btn
            >
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="חיפוש"
        single-line
        hide-details
        class="mb-4"
      ></v-text-field>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="foodDataList"
        hide-default-footer
        :page.sync="page"
        :items-per-page="itemsPerPage"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template slot="no-data">
          <p class="text-right">אין נתוני מילוי תערובת.</p>
        </template>
        <template v-slot:item.foodFill="{ item }">
          <v-chip class="teal darken-2" dark>{{ item.foodFill }}</v-chip>
        </template>
      </v-data-table>
      <div class="text-center pt-2">
        <v-pagination
          :next-icon="nextIcon"
          :prev-icon="prevIcon"
          v-model="page"
          :length="pageCount"
          color="teal darken-3"
        ></v-pagination>
      </div>
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
      addFill: false,
      lastFill: null,
      fillDate: new Date().toISOString().substr(0, 10),
      foodDataList: [],
      headers: [
        {
          text: 'תאריך מילוי',
          align: 'start',
          value: 'date',
        },
        { text: 'כמות ק"ג', value: 'foodFill' },
      ],
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      nextIcon: 'navigate_next',
      prevIcon: 'navigate_before',
    }
  },
  methods: {
    calcFood() {
      let dailyFood = parseFloat(
        this.Chickens.find((item) => item.id == this.currentChickCycle.chickId)
          .DayAverageFood
      )

      //calc remainig days till next fill
      this.remainingFoodDays = (
        parseInt(this.getCurrentFood()) /
        (parseInt(this.currentChickCycle.currentChickens) * dailyFood)
      ).toFixed(0)

      //update currentFood based on time passed since last login
      let lastLogin = moment(this.currentUser[0].lastLogin, 'DD/MM/YYYY')
      let daysFromLastLogin = moment().diff(lastLogin, 'days')

      let foodToReduce =
        dailyFood * this.currentChickCycle.currentChickens * daysFromLastLogin

      //in case of multiple logins in one day, do not reduce the food from currentFood

      if (this.getCurrentFood() - foodToReduce < 0) {
        fb.chickCycle.doc(this.currentChickCycle.id).update({
          currentFood: 0,
        })
      } else {
        fb.chickCycle.doc(this.currentChickCycle.id).update({
          currentFood: parseInt(this.getCurrentFood() - foodToReduce).toFixed(
            0
          ),
        })
      }

      //reset days from last login to 0 to avoid multiple calculations
      this.updateLoginData()
    },

    //add silo fill record to daily data, if not exist -> create new daily data object
    addNewFill() {
      //add last fill to total amount of food

      fb.chickCycle
        .doc(this.currentChickCycle.id)
        .update({
          currentFood:
            parseInt(this.currentChickCycle.currentFood) +
            parseInt(this.lastFill),
        })
        .then(() => {
          var fillDateData = this.cycleData.find(
            (item) => item.date == moment(Date.parse(this.fillDate)).format('L')
          )
          if (!fillDateData) {
            fb.cycleData
              .doc()
              .set({
                cycleId: this.currentChickCycle.id,
                dailyEggs: null,
                dailyDeath: null,
                foodFill: this.lastFill,
                date: moment(Date.parse(this.fillDate)).format('L'),
              })
              .then(() => this.createFoodData())
          } else {
            var currentCycleDataId = this.cycleData.find(
              (item) =>
                item.date == moment(Date.parse(this.fillDate)).format('L')
            ).id
            fb.cycleData
              .doc(currentCycleDataId)
              .update({
                foodFill: this.lastFill,
              })
              .then(() => this.createFoodData())
          }
        })
    },

    updateLoginData() {
      fb.user.doc(this.currentUser[0].email).update({
        lastLogin: moment().format('L'),
        currentLogin: moment().format('L'),
      })
    },
    getCurrentFood() {
      return this.chickCycle.find(
        (item) => item.id == this.currentChickCycle.id
      ).currentFood
    },

    //create a list contains only needed data for this component
    createFoodData() {
      let tempFoodDataList = this.cycleData.filter(
        (item) => item.foodFill != null
      )
      this.foodDataList = tempFoodDataList.sort(
        (a, b) => moment(a.date, 'DD-MM-YYYY') - moment(b.date, 'DD-MM-YYYY')
      )
    },
  },
  loaded() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'currentUser',
      'coop',
      'Chickens',
      'currentChickCycle',
      'chickCycle',
      'cycleData',
      'Chickens',
    ]),
    formattedDate() {
      return this.fillDate ? moment(this.fillDate).format('L') : ''
    },
  },
}
</script>
