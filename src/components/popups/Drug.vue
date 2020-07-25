
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
        
          <v-row>
            <v-col>
              <v-select
                v-model="selectedDisease"
                :items="pests"
                label="בחר או הוסף מחלה"
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
                :items="pesticides"
                label="בחר או הוסף סוג טיפול"
                item-text="name"
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
                @click="TypeTreatment()"
                class="ma-2"
                color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="selectedTreatment"
                :items="pests"
                label="בחר טיפול או הוסף חדש"
                item-text="name"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addTreatment = true"
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
                v-if="selectedTreatment"
                @click="deleteTreatment"
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
          <v-row v-if="addTreatment">
            <v-col>
              <v-text-field label="תאור הטיפול" v-model="TreatmentName"></v-text-field>
            </v-col>

            <v-col>
              <v-btn text @click="addNewTreatment()" class="ma-2" color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>
            <v-row>
            <v-col>
              <v-select
                v-model="selectedDrug"
                :items="pests"
                label="בחר או הוסף תרופה"
                item-text="name"
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
              <v-btn text @click="addNewDrug()" class="ma-2" color="success"
                >הוסף</v-btn
              >
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
                label="תאריך התחלת מחלה"
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
    ...mapGetters(['pests', 'pesticides', 'pImplement', 'crops'])
  }
}
</script>