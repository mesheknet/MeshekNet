
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
                v-model="selectedTret"
                :items="treatment"
                label="בחר מחלה"
                item-text="nameDisease"
                 @input="getChickensId"
                return-object
              ></v-select>
            </v-col>
           
          </v-row>
         <v-row>
          <v-col>
              <v-text-field label="הערות" v-model="DescriptionTret"></v-text-field>
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
                label="תאריך התחלת טיפול"
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
            
            addDiseasesCycle()
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
  name: 'Diseases',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
    selectedTret:null,
    DescriptionTret: null,
    addDiseaseChicken: false,
      dateMenu: false,
      dosage: null,
      vol: null
    }
  },
  methods: {
    getChickensId() {
      this.$store.commit('updateselectedTret', this.selectedTret)
    },
  addDiseasesCycle() {
      var DiseasesCycle = {
        id: fb.treatment.doc().id,
        Description: this.DescriptionTret,
     
      }
      this.$store.commit('addDiseasesCycle',DiseasesCycle)
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['DiseasechickCycle' ,'currentCycle' , 'treatment','currentchickCycle'] )
  }
}
</script>