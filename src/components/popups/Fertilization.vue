<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        class="mt-6 white--text"
        color="light green"
        @click="createFertList()"
        v-on="on"
      >
        דישון<v-icon right>&#x1F69C;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        דישון
      </v-card-title>

      <v-card-text>
        <h6>דשנים וכמות מומלצת מופיעים בטבלה שלהלן:</h6>

        <v-data-table
          :headers="headers"
          :items="fertList"
          hide-default-footer
          class="elevation-1"
        >
          <template slot="no-data">
            <p class="text-right  ">השבוע אין צורך בדישון.</p>
          </template>
          <template v-slot:item.calcDosage="{ item }">
            <v-chip class="teal darken-2" dark>{{ item.calcDosage }}</v-chip>
          </template>
        </v-data-table>
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
  name: 'Fertilization',
  components: {},
  data() {
    return {
      dialog: null,
      fertList: [],
      currentFerts: [],
      currentCrop: null,
      headers: [
        {
          text: 'שם הדשן',
          align: 'start',
          value: 'name'
        },
        { text: 'יצרן', value: 'supplier' },
        { text: 'כמות (ק"ג לדונם לשבוע)', value: 'dosage' },
        { text: 'כמות לכל החלקה (ק"ג לדונם לשבוע)', value: 'calcDosage' }
      ]
    }
  },
  methods: {
    //get only fertilizers relevant for this crop
    getCurrentFerts() {
      this.crops.forEach(obj => {
        let fert = this.ferts.find(item => obj.fertilization[item.type])
        this.currentFerts.push(fert)
      })
      console.log(this.currentFerts)
    },

    getCurrentCrop() {
      this.currentCrop = this.crops.find(
        obj => obj.id == this.currentCycle.cropId
      )
    },

    createFertList() {
      this.getCurrentCrop()
      this.fertList = []
      this.ferts.forEach(obj => {
        if (this.currentCrop.fertilization[obj.type][moment().isoWeek() - 2]) {
          this.fertList.push({
            name: obj.name,
            supplier: obj.supplier,
            dosage: this.currentCrop.fertilization[obj.type][
              moment().isoWeek() - 2
            ],
            calcDosage:
              this.currentCrop.fertilization[obj.type][moment().isoWeek() - 2] *
              parseInt(this.currentCycle.fieldArea)
          })
        }
      })
    }
  },
  mounted() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['currentCycle', 'crops', 'ferts'])
  }
}
</script>
