
 <template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        class="mt-6 white--text"
        color="light green"
        v-on="on"
        @click="updateCurrentDiseases()"
      >
        מחלות<v-icon right>fas fa-briefcase-medical</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        מחלות
      </v-card-title>

      <v-card-text>
        <v-btn
          text
          class="ma-2"
          color="success"
          @click="addDiseaseChicken = true"
          >הוסף מחלה</v-btn
        >

        <v-form class="px-3" ref="form" v-if="addDiseaseChicken">
          <v-row>
            <v-col>
              <v-select
                v-model="selectedTret"
                :items="treatment"
                label="בחר מחלה"
                item-text="nameDisease"
                @input="getChickensId"
                return-object
              ></v-select>
            </v-col>
              <v-col v-if="this.selectedTret">
                תרופה מומלצת:
                 <v-text-field
                  
                 v-text="this.selectedTret.nameDrug"
               
                readonly
              ></v-text-field>
            </v-col>
              <v-col v-if="this.selectedTret">
                מינון מומלצת:
                 <v-text-field
                
                v-text="this.selectedTret.DrugQuantity"
                
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field 
                label="הערות"
                v-model="DescriptionTret"
              ></v-text-field>
            </v-col>
          </v-row>
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
                label="תאריך התחלת טיפול"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="he-il"
              v-model="startDate"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              :loading="loading"
              block
              @click="addDiseasesCycle()"
              color="success"
              >הוסף מחלה
            </v-btn>
          </v-card-actions>
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
        :items="DiseasechickCycle"
        hide-default-footer
        :page.sync="page"
        :items-per-page="itemsPerPage"
        class="elevation-1"
        @page-count="pageCount = $event"
      >
        <template slot="no-data">
          <p class="text-right">אין נתוני מחלות למחזור זה</p>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteDiseases(item)">
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
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn block @click="dialog = false" color="success">חזרה</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const fb = require('@/fb.js')
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'Diseases',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
      startDate: new Date().toISOString().substr(0, 10),
      selectedTret: null,
      DescriptionTret: null,
      addDiseaseChicken: false,
      dateMenu: false,
      dosage: null,
      vol: null,
      headers: [
        {
          text: 'תאריך טיפול',
          align: 'start',
          value: 'startDate',
        },
        { text: 'שם מחלה', value: 'nameDisease' },
        { text: 'שם תרופה', value: 'nameDrug' },
        { text: 'מינון', value: 'DrugQuantity' },
        { text: 'סוג טיפול', value: 'nameTypeTreatment' },
        { text: 'שם ספק', value: 'NameDrugSupplier' },
        { text: 'מחיקה', value: 'actions' },
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
     setStartDate() {
      this.$store.commit('setStartDate', this.startDate)
    },
    updateCurrentDiseases() {
      this.$store.dispatch('bindDiseasechickCycle')
    },
    getChickensId() {
      this.$store.commit('updateselectedTret', this.selectedTret)
    },
    addDiseasesCycle() {
      this.setStartDate()
      var DiseasesCycle = {
        id: fb.treatment.doc().id,
        Description: this.DescriptionTret,
      }
      this.$store.commit('addDiseasesCycle', DiseasesCycle)
    },
    deleteDiseases(item) {
      fb.DiseasechickCycle.doc(item.id).delete()
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'DiseasechickCycle',
      'currentCycle',
      'treatment',
      'currentchickCycle',
      'DiseasechickCycle',
    ]),
     formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    }
  },
}
</script>