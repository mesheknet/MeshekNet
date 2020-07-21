 <template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mt-6 white--text" color="light green" v-on="on">
    עריכת תרגנגולות<v-icon right>&#x2622;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
       עריכת תרגנגולות
      </v-card-title>

        
          <v-row>
            <v-col>
              <v-select
                v-model="selectChicken"
                :items="Chickens"
                label="בחר סוג תרנגולת או הוסף חדש"
                item-text="name"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addChicken = true"
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
                v-if="selectChicken"
                @click="deleteChicken"
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
          <v-row v-if="addChicken">
            <v-col>
              <v-text-field label="כמות ביצים ממצועת" v-model="EggsAvg"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="כמות צריכת אוכל ממצועת" v-model="FoodAvg"></v-text-field>
            </v-col>

            <v-col>
              <v-btn text @click="addNewChicken()" class="ma-2" color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>





      

      <v-card-actions>
        <v-btn
          :loading="loading"
          block
          @click="
            addPest = false
            addPimplement()
          "
          color="success"
          >הוסף סוג תרנגולת</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'EditChickenType',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
      addChicken: false,
      EggsAvg: null,
      FoodAvg: null,
      selectChicken: null,
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
    ...mapGetters(['Chickens'])
  }
}
</script>
