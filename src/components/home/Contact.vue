<template>
<div class="container_fluid">
 <v-card class="mx-auto"
    max-width="500"
    min-height="485">
   <v-card-text>
     <v-form class="px3">
       <v-textarea  filled
          auto-grow
          label="נושא"
          rows="1"
          row-height="30"
          shaped v-model="subject"></v-textarea>
        <v-textarea
          filled
          auto-grow
          label="Four rows"
          rows="7"
          row-height="30"
          shaped
        ></v-textarea>
     </v-form>
   </v-card-text>
 </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Weather',
  stationName: null,

  data() {
    return {}
  },
  methods: {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['weather', 'farmId'])
  }
}
</script>

<style scoped>
.container_fluid {
  
  background-color: #74a748;
  
  padding: 15px;
  height: 90vh;
}
</style>