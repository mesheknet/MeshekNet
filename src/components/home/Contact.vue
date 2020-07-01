<template>
  <v-container class="mx-4">
    <v-layout row justify-space-around>
      <v-flex md3>
        <v-card class="pa-2" outlined tile>
          <v-card-title primary-title>
            צור קשר
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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