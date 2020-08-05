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
          <v-row>
                <v-col  class="mr-8" >שם</v-col>
                <v-col >כותרת</v-col>
                <v-col >נושא</v-col>
                <v-col  class="mr-12">תאריך</v-col>
          </v-row>
            <v-expansion-panels focusable>
    <v-expansion-panel
      v-for="(Messages,index) in Messages"
      :key="index"
    >
   
      <v-expansion-panel-header>
        <v-col >{{setOwners()}} </v-col>
      <v-col>כותרת:  {{Messages.title}} </v-col>
                <v-col> {{Messages.subject}}</v-col>
                <v-col>{{Messages.startDate}} </v-col>
      </v-expansion-panel-header>
      
      <v-expansion-panel-content>
        <v-row>
        {{Messages.mes}}
        </v-row>
        <v-row>
         <v-col cols="4"> 
        <v-btn
                  text
                  color="primary"
                  
                >השב</v-btn>
                </v-col>
        
         <v-col cols="4"> 
        <v-btn
                  text
                  color="primary"
                  
                >מחק</v-btn>
                </v-col>
        </v-row>
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
      dosage: null,
      vol: null,
    }
  },
  created() {
        this.setDetails()
     
  },
  methods: {
    setOwners() {
     return this.ownerName = this.farmOwners.find(
        (obj) => obj.userId == this.userId
      ).name
    },
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
    ...mapGetters(['Messages',  'userId', 'farmOwners',]),
  },
}
</script>