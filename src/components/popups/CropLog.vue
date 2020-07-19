
<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mt-6 white--text" color="light green" v-on="on">
        יומן גידול<v-icon right>&#x1F4D6;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        יומן גידול
      </v-card-title>

      <v-card-text>
        <v-btn text class="ma-2" color="success" @click="addAct = true"
          >הוסף פעולה ליומן</v-btn
        >
        <v-form class="px-3" ref="form" v-if="addAct">
          <v-row>
            <v-col>
              <v-text-field label="שם הפעולה" v-model="logName"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="מבצע הפעולה" v-model="actor"></v-text-field>
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
                    label="תאריך ביצוע הפעולה"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="he-il"
                  v-model="logDate"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col>
              <v-text-field label="הערות" v-model="logNotes"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              text
              class="ma-2"
              color="success"
              @click="
                addNewAct()
                addAct = false
              "
              >הוסף</v-btn
            >
          </v-row>
        </v-form>

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
          :items="logList"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          class="elevation-1"
          @page-count="pageCount = $event"
        >
          <template slot="no-data">
            <p class="text-right  ">
              יומן הגידול ריק. תוכל להוסיף פעילות בקלות
            </p>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              small
              @click="
                deleteLog(item)
                getCycleLogs()
              "
            >
              delete
            </v-icon>
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
  name: 'CropLog',
  components: {},
  data() {
    return {
      dialog: null,
      headers: [
        {
          text: 'שם הפעולה',
          align: 'start',
          value: 'logName'
        },
        { text: 'מבצע הפעולה', value: 'actor' },
        { text: 'תאריך ביצוע', value: 'logDate' },
        { text: 'הערות', value: 'logNotes' },
        { text: 'מחיקה', value: 'actions' }
      ],
      search: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 5,
      nextIcon: 'navigate_next',
      prevIcon: 'navigate_before',
      logName: null,
      actor: null,
      logDate: new Date().toISOString().substr(0, 10),
      logNotes: null,
      dateMenu: false,
      logList: [],
      addAct: false
    }
  },
  methods: {
    addNewAct() {
      fb.cropLog
        .doc()
        .set({
          cycleId: this.currentCycle.id,
          logName: this.logName,
          actor: this.actor,
          logDate: this.logDate,
          logNotes: this.logNotes
        })
        .then(this.$refs.form.reset())
        .then(this.getCycleLogs)
    },
    getCycleLogs() {
      this.logList = []
      let tempList = this.cropLog.filter(
        obj => obj.cycleId == this.currentCycle.id
      )
      tempList.forEach(item => {
        this.logList.push({
          id: item.id,
          logName: item.logName,
          actor: item.actor,
          logDate: moment(item.logDate).format('L'),
          logNotes: item.logNotes
        })
      })
    },
    deleteLog(item) {
      fb.cropLog
        .doc(item.id)
        .delete()
        .then(this.getCycleLogs())
    }
  },
  created() {
    this.getCycleLogs()
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['farmId', 'currentCycle', 'cropLog']),

    formattedDate() {
      return this.logDate ? moment(this.logDate).format('L') : ''
    }
  }
}
</script>
