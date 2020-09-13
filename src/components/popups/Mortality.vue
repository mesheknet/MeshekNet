<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        class="mt-6 white--text"
        color="light green"
        v-on="on"
        @click="
          createDeathData()
          createSparklineLists()
        "
      >
        תמותה<v-icon right>fas fa-book-dead</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title> תמותה </v-card-title>
      <v-card-text>
        <v-btn text class="ma-2" color="success" @click="addDeath = true"
          >הוסף רישום תמותה
        </v-btn>
        <v-form class="px-3" ref="form" v-if="addDeath">
          <v-row>
            <v-col>
              <v-text-field
                v-model="deathAmount"
                label="תמותה יומית"
                suffix="תרנגולות"
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
                addDeath = false
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
          :labels="deathDataLables"
          :value="deathDataValues"
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
        :items="deathDataList"
        hide-default-footer
        :page.sync="page"
        :items-per-page="itemsPerPage"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template slot="no-data">
          <p class="text-right">אין נתוני תמותה.</p>
        </template>
        <template v-slot:item.dailyDeath="{ item }">
          <v-chip class="orange darken-2" dark>{{ item.dailyDeath }}</v-chip>
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
  name: 'Mortality',
  components: {},
  data() {
    return {
      addDeath: false,
      deathAmount: null,
      dateMenu: false,
      entryDate: new Date().toISOString().substr(0, 10),
      dialog: null,
      deathDataList: [],
      deathDataLables: [],
      deathDataValues: [],
      headers: [
        {
          text: 'תאריך',
          align: 'start',
          value: 'date',
        },
        { text: 'תמותה', value: 'dailyDeath' },
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
    //add new daily death to the database, and reduce from currentChickens amount in chickCycle
    addEntry() {
      fb.chickCycle.doc(this.currentChickCycle.id).update({
        currentChickens:
          parseInt(this.currentChickCycle.currentChickens) -
          parseInt(this.deathAmount),
      })
      var DateData = this.cycleData.find(
        (item) => item.date == moment(Date.parse(this.entryDate)).format('L')
      )
      if (!DateData) {
        fb.cycleData
          .doc()
          .set({
            cycleId: this.currentChickCycle.id,
            dailyEggs: null,
            dailyDeath: this.deathAmount,
            foodFill: null,
            date: moment(Date.parse(this.entryDate)).format('L'),
          })
          .then(() => this.createDeathData())
          .then(() => this.createSparklineLists())
      } else {
        var currentCycleDataId = this.cycleData.find(
          (item) => item.date == moment(Date.parse(this.entryDate)).format('L')
        ).id
        fb.cycleData
          .doc(currentCycleDataId)
          .update({
            dailyDeath: this.deathAmount,
          })
          .then(() => this.createDeathData())
          .then(() => this.createSparklineLists())
      }
    },

    //create a list contains only needed data for this component, sorted by date
    createDeathData() {
      let tempDeathDataList = this.cycleData.filter(
        (item) => item.dailyDeath != null
      )
      this.deathDataList = tempDeathDataList.sort(
        (a, b) => moment(a.date, 'DD-MM-YYYY') - moment(b.date, 'DD-MM-YYYY')
      )
    },

    //create values and lables for the sparkline component (graph), get only 7 last values using slice
    createSparklineLists() {
      let filteredDeathDataList = this.deathDataList.slice(
        Math.max(this.deathDataList.length - 6, 0)
      )
      this.deathDataLables = []
      this.deathDataValues = []
      filteredDeathDataList.forEach((item) => {
        this.deathDataLables.push(item.date)
        this.deathDataValues.push(parseInt(item.dailyDeath))
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
