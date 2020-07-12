<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="mr-7" color="light green darken-4" dark v-on="on">
     מחזור תרנגולת חדש
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הזנת פרטי מחזור
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          
          
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
      ChickenId: null,
      coopId: null,
      selectedchickCycle: null,
      quantity: null,
      startDate: new Date().toISOString().substr(0, 10),
      nameRules: [v => !!v || 'אנא הכנס שם שדה'],
      sizeRules: [v => !!v || 'אנא הזן גודל שדה'],
      dialog: null,
      dateMenu: false,
      valid: false,
      loading: false
    }
  },

  created() {},

  methods: {
    

    getChickensId() {
      this.$store.commit('updateselectedchickCycle', this.selectedchickCycle)
    },

    //push data to firebase if form is valid, close dialog
    submit() {
      if (this.$refs.form.validate()) {
        this.setStartDate()
        this.loading = true
        var newCycle = {
          id: fb.coop.doc().id,
          name: this.coopName,
          quantity: this.quantity,
          farmId: this.farmId
        }

       // this.$store.commit('addNewField', newCycle)
        this.$store.commit('addchickCycle', newCycle)
        //console.log(this.fields.find(x => x.id == this.tempFieldId))

        this.loading = false
        this.dialog = false
      }
    },
    setStartDate() {
      this.$store.commit('setStartDate', this.startDate)
    }
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId', 'farmId', 'Chickens', 'coop', 'chickCycle']),

    formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    }
  }
}
</script>
