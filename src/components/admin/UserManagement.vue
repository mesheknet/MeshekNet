 <template>
  <v-dialog max-width="600" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="mx-auto white--text"
        color="light green"
        v-on="on"
        min-width="200"
      >
        ניהול משתמשים <v-icon right>fas fa-users-cog</v-icon>
      </v-btn>
    </template>

    <v-card justify-space-around>
      <v-card-title class="green lighten-3" primary-title>
        ניהול משתמשים
      </v-card-title>
      <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-select
              v-model="selectUser"
              :items="farmOwners"
              label="בחר משתמש"
              item-text="name"
              return-object
            ></v-select>
          </v-row>
          <v-row>
            <v-btn color="success" class="mr-4" @click="BecomeAdmin">
             הפוך למנהל מערכת
            </v-btn>
          </v-row>
          <v-row>
            <v-btn color="success" class="mr-4" @click="BecomeAgriculturalGuide">
           הפוך למדריך חקלאי
            </v-btn>
          </v-row>
          <v-row>
            <v-btn color="success" class="mr-4" @click="Becomeveterinarian">
             הפוך לוטרינר
            </v-btn>
          </v-row>
          <v-row>
            <v-btn class="mr-4" @click="CanceledAdmin">
              בטל ניהול
            </v-btn>
          </v-row>
          <v-row>
            <v-btn color="error" class="mr-4" @click="dialog = false">
              חזור
            </v-btn>
          </v-row>
          <v-snackbar v-model="snackbar">
            הפעולה בוצעה.
          </v-snackbar>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'UserManagement',
  components: {},
  data() {
    return {
      valid: true,
      snackbar: false,
      loading: false,
      dialog: null,
      selectUser: null,
    }
  },
  methods: {
    BecomeAdmin() {
      let uEmail = this.users.find(
        (item) => item.userId == this.selectUser.userId
      ).email
      fb.user.doc(uEmail).update({
        role: 'admin',
      })
      this.snackbar = true
      this.$refs.form.reset()
    },
     Becomeveterinarian() {
      let uEmail = this.users.find(
        (item) => item.userId == this.selectUser.userId
      ).email
      fb.user.doc(uEmail).update({
        role: 'veterinarian',
      })
      this.snackbar = true
      this.$refs.form.reset()
    },
     BecomeAgriculturalGuide() {
      let uEmail = this.users.find(
        (item) => item.userId == this.selectUser.userId
      ).email
      fb.user.doc(uEmail).update({
        role: 'AgriculturalGuide',
      })
      this.snackbar = true
      this.$refs.form.reset()
    },
    CanceledAdmin() {
      let uEmail = this.users.find(
        (item) => item.userId == this.selectUser.userId
      ).email
      fb.user.doc(uEmail).update({
        role: 'Regular',
      })
      this.snackbar = true
      this.$refs.form.reset()
    },

  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['farmOwners', 'users']),
  },
}
</script>
