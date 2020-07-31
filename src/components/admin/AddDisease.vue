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
 

        <v-form class="px-3" ref="form">
        
          <v-row>
            <v-col>
              <v-select
                v-model="selectedDisease"
                :items="disease"
                label="בחר או הוסף מחלה"
                @input="getDisease"
                item-text="name"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addDisease = true"
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
                v-if="selectedDisease"
                @click="deleteDisease"
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
          <v-row v-if="addDisease">
            <v-col>
              <v-text-field label="שם המחלה" v-model="DiseasName"></v-text-field>
            </v-col>

            <v-col>
              <v-btn text @click="addNewDisease()" class="ma-2" color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="selectedTypeTreatment"
                :items="treatType"
                label="בחר או הוסף סוג טיפול"
                item-text="name"
                @input="getTypeTreatment"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addTypeTreatment = true"
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
                v-if="selectedTypeTreatment"
                @click="deleteTypeTreatment"
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
          <v-row v-if="addTypeTreatment">
            <v-col>
              <v-text-field
                label="סוג טיפול"
                v-model="TypeTreatmentName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-btn
                text
                @click="addNewTypeTreatment()"
                class="ma-2"
                color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>
          
            <v-row>
            <v-col>
              <v-select
                v-model="selectedDrug"
                :items="drug"
                label="בחר או הוסף תרופה"
                item-text="name"
                @input="getDrug"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addDrug = true"
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
                v-if="selectedDrug"
                @click="deleteDrug"
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
          <v-row v-if="addDrug">
            <v-col>
              <v-text-field label="שם התרופה" v-model="DrugName"></v-text-field>
              
            </v-col>
            <v-col>
              <v-text-field label="ספק" v-model="DrugSupplier"></v-text-field>
              
            </v-col>
            <v-col>
              <v-text-field label="מינון" v-model="DrugQuantity"></v-text-field>
              
            </v-col>
            <v-col>
              <v-btn text @click="addNewDrug()" class="ma-2" color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
          <v-col>
              <v-text-field label="תאור הטיפול" v-model="TreatmentName"></v-text-field>
            </v-col>
          </v-row>
         
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :loading="loading"
          block
          
          @click="
            addNewTreatment()
            dialog = false
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
  name: 'AddDisease',
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
      DrugSupplier: null,
      DrugQuantity: null,
      dateMenu: false,
      dosage: null,
      vol: null
    }
  },
  methods: {
     getDisease() {
      this.$store.commit('updateSelectedDisease', this.selectedDisease)
    },

     getTypeTreatment() {
      this.$store.commit('updateSelectedTypeTreatment', this.selectedTypeTreatment)
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
        this.$store.commit('updateSelectedTypeTreatment', this.selectedTypeTreatment)
    },
    addNewDrug() {
      var NewDrug = {
        id: fb.drug.doc().id,
        name: this.DrugName,
        Quantity:this.DrugQuantity,
        Supplier:this.DrugSupplier

      }
      this.$store.commit('NewDrug', NewDrug),
        (this.selectedDrug = NewDrug)
        this.$store.commit('updateSelectedDrug', this.selectedDrug)
        
    },
    addNewTreatment() {
      var NewTreatment = {
        id: fb.treatment.doc().id,
        name: this.TreatmentName,
      }
      this.$store.commit('NewTreatment', NewTreatment)
       
    },
    deleteDisease(){
      fb.disease.doc(this.selectedDisease.id).delete()
    },
     deleteTypeTreatment(){
      fb.treatType.doc(this.selectedTypeTreatment.id).delete()
    },
     deleteDrug(){
      fb.drug.doc(this.selectedDrug.id).delete()
    }
  },

  
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['drug', 'treatType', 'disease', 'treatment'])
  }
}
</script>