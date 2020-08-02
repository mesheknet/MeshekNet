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

      <v-card-text> </v-card-text>

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
    }
  },
  methods: {},
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['pests', 'pesticides', 'pImplement', 'crops']),
  },
}
</script>
