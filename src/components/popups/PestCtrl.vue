<template>
  <v-dialog max-width="700" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mt-6 white--text" color="light green" v-on="on">
        הדברה<v-icon right>&#x2622;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        הדברה
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="selectedPest"
          :items="currentPests"
          label="בחר מזיק מהרשימה"
          item-text="name"
          return-object
        ></v-select>

        <v-data-table
          v-if="selectedPest"
          :headers="headers"
          :items="imps"
          hide-default-header
          hide-default-footer
          class="elevation-1"
        ></v-data-table>

        <v-list two-line v-if="selectedPest">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> חומר הדברה נדרש: </v-list-item-title>
              <v-list-item-subtitle>{{
                getCurrentPesticide().name
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>יצרן החומר: </v-list-item-title>
              <v-list-item-subtitle>{{
                getCurrentPesticide().supplier
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>מינון: </v-list-item-title>
              <v-list-item-subtitle
                >{{
                  pImplement.find(
                    obj =>
                      obj.pestId == selectedPest.id &&
                      obj.cropId == currentCycle.cropId
                  ).dosage
                }}
                גרם לדונם</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>נפח התרסיס: </v-list-item-title>
              <v-list-item-subtitle
                >{{
                  pImplement.find(
                    obj =>
                      obj.pestId == selectedPest.id &&
                      obj.cropId == currentCycle.cropId
                  ).vol
                }}
                ליטר לדונם</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn block @click="dialog = false" color="success">חזרה</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PestCtrl',
  components: {},
  data() {
    return {
      dialog: null,
      selectedPest: null,
      currentImplements: null,
      currentPests: [],
      headers: [
        {
          text: 'שם החומר',
          align: 'start',
          value: 'name'
        },
        { text: 'יצרן', value: 'supplier' },
        { text: 'מינון (גרם לדונם)', value: 'dosage' },
        { text: 'נפח התרסיס (ליטר לדונם)', value: 'vol' },
        { text: 'מינון לכל החלקה (גרם )', value: 'calcDosage' },
        { text: 'נפח תרסיס לכל החלקה (ליטר )', value: 'calcVol' }
      ],
      imps: []
    }
  },
  methods: {
    getCurrentImplements() {
      this.currentImplements = this.pImplement.filter(
        obj => obj.cropId == this.currentCycle.cropId
      )
    },

    //get only pests relevant for this crop
    getCurrentPests() {
      this.getCurrentImplements()
      this.currentImplements.forEach(obj => {
        let pest = this.pests.find(item => item.id == obj.pestId)
        this.currentPests.push(pest)
      })
    },

    getCurrentPesticide() {
      let tempId = this.pImplement.find(
        obj => obj.cropId == this.currentCycle.cropId
      ).pesticideId

      return this.pesticides.find(obj => obj.id == tempId)
    },

    createLocalImplements() {
      let created = {
        name: null,
        supplier: null,
        dosage: null,
        vol: null,
        calcDosage: null,
        calcVol: null
      }
      this.currentImplements.forEach(obj => {
        created.name = obj.id

        this.imps.push(created)
      })
    }
  },
  mounted() {
    this.getCurrentPests()
    this.createLocalImplements()
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'pests',
      'pesticides',
      'pImplement',
      'crops',
      'currentCycle'
    ])
  }
}
</script>
