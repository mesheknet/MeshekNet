 <template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mt-6 white--text" color="light green" v-on="on">
        עריכת יישומי הדברה<v-icon right>&#x2622;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        עריכת יישומי הדברה
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-select
            v-model="selectedCrop"
            :items="crops"
            label="בחר גידול"
            item-text="name"
            return-object
          ></v-select>
          <v-row>
            <v-col>
              <v-select
                v-model="selectedPesticide"
                :items="pesticides"
                label="בחר חומר הדברה או הוסף חדש"
                item-text="name"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addPesticide = true"
                class="ma-2"
                fab
                x-small
                dark
                color="teal darken-2"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="addPesticide">
            <v-col>
              <v-text-field
                label="שם החומר"
                v-model="pesticideName"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="שם היצרן"
                v-model="supplierName"
              ></v-text-field
            ></v-col>
            <v-col>
              <v-btn
                text
                @click="addNewPesticide()"
                class="ma-2"
                color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                v-model="selectedPest"
                :items="pests"
                label="בחר מזיק או הוסף חדש"
                item-text="name"
                return-object
              ></v-select>
            </v-col>
            <v-col>
              <v-btn
                @click="addPest = true"
                class="ma-2"
                fab
                x-small
                dark
                color="teal darken-2"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="addPest">
            <v-col>
              <v-text-field label="שם המזיק" v-model="pestName"></v-text-field>
            </v-col>

            <v-col>
              <v-btn text @click="addNewPest()" class="ma-2" color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                suffix="גרם לדונם"
                label="מינון"
                v-model="dosage"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                suffix="ליטר לדונם"
                label="נפח התרסיס"
                v-model="vol"
              ></v-text-field>
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
            addPesticide = false
            addPest = false
            addPimplement()
          "
          color="success"
          >הוסף יישום הדברה</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'EditPestCtrl',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
      addPesticide: false,
      addPest: false,
      pesticideName: null,
      supplierName: null,
      pestName: null,
      selectedPesticide: null,
      selectedCrop: null,
      selectedPest: null,
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
          pesticideId: this.selectedPesticide.id,
          dosage: this.dosage,
          vol: this.vol
        })
        .then((this.loading = false), (this.dialog = false))
    }
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['pests', 'pesticides', 'pImplement', 'crops'])
  }
}
</script>
