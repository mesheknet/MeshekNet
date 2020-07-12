<template>
  <v-layout>
    <editPestCtrl />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import editPestCtrl from './EditPestCtrl'

export default {
  name: 'Admin',
  components: { editPestCtrl },
  data() {
    return {
      dialog: null
    }
  },
  methods: {},
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId'])
  }
}
</script>
