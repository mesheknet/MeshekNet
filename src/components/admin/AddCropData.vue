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
              <v-text-field v-model="irrigation" label="השקיה"></v-text-field>
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
        <v-btn :loading="loading" block color="success" @click="addCropData()"
          >הוסף נתוני גידול</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
//const fb = require('@/fb.js')

export default {
  name: 'AddCropData',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
      cropName: null,
      cropDuration: null,
      irrigation: [],
      fertNitrogen: [],
      fertPhosphorus: [],
      fertPotassium: [],
      fertUrean: [],
    }
  },
  methods: {
    stringToarr(sourceArr) {
      if (sourceArr == []) {
        return null
      } else {
        sourceArr = sourceArr.split(' ')
        let fertArr = []
        sourceArr.forEach((item) => {
          fertArr.push(parseFloat(item))
        })
        return fertArr
      }
    },

    addCropData() {
      this.getFertArrays()
      console.log(this.fertPhosphorus)
    },

    //transform user input into array of float numbers
    getFertArrays() {
      this.fertNitrogen = this.stringToarr(this.fertNitrogen)
      this.fertPhosphorus = this.stringToarr(this.fertPhosphorus)
      this.fertPotassium = this.stringToarr(this.fertPotassium)
      this.fertUrean = this.stringToarr(this.fertUrean)
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['pests', 'pesticides', 'pImplement', 'crops']),
  },
}
</script>
