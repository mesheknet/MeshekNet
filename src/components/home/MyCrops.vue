<template>
  <!--  container_fluid- for all main grid    -->
  <div class="container_fluid">
    <!-- container_title- main grid in container_fluid, Controls for title  -->

    <!--  icon for open the list in condition media-->
    <div class="iconlist">
      <a class="btn-floating pulse" @click="toggle = !toggle"
        ><i class="material-icons">chevron_left</i></a
      >
    </div>

    <!--  container_content- main grid in container_fluid,  Controls left side under title -->
    <div class="container_content">
      <!--  container_content_details- Secondary grid in container_content Controls right side  -->
      <div class="container_content_details" v-if="currentCycle">
        <div class="container_content_details_title">
          <span>פרטי הגידול:</span><br />{{ this.currentCycle.cropName }},
          {{ this.currentCycle.fieldName }}
        </div>
        <div class="container_content_details_kind">
          <span>זן:</span><br />סורי
        </div>
        <div class="container_content_details_dateStart">
          <span>תאריך התחלה:</span><br />{{ this.currentCycle.startDate }}
        </div>
        <div class="container_content_details_dateFinish">
          <span>תאריך סיום:</span><br />{{ this.calcEndDate() }}
        </div>
        <div class="container_content_details_areaSize">
          <span>גודל שטח:</span><br />{{ this.currentCycle.fieldArea }} דונם
        </div>
        <div class="container_content_details_btnEdit">
          <a class="btn-floating cyan pulse"
            ><i class="material-icons">edit</i></a
          >
        </div>
      </div>
      <!--  container_content_btn-Secondary grid in container_content Controls btn green -->
      <div class="container_content_btn">
        <irrigation />
        <button class="button">דישון &#x1F69C;</button>
        <button class="button">הדברה &#x2622;</button>
        <button class="button">היסטוריה גידול &#x1F4D6;</button>
      </div>
      <!--  container_content_btndel-Secondary grid in container_content Controls btn green -->
      <div class="container_content_btndel">
        <v-btn
          class="white--text"
          color="#f70810"
          :disabled="!isDisabled"
          @click="deleteDialog = true"
        >
          מחק<v-icon right>&#x1F5D1;</v-icon></v-btn
        >
        <v-dialog v-model="deleteDialog" max-width="500px">
          <v-card>
            <v-card-title style="font-size:20px"
              >האם אתה בטוח שברצונך למחוק מחזור גידול זה?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                dark
                color="#4caf50"
                style="font-size:15px"
                text
                @click="
                  deleteCycle()
                  deleteDialog = false
                "
                >כן</v-btn
              >
              <v-btn
                dark
                color="#f70810"
                style="font-size:15px"
                text
                @click="deleteDialog = false"
                >לא</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
    <!--  container_list- main grid in container_fluid,  Controls the crop list on the right -->
    <div
      class="container_list"
      v-if="this.toggle == true || this.windowWidth > 760"
    >
      <div class="container_list_title">
        בחר גידול
      </div>
      <!--  container_list_item-Secondary grid in ccontainer_list Controls Creation item in the list -->
      <div
        class="container_list_item"
        v-for="(cycle, index) in cropCycle"
        :key="index"
        @click="
          toggle = !toggle
          setCurrentCycle(cycle)
          togglec(index)
        "
        :class="{ active: index == activeIndex }"
      >
        <!-- container_list_item_img and dot-Controls the creation of the circle in each item and takes the first letter -->
        <div class="container_list_item_img">
          <span class="dot"
            ><h4>{{ FirstLetter(cycle.cropName) }}</h4></span
          >
        </div>
        <!-- container_list_item_title- Controls the title within the item -->
        <div class="container_list_item_title">{{ cycle.cropName }}</div>
        <!-- container_list_item_Description- Controls the Description within the item -->
        <div class="container_list_item_Description">
          {{ cycle.fieldName + ', ' + cycle.fieldArea + ' דונם' }}
        </div>
      </div>
    </div>
    <!-- container_add-main grid in container_fluid,  Controls open window add crops -->
    <div
      class="container_add"
      v-if="this.toggle == true || this.windowWidth > 760"
    >
      <addCrop />
    </div>
  </div>
</template>

<script>
const fb = require('@/fb.js')
import { mapGetters } from 'vuex'
import moment from 'moment'
import addCrop from '@/components/popups/AddCrop'
import irrigation from '@/components/popups/Irrigation'

export default {
  name: 'MyCrops',
  components: { addCrop, irrigation },
  data() {
    return {
      windowWidth: window.innerWidth,
      toggle: true,
      activeIndex: null,
      deleteDialog: false
    }
  },

  created() {},
  updated() {},

  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }

    // fb.crop.doc('alrnBbp5vtyC0CGsU90i').update({ irrigation: arr })
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'fields',
      'crops',
      'currentCycle',
      'cropCycle'
    ]),
    isDisabled() {
      if (this.currentCycle) return true
      return false
    }
  },
  methods: {
    setCurrentCycle(cycle) {
      this.$store.commit('setCurrentCycle', cycle)
      console.log(this.currentCycle)
    },

    deleteCycle() {
      if (this.currentCycle) {
        fb.cropCycle.doc(this.currentCycle.id).delete()
        this.setCurrentCycle(null)
      }
    },

    calcEndDate() {
      var finishDate = moment(moment(this.currentCycle.startDate, 'DD MM YYYY'))
        .add(this.currentCycle.duration, 'w')
        .format('L')
      return finishDate
    },

    FirstLetter(string) {
      return string.charAt(0)
    },

    changbackground(index) {
      return index % 2 == false ? '#e2e2e2' : '#fafafa'
    },
    togglec(index) {
      this.activeIndex = index
    }
  }
}
</script>

<style scoped>
.active {
  background: rgba(228, 221, 221, 0.75);
  border-color: rgb(204, 203, 203);
  border-bottom-style: solid;
  border-top-style: solid;
  box-shadow: 10px 5px 5px 0px rgba(173, 171, 171, 0.75);
}
/*  ------------icon for open the list in condition media-----------   */
.iconlist {
  display: none;
}
/*  ------------container for all main grid-----------   */
.container_fluid {
  display: grid;
  background-color: #74a748;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1em;
  padding: 15px;
  height: 90vh;
}
/*  ------------main grid for title-----------   */

/*  ------------main grid for list-----------   */
.container_list {
  grid-row: 1/4;
  width: 100%;
  min-width: 200px;
  height: 100%;
  border: 1px solid;
  overflow: auto;
  background-color: snow;
  box-shadow: 5px 10px 8px #888888;
}

.container_list_title {
  width: 95%;
  height: 40px;
  margin: 10px 0 10px 0;
  text-align: center;
}
.container_list .container_list_title {
  margin: 5px;
  height: 20px;
  margin-top: 10px;
  color: rgb(138, 135, 135);
}

.container_list_item {
  height: 60px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 5px auto;

  padding: 5px;
  cursor: pointer;
  transition: box-shadow 2s;
  transition: border-color 2s;
}
.container_list_item:hover {
  border-bottom-style: solid;
  border-top-style: solid;
  border-color: rgb(204, 203, 203);
  box-shadow: 10px 5px 5px 0px rgba(173, 171, 171, 0.75);
}

.container_list_item_img {
  grid-column: 1/1;
  grid-row: 1/3;
}
.container_list_item_title {
  grid-column: 2/4;
  font-weight: 450;
}

.container_list_item_Description {
  grid-column: 2/4;
  font-weight: 350;
}

.dot {
  height: 58px;
  width: 58px;
  display: inline-block;
  color: rgb(150, 147, 147);
  font-size: 35px;
  margin-right: 5px;
}
.dot h4 {
  margin-right: 33%;
  margin-top: 15%;
}
/*  ------------main grid for add-----------   */
.container_add {
  padding-top: 2px;
  width: 100%;
  height: 100%;
  border: 1px solid;
  background-color: snow;
  box-shadow: 5px 10px 8px #888888;
}
/*  ------------main grid for content-----------   */
.container_content {
  grid-column: 2/6;
  grid-row: 1/5;
  border: 1px solid;
  box-shadow: 5px 10px 8px #888888;
  height: 100%;
  background-color: snow;

  display: grid;

  grid-template-columns: repeat(5, 1fr);
}

.container_content_details {
  grid-column: 1/4;

  padding: 20px;
  padding-top: 20px;
  display: grid;

  grid-template-columns: repeat(4, 1fr);
}
.container_content_details span {
  font-size: 20px;
}
.container_content_details_title {
  grid-column: 1/5;

  height: 80%;
}
.container_content_details_kind {
  grid-column: 1/5;

  height: 80%;
}

.container_content_details_dateStart {
  grid-column: 1/3;

  height: 80%;
}
.container_content_details_dateFinish {
  grid-column: 3/5;

  height: 80%;
}
.container_content_details_areaSize {
  grid-column: 1/5;

  height: 80%;
}
.container_content_details_btnEdit {
  grid-column: 1/5;

  height: 80%;
}

.container_content_btn {
  grid-column: 4/4;
  padding: 20px;
  margin-top: 50px;
}
.container_content_btn .button {
  background-color: #4caf50; /* Green */
  border: 1px solid green;
  color: white;
  padding: 5% 10%;
  text-align: center;
  text-decoration: none;
  font-size: 100%;
  cursor: pointer;
  margin-bottom: 40px;
  width: 100%;
  display: block;
  border-radius: 5px;
  box-shadow: 10px 5px 5px 0px rgba(173, 171, 171, 0.75);
  text-transform: uppercase;
}

.container_content_btn .button:not(:last-child) {
  border-bottom: none; /* Prevent double borders */
}

.container_content_btn .button:hover {
  background-color: #848f84;
}
.container_content_btn .button:active {
  box-shadow: none;
}

.container_content_btndel {
  grid-column: 5/6;
  margin-top: 50px;
  padding: 20px;
}
.container_content_btndel .button {
  background-color: rgb(248, 16, 8); /* Green */
  border: 1px solid rgb(7, 8, 7);
  color: white;
  padding: 5% 10%;
  text-align: center;
  text-decoration: none;
  font-size: 100%;
  cursor: pointer;
  margin-bottom: 40px;
  width: 100%;
  display: block;
  border-radius: 5px;
  box-shadow: 10px 5px 5px 0px rgba(173, 171, 171, 0.75);
}
.container_content_btndel .button:active {
  box-shadow: none;
}

/*  ------------media-----------   */

@media screen and (max-width: 759px) {
  .container_fluid {
    height: 600px;
  }
  /*  ------------icon gor open the list in condition media-----------   */
  .iconlist {
    display: inline;
    position: absolute;
    right: -10px;
    top: 250px;
    z-index: 2;
  }

  .container_title .siztitle {
    font-size: 35px;
  }

  .container_content {
    grid-column: 1/6;
    grid-template-columns: repeat(5, 1fr);
  }
  .container_content_btn {
    grid-column: 5/6;
    margin-top: 0px;
    grid-row: 1/2;
    margin-bottom: 0px;
  }

  .container_content_btndel {
    grid-row: 2/3;

    margin: 0;
  }
  .container_content_btndel .button {
    top: 500px;
    margin-bottom: 0;
  }

  .container_content_details {
    grid-column: 1/5;
  }
  .container_content_details_dateFinish {
    margin-right: 10px;
  }

  .container_list {
    grid-column: 1/4;
    grid-row: 1/4;
    z-index: 1;
    height: 100%;
  }
  .container_add {
    grid-column: 1/4;
    grid-row: 4/5;
    z-index: 1;
    width: 200px;
    height: 100%;
    padding-top: 3px;
  }
}
</style>
