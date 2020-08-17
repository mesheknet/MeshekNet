 <template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="mx-auto white--text"
        color="light green"
        v-on="on"
        min-width="200"
      >
        הוספת נתוני גידולים<v-icon right>fas fa-seedling</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הוספת נתוני גידולים
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-row>
            <v-col>
              <v-text-field v-model="cropName" label="שם הגידול"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="cropDuration"
                label="משך המחזור"
                suffix="שבועות"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="fertNitrogen"
                label="דישון חנקן"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="fertPhosphorus"
                label="דישון זרחן"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="fertPotassium"
                label="דישון אשלגן"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="fertUrean"
                label="דישון אוריאה"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="irrigation13"
                label="השקיה - תבור-כדורי"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="irrigation28"
                label="השקיה - ניר העמק עפולה"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="irrigation48"
                label="השקיה - בית הערבה"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="irrigation54"
                label="השקיה - בית דגן"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn text class="ma-2" color="success" @click="addCropData()"
              >הוסף</v-btn
            >
          </v-row>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          :loading="loading"
          block
          color="success"
          @click="
            addCropData()
            this.dialog = false
          "
          >הוסף נתוני גידול</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'AddCropData',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
      cropName: null,
      cropDuration: null,
      irrigation13: [],
      irrigation28: [],
      irrigation48: [],
      irrigation54: [],
      fertNitrogen: [],
      fertPhosphorus: [],
      fertPotassium: [],
      fertUrean: [],
    }
  },
  methods: {
    stringToarr(sourceArr) {
      if (sourceArr == []) {
        return []
      } else {
        sourceArr = sourceArr.split(' ')
        let floatArr = []
        sourceArr.forEach((item) => {
          floatArr.push(parseFloat(item))
        })
        return floatArr
      }
    },

    addCropData() {
      this.getFloatArrays()
      let fertilizationMap = {
        Nitrogen: this.fertNitrogen,
        Phosphorus: this.fertPhosphorus,
        Potassium: this.fertPotassium,
        Urean: this.fertUrean,
      }
      let irrigationMap = {
        13: this.irrigation13,
        28: this.irrigation28,
        48: this.irrigation48,
        54: this.irrigation54,
      }
      let ref = fb.crop.doc()
      ref.set({
        id: ref.id,
        duration: this.cropDuration,
        name: this.cropName,
        fertilization: fertilizationMap,
        irrigation: irrigationMap,
      })
    },

    //transform user input into array of float numbers
    getFloatArrays() {
      this.fertNitrogen = this.stringToarr(this.fertNitrogen)
      this.fertPhosphorus = this.stringToarr(this.fertPhosphorus)
      this.fertPotassium = this.stringToarr(this.fertPotassium)
      this.fertUrean = this.stringToarr(this.fertUrean)
      this.irrigation13 = this.stringToarr(this.irrigation13)
      this.irrigation28 = this.stringToarr(this.irrigation28)
      this.irrigation48 = this.stringToarr(this.irrigation48)
      this.irrigation54 = this.stringToarr(this.irrigation54)
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['pests', 'pesticides', 'pImplement', 'crops']),
  },
}
</script>
