<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-auto white--text" color="light green" v-on="on">
        הודעות<v-icon right>fas fa-briefcase-medical</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הודעות
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
         
            <v-expansion-panels focusable>
    <v-expansion-panel
      v-for="(item,i) in 5"
      :key="i"
    >
      <v-expansion-panel-header>Item</v-expansion-panel-header>
      <v-expansion-panel-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>  
             
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
const fb = require('@/fb.js')
import { mapGetters } from 'vuex'

export default {
  name: 'AdminMesseg',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
      addDisease: false,
      addTypeTreatment: false,
      addTreatment: false,
      addDrug: false,
      selectedDisease: null,
      DiseasName: null,
      selectedTypeTreatment: null,
      TypeTreatmentName: null,
      selectedTreatment: null,
      TreatmentName: null,
      selectedDrug: null,
      addDiseaseChicken: false,
      DrugName: null,
      DrugSupplier: null,
      DrugQuantity: null,
      dateMenu: false,
      dosage: null,
      vol: null,
    }
  },
  methods: {
    getDisease() {
      this.$store.commit('updateSelectedDisease', this.selectedDisease)
    },

    getTypeTreatment() {
      this.$store.commit(
        'updateSelectedTypeTreatment',
        this.selectedTypeTreatment
      )
    },

    getDrug() {
      this.$store.commit('updateSelectedDrug', this.selectedDrug)
    },

    addNewDisease() {
      var NewDisease = {
        id: fb.disease.doc().id,
        name: this.DiseasName,
      }
      this.$store.commit('NewDisease', NewDisease),
        (this.selectedDisease = NewDisease)
      this.$store.commit('updateSelectedDisease', this.selectedDisease)
    },
    addNewTypeTreatment() {
      var NewTypeTreatment = {
        id: fb.treatType.doc().id,
        name: this.TypeTreatmentName,
      }
      this.$store.commit('NewTypeTreatment', NewTypeTreatment),
        (this.selectedTypeTreatment = NewTypeTreatment)
      this.$store.commit(
        'updateSelectedTypeTreatment',
        this.selectedTypeTreatment
      )
    },
    addNewDrug() {
      var NewDrug = {
        id: fb.drug.doc().id,
        name: this.DrugName,
        Quantity: this.DrugQuantity,
        Supplier: this.DrugSupplier,
      }
      this.$store.commit('NewDrug', NewDrug), (this.selectedDrug = NewDrug)
      this.$store.commit('updateSelectedDrug', this.selectedDrug)
    },
    addNewTreatment() {
      var NewTreatment = {
        id: fb.treatment.doc().id,
        name: this.TreatmentName,
      }
      this.$store.commit('NewTreatment', NewTreatment)
    },
    deleteDisease() {
      fb.disease.doc(this.selectedDisease.id).delete()
    },
    deleteTypeTreatment() {
      fb.treatType.doc(this.selectedTypeTreatment.id).delete()
    },
    deleteDrug() {
      fb.drug.doc(this.selectedDrug.id).delete()
    },
  },

  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['drug', 'treatType', 'disease', 'treatment']),
  },
}
</script>