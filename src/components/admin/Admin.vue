<template>

  <v-card>
    <v-card-text>
    <v-row>
    <editPestCtrl />
    </v-row>
    <v-row>
    <EditChickenType />
    </v-row>
    </v-card-text>
    </v-card>

</template>

<script>
import { mapGetters } from 'vuex'
import editPestCtrl from './EditPestCtrl'
import EditChickenType from './EditChickenType'


export default {
  name: 'Admin',
  components: { editPestCtrl , EditChickenType },
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
