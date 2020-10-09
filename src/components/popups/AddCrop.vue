<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        class="font-weight-bold"
        color="light green darken-2"
        dark
        block
        v-on="on"
      >
        הוספת גידול חדש
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הזנת פרטי גידול
      </v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="8">
              <v-select
                v-model="selectedField"
                :items="fields"
                label="בחר שדה או הוסף חדש"
                @input="getFieldId"
                item-text="name"
                return-object
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-btn
                @click="addField = true"
                class="ma-2"
                fab
                x-small
                dark
                color="teal darken-2"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
                v-if="selectedField"
                @click="deleteField"
                class="ma-2"
                fab
                x-small
                dark
                color="red darken-2"
              >
                <v-icon dark>delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="addField">
            <v-col>
              <v-text-field label="שם השדה" v-model="fieldName"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="גודל השדה"
                v-model="fieldArea"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-btn
                text
                @click="
                  addNewField()
                  addField = false
                "
                class="ma-2"
                color="success"
                >הוסף</v-btn
              >
            </v-col>
          </v-row>

          <v-select
            v-model="selectedCrop"
            :items="crops"
            label="סוג הגידול"
            @input="getCropId"
            item-text="name"
            return-object
          ></v-select>
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
      addField: false,
      selectedCrop: null,
      selectedField: null,
      fieldName: null,
      fieldArea: null,
      startDate: new Date().toISOString().substr(0, 10),
      nameRules: [(v) => !!v || 'אנא הכנס שם שדה'],
      sizeRules: [(v) => !!v || 'אנא הזן גודל שדה'],
      dialog: null,
      dateMenu: false,
      valid: false,
      loading: false,
    }
  },

  created() {},

  methods: {
    addNewField() {
      var newField = {
        id: fb.field.doc().id,
        name: this.fieldName,
        area: this.fieldArea,
        farmId: this.farmId,
      }
      this.$store.commit('addNewField', newField),
        (this.selectedField = newField)
      this.$store.commit('updateSelectedField', this.selectedField)
    },

    deleteField() {
      fb.field.doc(this.selectedField.id).delete()
    },

    getCropId() {
      this.$store.commit('updateSelectedCrop', this.selectedCrop)
    },
    getFieldId() {
      this.$store.commit('updateSelectedField', this.selectedField)
    },

    //push data to firebase if form is valid, close dialog
    submit() {
      if (this.$refs.form.validate()) {
        this.setStartDate()
        this.loading = true
        var NewCrop = {
          id: fb.field.doc().id,
          name: this.fieldName,
          area: this.fieldArea,
          farmId: this.farmId,
        }

        this.$store.commit('addCropCycle', NewCrop)

        //sort done chick cycles
        this.$store.dispatch('bindCropCycle')
        this.loading = false
        this.dialog = false
        this.$refs.form.reset()
      }
    },
    setStartDate() {
      this.$store.commit('setStartDate', this.startDate)
    },
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId', 'farmId', 'crops', 'fields', 'cropCycle']),

    formattedDate() {
      return this.startDate ? moment(this.startDate).format('L') : ''
    },
  },
}
</script>
