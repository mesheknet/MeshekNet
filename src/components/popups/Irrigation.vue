<template>
  <v-dialog width="500" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn block class="mx-auto" color="light green" dark v-on="on">
        השקיה<v-icon right>&#x1F4A7;</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="green lighten-3" primary-title>
        השקיה
      </v-card-title>

      <v-card-text> </v-card-text>

      <v-divider></v-divider>

      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Irrigation',
  components: {},
  data() {
    return {}
  }
}
</script>
