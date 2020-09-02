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
         <v-btn
                
                color="success"
                class="mr-4"
                @click="BecomeAdmin"
                
              >
                הפוך למנהל
              </v-btn>
             
         <v-btn
                
                
                class="mr-4"
                @click="CanceledAdmin"
                
              >
                בטל מנהל
              </v-btn>
              </v-row>
              <v-row>
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
  name: 'UserManagement',
  components: {},
  data() {
    return {
      loading: false,
      dialog: null,
      selectUser:null
    
    }
  },
  methods: {
    BecomeAdmin() {
        //  fb.user.doc(this.selectUser.userId).update({
     //   admin: true,
      //})
      for(var i=0;i<this.users.length;i++)
   if(this.users[i].userId==this.selectUser.userId){
    fb.user.doc(this.users[i].email).update({
        admin: true,
      })
      this.$refs.form.reset()
   }
    },
 CanceledAdmin() {
   for(var i=0;i<this.users.length;i++)
   if(this.users[i].userId==this.selectUser.userId){
    fb.user.doc(this.users[i].email).update({
        admin: false,
      })
      this.$refs.form.reset()
   }
    },
    
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['farmOwners','users']),
  },
}
</script>
