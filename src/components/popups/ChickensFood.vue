<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        class="mt-6 white--text"
        color="light green"
        v-on="on"
        @click="updateCurrentCycleData()"
      >
        מזון<v-icon right>fas fa-carrot</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        מזון
      </v-card-title>

      <v-card-text>
        <p>כמות תערובת נוכחית:</p>
      </v-card-text>

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
  name: 'ChickensFood',
  components: {},
  data() {
    return {
      dialog: null
    }
  },
  methods: {
    //get current cycle data using store
    updateCurrentCycleData() {
      this.$store.dispatch('bindCycleData')
    }
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'coop',
      'Chickens',
      'currentchickCycle',
      'chickCycle',
      'cycleData'
    ])
  }
}
</script>
