<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="ma-5" color="light green darken-4" dark v-on="on">
        הוספת גידול חדש
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-2" primary-title>
        הזנת פרטי גידול
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          <v-text-field
            label="שם השדה"
            v-model="fieldName"
            :rules="inputRules"
          ></v-text-field>
          <v-select
            v-model="selectCrop"
            :items="items"
            label="סוג הגידול"
          ></v-select>
          <v-text-field
            suffix="דונם"
            label="גודל השדה"
            v-model="fieldArea"
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
              v-model="date"
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
          color="light-green darken-2"
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
      userId: null,
      farmId: null,
      dialog: null,
      selectCrop: null,
      fieldName: null,
      fieldArea: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      date: new Date().toISOString().substr(0, 10),
      inputRules: [v => !!v || 'אנא הכנס שם שדה'],
      valid: false,
      loading: false
    }
  },
  mounted() {
    this.userId = fb.currentUser.uid
    this.farmId = fb.farm.where('userId', '==', this.userId)
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let cropCycle = fb.cropCycle.doc(this.farmId)
        this.loading = true
        console.log(this.date)
        cropCycle
          .set({
            cropId: 'test',
            farmId: this.farmId,
            fieldId: 'test',
            startDate: this.date
          })
          .then(() => {
            this.loading = false
            this.dialog = false
          })
      }
    }
  },
  computed: {
    formattedDate() {
      return this.date ? moment(this.date).format('L') : ''
    }
  }
}
</script>
