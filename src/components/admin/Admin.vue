<template>
  <v-card>
    <v-card-text>
      <v-row>
        <AddCropData />
      </v-row>
      <v-row>
        <editPestCtrl />
      </v-row>
      <v-row>
        <EditChickenType />
      </v-row>
      <v-row>
        <AddDisease />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import editPestCtrl from './EditPestCtrl'
import EditChickenType from './EditChickenType'
import AddDisease from './AddDisease'
import AddCropData from './AddCropData'

export default {
  name: 'Admin',
  components: { editPestCtrl, EditChickenType, AddDisease, AddCropData },
  data() {
    return {
      dialog: null,
    }
  },
  methods: {},
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId']),
  },
}
</script>
