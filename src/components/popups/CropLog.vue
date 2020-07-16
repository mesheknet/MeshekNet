
<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mt-6 white--text" color="light green" v-on="on">
        יומן גידול<v-icon right>&#x1F4D6;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        יומן גידול
      </v-card-title>

      <v-card-text> </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn block @click="dialog = false" color="success">חזרה</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CropLog',
  components: {},
  data() {
    return {
      dialog: null
    }
  },
  methods: {},
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters([])
  }
}
</script>
