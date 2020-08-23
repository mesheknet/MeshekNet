<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="font-weight-bold"
        color="light green darken-2"
        dark
        block
        v-on="on"
      >
        מחזור תרנגולת חדש
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הזנת פרטי מחזור
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col>
              <v-select
                v-model="selectedCoop"
                :items="coop"
                label="בחר לול או הוסף חדש"
                @input="getCoopId"
                item-text="CoopName"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addCoop = true"
                class="ma-2"
                fab
                x-small
                dark
                color="teal darken-2"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                v-if="selectedCoop"
                @click="deleteCoop"
                class="ma-2"
                fab
                x-small
                dark
                color="red darken-2"
              >
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="addCoop">
            <v-col>
              <v-text-field
                label="שם הלול"
                :rules="nameRules"
                v-model="CoopName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="גודל מקסימלי"
                v-model="MaxCapacityCoop"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-btn
                text
                @click="
                  addNewCoop()
                  addCoop = false
                "
                class="ma-2"
                color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>
          <v-select
            v-model="selectedchickCycle"
            :items="Chickens"
            label="סוג תרנגולות"
            @input="getChickensId"
            item-text="name"
            return-object
          ></v-select>
          <v-text-field
            label="כמות"
            v-model="quantity"
            :rules="sizeRules"
          ></v-text-field>
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
                label="תאריך התחלת מחזור"
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
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          block
          dark
          color="light-green darken-3"
          @click="submit"
          :loading="loading"
        >
          הוסף מחזור
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const fb = require('@/fb.js')
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'AddCycleChickens',
  data() {
    return {
      addCoop: false,
      ChickenId: null,
      selectedchickCycle: null,
      selectedCoop: null,
      CoopName: null,
      MaxCapacityCoop: null,
      quantity: null,
      startDate: new Date().toISOString().substr(0, 10),
      nameRules: [(v) => !!v || 'אנא הזן שם או מספר לול'],
      sizeRules: [(v) => !!v || 'אנא הזן כמות תרנגולות'],
      dialog: null,
      dateMenu: false,
      valid: false,
      loading: false,
    }
  },

  created() {},

  methods: {
    addNewCoop() {
      var coop = {
        id: fb.coop.doc().id,
        CoopName: this.CoopName,
        maxCapacity: this.MaxCapacityCoop,
        farmId: this.farmId,
      }
      this.$store.commit('addCoop', coop), (this.selectedCoop = coop)
      this.$store.commit('updateselectedcoop', this.selectedCoop)
    },
    getChickensId() {
      this.$store.commit('updateselectedchickCycle', this.selectedchickCycle)
    },
    getCoopId() {
      this.$store.commit('updateselectedcoop', this.selectedCoop)
    },

    deleteCoop() {
      fb.coop.doc(this.selectedCoop.id).delete()
    },
    //push data to firebase if form is valid, close dialog
    submit() {
      if (this.$refs.form.validate()) {
        this.setStartDate()
        this.loading = true
        var newCycle = {
          quantity: this.quantity,
          farmId: this.farmId,
        }

        // this.$store.commit('addNewField', newCycle)
        this.$store.commit('addchickCycle', newCycle)
        //console.log(this.fields.find(x => x.id == this.tempFieldId))

        this.loading = false
        this.dialog = false
        this.$refs.form.reset()
      }
    },
    setStartDate() {
      this.$store.commit('setStartDate', this.startDate)
    },
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId', 'farmId', 'Chickens', 'coop', 'chickCycle']),

    formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    },
  },
}
</script>
