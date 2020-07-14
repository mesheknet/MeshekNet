<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mt-6 white--text" color="light green" v-on="on">
        הדברה<v-icon right>&#x2622;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הדברה
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="selectedPest"
          :items="currentPests"
          @input="createLocalImplements()"
          label="בחר מזיק מהרשימה"
          item-text="name"
          return-object
        ></v-select>

        <v-data-table
          v-if="selectedPest"
          :headers="headers"
          :items="imps"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.calcDosage="{ item }">
            <v-chip class="teal darken-2" dark>{{ item.calcDosage }}</v-chip>
          </template>
          <template v-slot:item.calcVol="{ item }">
            <v-chip class="orange darken-2" dark>{{ item.calcVol }}</v-chip>
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

export default {
  name: 'PestCtrl',
  components: {},
  data() {
    return {
      dialog: null,
      selectedPest: null,
      currentImplements: null,
      currentPests: [],
      headers: [
        {
          text: 'שם החומר',
          align: 'start',
          value: 'name'
        },
        { text: 'יצרן', value: 'supplier' },
        { text: 'מינון (גרם לדונם)', value: 'dosage' },
        { text: 'נפח התרסיס (ליטר לדונם)', value: 'vol' },
        { text: 'מינון לכל החלקה (גרם)', value: 'calcDosage' },
        { text: 'נפח תרסיס לכל החלקה (ליטר)', value: 'calcVol' }
      ],
      imps: [],
      pestImplements: []
    }
  },
  methods: {
    getCurrentImplements() {
      this.currentImplements = this.pImplement.filter(
        obj => obj.cropId == this.currentCycle.cropId
      )
    },

    //get implements relevant for selected pest and current cropCycle
    getPestImplements() {
      this.pestImplements = this.currentImplements.filter(
        obj => obj.pestId == this.selectedPest.id
      )
    },

    //get only pests relevant for this crop
    getCurrentPests() {
      this.currentImplements.forEach(obj => {
        let pest = this.pests.find(item => item.id == obj.pestId)
        this.currentPests.push(pest)
      })
    },

    //create local implements data based on selected pest. calc dosage and vol
    createLocalImplements() {
      this.getPestImplements()
      this.imps = []
      this.pestImplements.forEach(obj => {
        this.imps.push({
          name: obj.pesticideName,
          supplier: obj.pesticideSupplier,
          dosage: obj.dosage,
          vol: obj.vol,
          calcDosage:
            parseInt(obj.dosage) * parseInt(this.currentCycle.fieldArea),
          calcVol: parseInt(obj.vol) * parseInt(this.currentCycle.fieldArea)
        })
      })
    }
  },
  mounted() {
    this.getCurrentImplements()
    this.getCurrentPests()
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'pests',
      'pesticides',
      'pImplement',
      'crops',
      'currentCycle'
    ])
  }
}
</script>
