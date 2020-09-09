 <template>
  <v-dialog max-width="600" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="mx-auto white--text"
        color="light green"
        v-on="on"
        min-width="200"
      >
        שליחת התראות<v-icon right>fas fa-bell</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        שליחת התראות
      </v-card-title>
      <v-container>
        <v-row>
          <v-select
            v-model="selectUser"
            :items="farmOwners"
            label="למי תרצה לשלוח את ההתראה?"
            item-text="name"
            return-object
          ></v-select>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="Topic"
            :counter="20"
            label="נושא"
            required
          ></v-text-field>
          <v-row>
            <v-col cols="12">
              <v-textarea
                solo
                auto-grow
                label="התראה"
                row-height="35"
                v-model="NotMessage"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submit"
            >
              שלח
            </v-btn>
            <v-btn color="error" class="mr-4" @click="dialog = false">
              חזור
            </v-btn>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'NotificationsFromAdmin',
  components: {},
  data() {
    return {
      valid: true,
      loading: false,
      dialog: null,
      Topic: null,
      selectUser: null,
      NotMessage: null,
    }
  },
  methods: {
    submit() {
      var AdminNotifications = {
        id: fb.notification.doc().id,
        title: 'התראה מהמנהל',
        subject: this.Topic,
        mes: this.NotMessage,
        to: this.selectUser.userId,
      }
      this.$store.commit('NewNotifications', AdminNotifications)
      this.$refs.form.reset()
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['farmOwners']),
  },
}
</script>
