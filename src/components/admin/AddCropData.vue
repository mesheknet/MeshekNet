 <template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-auto white--text" color="light green" v-on="on">
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
                v-model="fertilization"
                label="דישון"
                @input="stringToarr()"
              ></v-text-field>
            </v-col>
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
        <v-btn :loading="loading" block color="success">הוסף נתוני גידול</v-btn>
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
      fertilization: [],
    }
  },
  methods: {
    stringToarr() {
      let tempArr = this.fertilization.split(' ')
      let fertArr = []
      tempArr.forEach((item) => {
        fertArr.push(parseFloat(item))
      })
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['pests', 'pesticides', 'pImplement', 'crops']),
  },
}
</script>
