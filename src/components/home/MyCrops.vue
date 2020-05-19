<template>
  <div class="container_fluid">
    <div class="container_title">
      <h1>הגידולים שלי</h1>
    </div>

    <div class="container_content">
      content
    </div>

    <div class="container_list">
      <div class="container_list_title">
        <h5>בחר גידול:</h5>
      </div>
      <div
        class="container_list_item"
        v-for="(Crop, index) in Crops"
        :key="Crop.id"
        :style="{ background: changbackground(index) }"
      >
        <div class="container_list_item_img">
          <span class="dot"
            ><h4>{{ FirstLetter(Crop.titel) }}</h4></span
          >
        </div>
        <div class="container_list_item_title">{{ Crop.titel }}</div>
        <div class="container_list_item_Description">
          {{ Crop.Description }}
        </div>
      </div>
    </div>

    <div class="container_add">
      add
    </div>
  </div>
</template>

<script>
const fb = require('@/fb.js')

export default {
  name: 'MyCrops',
  currentUser: null,
  data() {
    return {
      Crops: [
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 1 },
        { titel: 'אבטיח', Description: 'שדה 1,20 דונם', id: 2 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 3 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 4 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 5 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 6 },
        { titel: 'אבטיח', Description: 'שדה 1,20 דונם', id: 7 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 8 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 9 },
        { titel: 'חיטה א', Description: 'שדה 1,20 דונם', id: 10 }
      ]
    }
  },
  mounted() {
    console.log(fb.currentUser)
  },
  methods: {
    FirstLetter(string) {
      return string.charAt(0).toUpperCase()
    },
    changbackground(index) {
      return index % 2 == false ? '#e2e2e2' : '#fafafa'
    }
  }
}
</script>

<style scoped>
.container_fluid {
  display: grid;
  border-style: solid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1em;
  padding: 15px;
}

.container_title {
  border-style: solid;
  grid-column: 1/6;
  height: 100px;
  text-align: center;
}
.container_title h1 {
  margin: 0;
}

.container_list {
  grid-row: 2/4;
  width: 100%;
  min-width: 200px;
  height: 620px;
  border: 1px solid;
  overflow: auto;
  box-shadow: 5px 10px 8px #888888;
}

.container_add {
  width: 100%;
  height: 80px;
  border: 1px solid;

  box-shadow: 5px 10px 8px #888888;
}
.container_content {
  grid-column: 2/6;
  grid-row: 2/5;

  border: 1px solid;

  box-shadow: 5px 10px 8px #888888;
}

.container_list_title {
  width: 95%;
  height: 40px;

  margin: 15px auto;
  border-style: solid;
}
.container_list_item {
  height: 75px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 5px auto;
  border-style: solid;
  border-radius: 30px;
  box-shadow: 10px 5px 5px 0px rgba(0, 0, 0, 0.75);
  margin-bottom: 15px;
  padding: 5px;
}
.container_list_item_img {
  grid-column: 1/1;
  grid-row: 1/3;
}
.container_list_item_title {
  grid-column: 2/4;
}
.container_list_item_Description {
  grid-column: 2/4;
}

.container_list .container_list_title h5 {
  margin: 0;
}
.dot {
  height: 58px;
  width: 58px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin: 3%;
  font-size: 40px;
  margin-right: 20px;
}
.dot h4 {
  margin-right: 33%;
  margin-top: 15%;
}
</style>

