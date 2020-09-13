<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        class="mt-6 white--text"
        color="light green"
        v-on="on"
        @click="
          createEggData()
          createSparklineLists()
        "
      >
        הטלה<v-icon right>fas fa-egg</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title> הטלה </v-card-title>
      <v-card-text>
        <v-btn text class="ma-2" color="success" @click="addEggs = true"
          >הוסף רישום הטלה
        </v-btn>
        <v-form class="px-3" ref="form" v-if="addEggs">
          <v-row>
            <v-col>
              <v-text-field
                v-model="eggAmount"
                label="כמות ביצים יומית"
                suffix="תבניות"
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
                    label="תאריך"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="he-il"
                  v-model="entryDate"
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
                addEntry()
                addEggs = false
              "
              >הוסף</v-btn
            >
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>
      <v-sheet
        class="v-sheet--offset mx-auto"
        color="teal lighten-2"
        elevation="12"
        max-width="600"
      >
        <v-sparkline
          :labels="eggDataLables"
          :value="eggDataValues"
          color="white"
          auto-draw
          :smooth="10"
          line-width="2"
          padding="25"
        ></v-sparkline>
      </v-sheet>

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
        :items="eggDataList"
        hide-default-footer
        :page.sync="page"
        :items-per-page="itemsPerPage"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template slot="no-data">
          <p class="text-right">אין נתוני הטלה.</p>
        </template>
        <template v-slot:item.dailyEggs="{ item }">
          <v-chip class="teal darken-2" dark>{{ item.dailyEggs }}</v-chip>
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
  name: 'Eggs',
  components: {},
  data() {
    return {
      addEggs: false,
      eggAmount: null,
      dateMenu: false,
      entryDate: new Date().toISOString().substr(0, 10),
      dialog: null,
      eggDataList: [],
      eggDataLables: [],
      eggDataValues: [],
      headers: [
        {
          text: 'תאריך',
          align: 'start',
          value: 'date',
        },
        { text: 'כמות תבניות', value: 'dailyEggs' },
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
    addEntry() {
      var DateData = this.cycleData.find(
        (item) => item.date == moment(Date.parse(this.entryDate)).format('L')
      )
      if (!DateData) {
        fb.cycleData
          .doc()
          .set({
            cycleId: this.currentChickCycle.id,
            dailyEggs: this.eggAmount,
            dailyDeath: null,
            foodFill: null,
            date: moment(Date.parse(this.entryDate)).format('L'),
          })
          .then(() => this.createEggData())
          .then(() => this.createSparklineLists())
      } else {
        var currentCycleDataId = this.cycleData.find(
          (item) => item.date == moment(Date.parse(this.entryDate)).format('L')
        ).id
        fb.cycleData
          .doc(currentCycleDataId)
          .update({
            dailyEggs: this.eggAmount,
          })
          .then(() => this.createEggData())
          .then(() => this.createSparklineLists())
      }
    },

    //create a list contains only needed data for this component, sorted by date
    createEggData() {
      let tempEggDataList = this.cycleData.filter(
        (item) => item.dailyEggs != null
      )
      this.eggDataList = tempEggDataList.sort(
        (a, b) => moment(a.date, 'DD-MM-YYYY') - moment(b.date, 'DD-MM-YYYY')
      )
    },

    //create values and lables for the sparkline component (graph), get only 7 last values using slice
    createSparklineLists() {
      let filteredEggDataList = this.eggDataList.slice(
        Math.max(this.eggDataList.length - 6, 0)
      )

      this.eggDataLables = []
      this.eggDataValues = []
      filteredEggDataList.forEach((item) => {
        this.eggDataLables.push(item.date)
        this.eggDataValues.push(parseInt(item.dailyEggs))
      })
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'currentUser',
      'Chickens',
      'currentChickCycle',
      'cycleData',
      'Chickens',
    ]),
    formattedDate() {
      return this.entryDate ? moment(this.entryDate).format('L') : ''
    },
  },
}
</script>
