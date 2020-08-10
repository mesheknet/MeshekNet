<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="mx-auto white--text" color="light green" v-on="on">
        הודעות<v-icon right>fas fa-briefcase-medical</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הודעות
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-row>
                <v-col  class="mr-8" >שם</v-col>
                <v-col >כותרת</v-col>
                <v-col >נושא</v-col>
                <v-col  class="mr-12">תאריך</v-col>
          </v-row>
            <v-expansion-panels focusable class="mb-6 ">
    <v-expansion-panel 
      v-for="(Messages,index) in AMesseg"
      
      :key="index"
      @click="setcurrentMess(Messages)"
      
    >
   
      <v-expansion-panel-header expand-icon="fa fa-exclamation">
        <v-col >{{setOwners()}} </v-col>
      <v-col>{{Messages.title}} </v-col>
                <v-col>{{Messages.subject}}</v-col>
                <v-col>{{Messages.startDate}} </v-col>
      </v-expansion-panel-header>
      
      <v-expansion-panel-content>
        <v-row>
        {{Messages.mes}}
        </v-row>
        
         <v-col cols="4"> 
        <MessageFromAdmin />
                </v-col>
        
        
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>  





 <v-expansion-panels 
 v-for="(Messages,index) in AMessegDone"
      
      :key="index"
      @click="setcurrentMess(Messages)"
      >
      <v-expansion-panel>
        <v-expansion-panel-header>
           <v-col >{{setOwners()}} </v-col>
      <v-col>{{Messages.title}} </v-col>
                <v-col>{{Messages.subject}}</v-col>
                <v-col>{{Messages.startDate}} </v-col>
          <template v-slot:actions>
            <v-icon color="green">fa fa-check</v-icon>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
        {{Messages.mes}}
        </v-row>
        <v-row>
         <v-col cols="4"> 
        <MessageFromAdmin />
                </v-col>
        
         <v-col cols="4"> 
        <v-btn
                  text
                  color="primary"
                  @click="deleteMessages()"
                >מחק</v-btn>
                </v-col>
        </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels> 
             
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script>
const fb = require('@/fb.js')
import { mapGetters } from 'vuex'
import MessageFromAdmin from './MessageFromAdmin'
export default {
  name: 'AdminMesseg',
  components: {MessageFromAdmin},
  data() {
    return {
      loading: false,
      dialog: null,
      dosage: null,
      vol: null,
    }
  },
  created() {
        this.setDetails()
     
  },
  methods: {
     setcurrentMess(Messages) {
      this.$store.commit('setcurrentMessages', Messages)
    },
    setOwners() {
     return this.ownerName = this.farmOwners.find(
        (obj) => obj.userId == this.userId
      ).name
    },
     deleteMessages() {
      
        fb.Messages.doc(this.currentMessages.id).delete()
        this.currentMessages(null)
      },
    
  },

  updated() {},
  computed: {

     AMesseg: function() {
       return this.Messages.filter(function(m) {
         return(( m.to== "admin") &&(m.Done==false))
     })
     
   },
      AMessegDone: function() {
       return this.Messages.filter(function(m) {
         return(( m.to== "admin") &&(m.Done==true))
     })
     
   },


    //get local data from firestore using the store
    ...mapGetters(['Messages',  'userId', 'farmOwners', 'currentMessages']),
  },
}
</script>