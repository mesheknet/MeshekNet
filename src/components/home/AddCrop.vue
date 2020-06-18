<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="ma-5" color="light green darken-4" dark v-on="on">
        הוספת גידול חדש
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הזנת פרטי גידול
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="שם השדה"
            v-model="fieldName"
            :rules="nameRules"
          ></v-text-field>
          <v-select
            v-model="selectCropName"
            :items="cropsDisp"
            label="סוג הגידול"
            @input="getCropId"
          ></v-select>
          <v-text-field
            suffix="דונם"
            label="גודל השדה"
            v-model="fieldArea"
            :rules="sizeRules"
          ></v-text-field>
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                prepend-icon="date_range"
                :value="formattedDate"
                label="תאריך התחלת גידול"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="he-il"
              v-model="startDate"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          block
          dark
          color="light-green darken-3"
          @click="submit"
          :loading="loading"
        >
          הוסף גידול
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const fb = require('@/fb.js')
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'AddCrop',
  data() {
    return {
      cropId: null,
      fieldId: null,
      cropsDisp: [],
      selectCropName: null,
      //selectedCrop: {},
      fieldName: null,
      fieldArea: null,
      startDate: new Date().toISOString().substr(0, 10),
      nameRules: [v => !!v || 'אנא הכנס שם שדה'],
      sizeRules: [v => !!v || 'אנא הזן גודל שדה'],
      dialog: null,
      dateMenu: false,
      valid: false,
      loading: false
    }
  },

  created() {
    //update local store data from firestore
    this.$store.commit('updateCred')
    console.log(this.farmId)
    this.$store.dispatch('bindUsers')
    this.$store.dispatch('bindFields')
    this.$store.dispatch('bindCropCycle')
    this.$store.dispatch('bindCrops')
    this.$store.dispatch('bindAllCycles')

    this.getCrops()
  },

  methods: {
    getCrops() {
      fb.crop.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.cropsDisp.push(doc.data().name)
        })
      })
    },

    getCropId() {
      fb.crop
        .where('name', '==', this.selectCropName)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.$store.state.selectedCrop = doc.data()
          })
        })
    },

    //push data to firebase if form is valid, close dialog
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        this.addField()
        this.addCropCycle()
      }
    },

    addField() {
      var doc = fb.field
      doc
        .add({
          name: this.fieldName,
          area: this.fieldArea,
          farmId: this.farmId
        })
        .then(snap => {
          fb.field
            .doc(snap.id)
            .get()
            .then(doc => {
              this.$store.state.currentField = doc.data()
            })
        })
    },

    addCropCycle() {
      fb.cropCycle
        .add({
          cropId: this.selectedCrop.id,
          cropName: this.selectedCrop.name,
          duration: this.selectedCrop.duration,
          farmId: this.farmId,
          fieldId: this.currentField.id,
          fieldName: this.currentField.name,
          fieldArea: this.currentField.area,
          startDate: moment(this.startDate).format('L')
        })
        .then(() => {
          this.loading = false
          this.dialog = false
        })
    }
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'fields',
      'crops',
      'cropCycle',
      'selectedCrop',
      'currentField'
    ]),
    formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    }
  }
}
</script>
