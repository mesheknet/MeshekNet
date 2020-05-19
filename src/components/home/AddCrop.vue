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
        <v-form class="px-3">
          <v-text-field label="שם השדה" v-model="fieldName"></v-text-field>
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
            <v-date-picker locale="he-il" v-model="date"></v-date-picker>
          </v-menu>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn block dark color="light-green darken-2" @click="submit">
          הוסף גידול
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AddCrop',
  data() {
    return {
      dialog: null,
      selectCrop: null,
      fieldName: null,
      fieldArea: null,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
      date: null
    }
  },
  methods: {
    submit() {
      console.log(this.date)
      this.dialog = false
    }
  },
  computed: {
    formattedDate() {
      return this.date ? moment(this.date).format('L') : ''
    }
  }
}
</script>
