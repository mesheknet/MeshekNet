
 <template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mt-6 white--text" color="light green" v-on="on">
       מחלות<v-icon right>&#x2622;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
       מחלות
      </v-card-title>

      <v-card-text>
 <v-btn text class="ma-2" color="success" @click="addDiseaseChicken = true"
          >הוסף מחלה</v-btn
        >

        <v-form class="px-3" ref="form" v-if="addDiseaseChicken">
        
         
         
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :loading="loading"
          block
          @click="
            addPesticide = false
            addPest = false
            addPimplement()
          "
          color="success"
          >הוסף מחלה </v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

const fb = require('@/fb.js')
import { mapGetters } from 'vuex'

export default {
  name: 'Drug',
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
      addDiseaseChicken:false,
      DrugName: null,
      dateMenu: false,
      dosage: null,
      vol: null
    }
  },
  methods: {
    addNewPesticide() {
      let ref = fb.pesticide.doc()
      ref
        .set({
          name: this.pesticideName,
          supplier: this.supplierName,
          id: ref.id
        })
        .then(
          (this.selectedPesticide = this.pesticides.find(
            obj => obj.id == ref.id
          ))
        )
        .then((this.addPesticide = false))
    },

    addNewPest() {
      let ref = fb.pest.doc()
      ref
        .set({ name: this.pestName, id: ref.id })
        .then((this.selectedPest = this.pests.find(obj => obj.id == ref.id)))
        .then((this.addPest = false))
    },
    addPimplement() {
      this.loading = true
      let ref = fb.pImplement.doc()
      ref
        .set({
          cropId: this.selectedCrop.id,
          pestId: this.selectedPest.id,
          pestName: this.selectedPest.name,
          pesticideId: this.selectedPesticide.id,
          pesticideName: this.selectedPesticide.name,
          pesticideSupplier: this.selectedPesticide.supplier,
          dosage: this.dosage,
          vol: this.vol
        })
        .then(
          (this.loading = false),
          (this.dialog = false),
          this.$refs.form.reset()
        )
    },
    deletePest() {
      fb.pest.doc(this.selectedPest.id).delete()
    },
    deletePesticide() {
      fb.pesticide.doc(this.selectedPesticide.id).delete()
    }
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['drug', 'treatType', 'disease', 'treatment'])
  }
}
</script>