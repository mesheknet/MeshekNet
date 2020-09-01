 <template>
  <v-dialog max-width="600" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="mx-auto white--text"
        color="light green"
        v-on="on"
        min-width="200"
      >
        ניהול משתמשים<v-icon right>&#x2622;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        ניהול משתמשים
      </v-card-title>
<v-container>
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
         <v-btn
                
                color="success"
                class="mr-4"
                @click="BecomeAdmin"
                
              >
                הפוך למנהל
              </v-btn>
             
         <v-btn
                
                
                class="mr-4"
                @click="DelAdmin"
                
              >
                בטל מנהל
              </v-btn>
              </v-row>
              <v-row>
              <v-btn color="error" class="mr-4" @click="dialog = false">
                חזור
              </v-btn>
              </v-row>
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
      loading: false,
      dialog: null,
      Topic:null,
      selectUser:null,
    NotMessage:null
    }
  },
  methods: {
    submit() {
     var AdminNotifications = {
          id: fb.notification.doc().id,
          title: "התראה מהמנהל",
          subject: this.Topic,
          mes: this.NotMessage,
          to:this.selectUser.id

        }
        this.$store.commit('NewNotifications', AdminNotifications)
    },

    
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['farmOwners']),
  },
}
</script>
