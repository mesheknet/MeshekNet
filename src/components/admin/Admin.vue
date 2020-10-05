<template>
  <v-container fluid class="mx-auto">
    <v-layout row justify-space-around>
      <v-flex md12>
        <v-card class="mx-auto mt-6" max-width="700" tile>
          <v-card-title> בחר פעולת מנהל לביצוע </v-card-title>
          <v-card-text>
            <v-row v-if="isAdmin()||isAgriculturalGuide()">
              <AddCropData />
            </v-row>
            <v-row  v-if="isAdmin()||isAgriculturalGuide()">
              <editPestCtrl />
            </v-row>
            <v-row v-if="isAdmin()||isveterinarian()">
              <EditChickenType />
            </v-row>
            <v-row v-if="isAdmin()||isveterinarian()">
              <AddDisease />
            </v-row>
            <v-row>
              <AdminMesseg />
            </v-row>
            <v-row>
              <NotificationsFromAdmin />
            </v-row>
            <v-row v-if="isAdmin()">
              <UserManagement />
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import editPestCtrl from './EditPestCtrl'
import EditChickenType from './EditChickenType'
import AddDisease from './AddDisease'
import AddCropData from './AddCropData'
import AdminMesseg from './AdminMesseg'
import NotificationsFromAdmin from './NotificationsFromAdmin'
import UserManagement from './UserManagement'

export default {
  name: 'Admin',
  components: {
    editPestCtrl,
    EditChickenType,
    AddDisease,
    AddCropData,
    AdminMesseg,
    NotificationsFromAdmin,
    UserManagement,
  },
  data() {
    return {
      dialog: null,
    }
  },
  methods: {
    isAdmin() {
      return this.users.find((obj) => obj.userId == this.userId).role=='admin'
    },
    isveterinarian() {
      return this.users.find((obj) => obj.userId == this.userId).role=='veterinarian'
    },
    
     isAgriculturalGuide() {
      return this.users.find((obj) => obj.userId == this.userId).role=='AgriculturalGuide'
    },
  },
  updated() {},
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId', 'users']),
  },
}
</script>

