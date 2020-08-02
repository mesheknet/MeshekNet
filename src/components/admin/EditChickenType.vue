 <template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-auto white--text" color="light green" v-on="on">
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
        <v-text-field
          label="שם סוג התרנגולת"
          v-model="NameChicken"
        ></v-text-field>
        <v-col>
          <v-text-field
            label="כמות ביצים ממצועת"
            v-model="EggsAvg"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="כמות צריכת אוכל ממצועת"
            v-model="FoodAvg"
          ></v-text-field>
        </v-col>

        <v-col>
          <v-btn text @click="addNewChicken()" class="ma-2" color="success"
            >הוסף</v-btn
          >
        </v-col>
      </v-row>
      <v-card-actions>
        <v-btn :loading="loading" block @click="dialog = false" color="success"
          >עדכן תרנגולות</v-btn
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
      NameChicken: null,
      EggsAvg: null,
      FoodAvg: null,
      selectChicken: null,
      dosage: null,
      vol: null,
    }
  },
  methods: {
    addNewChicken() {
      var newChickens = {
        id: fb.Chickens.doc().id,
        name: this.NameChicken,
        AverageEggs: this.EggsAvg,
        DayAverageFood: this.FoodAvg,
      }
      this.$store.commit('addNewChickens', newChickens),
        (this.selectChicken = newChickens)
    },

    deleteChicken() {
      fb.Chickens.doc(this.selectChicken.id).delete()
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['Chickens']),
  },
}
</script>
