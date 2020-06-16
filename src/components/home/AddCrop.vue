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
            v-model="selectCrop"
            :items="crops"
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

export default {
  name: 'AddCrop',
  data() {
    return {
      cropId: null,
      fieldId: null,
      crops: [],
      selectCrop: null,
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
  //get local data from firebase
  created() {
    this.getCrops()
  },

  methods: {
    getCrops() {
      fb.crop.get().then(snapshot => {
        snapshot.forEach(doc => {
          this.crops.push(doc.data().name)
        })
      })
    },

    getCropId() {
      fb.crop
        .where('name', '==', this.selectCrop)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.cropId = doc.id
          })
        })
    },

    //push data to firebase if form is valid, close dialog
    submit() {
      if (this.$refs.form.validate()) {
        var doc = fb.field.doc()
        doc.set({
          name: this.fieldName,
          area: this.fieldArea,
          farmId: this.farmId
        })
        this.fieldId = doc.id
        this.loading = true
        fb.cropCycle
          .doc()
          .set({
            cropId: this.cropId,
            farmId: this.farmId,
            fieldId: this.fieldId,
            startDate: moment(this.startDate).format('L')
          })
          .then(() => {
            this.loading = false
            this.dialog = false
          })
      }
    }
  },
  computed: {
    farmId() {
      return this.$store.state.farmId
    },
    userId() {
      return this.$store.state.userId
    },

    formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    }
  }
}
</script>
