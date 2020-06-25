<template>
  <v-container class="mt-4">
    <v-layout row justify-space-around>
      <v-flex md4>
        <v-list two-line subheader>
          <v-subheader inset>בחר מדגר</v-subheader>

          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-avatar>
              <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle
                v-text="item.subtitle"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-information</v-icon>
          </v-btn>
        </v-list>
      </v-flex>
      <v-flex md8> </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'MyCoop',
  data() {
    return {
      items: [{ title: '1', icon: 'tractor' }]
    }
  }
}
</script>
