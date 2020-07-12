<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="mr-7" color="light green darken-4" dark v-on="on">
     לול תרנגולת חדש
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הזנת פרטי לול
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          
          
         
          <v-text-field
            
            label="כמות מקסימלית"
            v-model="maxCapacity"
            :rules="sizeRules"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          block
          dark
          color="light-green darken-3"
          @click="submit"
          :loading="loading"
        >
          הוסף לול
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const fb = require('@/fb.js')
import { mapGetters } from 'vuex'

export default {
  name: 'Addcoop',
  data() {
    return {
      
      maxCapacity: null,
      startDate: new Date().toISOString().substr(0, 10),
      nameRules: [v => !!v || 'אנא הכנס שם שדה'],
      sizeRules: [v => !!v || 'אנא הזן גודל שדה'],
      dialog: null,
      dateMenu: false,
      valid: false,
      loading: false
    }
  },

  created() {},

  methods: {
    

    

    //push data to firebase if form is valid, close dialog
    submit() {
      if (this.$refs.form.validate()) {
        this.setStartDate()
        this.loading = true
        var coop = {
          id: fb.coop.doc().id,
          maxCapacity: this.maxCapacity,
          farmId: this.farmId,
         
        }

        this.$store.commit('addCoop', coop)
      
        //console.log(this.fields.find(x => x.id == this.tempFieldId))

        this.loading = false
        this.dialog = false
      }
    },
    setStartDate() {
      this.$store.commit('setStartDate', this.startDate)
    }
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId', 'farmId']),

   
  }
}
</script>
