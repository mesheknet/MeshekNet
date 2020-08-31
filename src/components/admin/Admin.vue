<template>
  <div class="main">
    <v-container class="mx-auto">
      <v-layout row justify-space-around>
        <v-flex md12>
          <v-card class="mx-auto mt-6" max-width="700" tile>
            <v-card-title> בחר פעולת מנהל לביצוע </v-card-title>
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
              <v-row>
                <AdminMesseg />
              </v-row>
              <v-row>
                <NotificationsFromAdmin />
              </v-row>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import editPestCtrl from './EditPestCtrl'
import EditChickenType from './EditChickenType'
import AddDisease from './AddDisease'
import AddCropData from './AddCropData'
import AdminMesseg from './AdminMesseg'
import NotificationsFromAdmin from './NotificationsFromAdmin'

export default {
  name: 'Admin',
  components: {
    editPestCtrl,
    EditChickenType,
    AddDisease,
    AddCropData,
    AdminMesseg,
    NotificationsFromAdmin
  },
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



<style scoped>
.main {
  height: 90vh;
}
</style>
