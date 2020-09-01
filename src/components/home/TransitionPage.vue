<template>
  <div class="main">
    <v-container class="mx-auto">
      <v-layout justify-center>
        <v-card mx-auto max-width="700">
          <v-card-title>היי {{ this.ownerName }},</v-card-title>
          <v-card-text
            >ברוך הבא למשק.נט. בחר באפשרות המתאימה בסרגל, ונתחיל
            לעבוד!</v-card-text
          >
          <v-row>
            <v-img
              src="https://firebasestorage.googleapis.com/v0/b/mesheknetapp.appspot.com/o/app%20base%20files%2FmeshekNet_logo.png?alt=media&token=77731a26-1333-40ad-ad50-77a6b53c9080"
              aspect-ratio="1.7"
              contain
            ></v-img
          ></v-row>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
const fb = require('@/fb.js')

export default {
  name: 'TransitionPage',
  data() {
    return {
      currentUser: null,
      farmName: null,
      ownerName: null,
      loading: true,
    }
  },
  created() {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        this.setDetails()
      }
    })
    this.updateUserNotifications()
  },
  mounted() {},
  updated() {},
  methods: {
    setDetails() {
      this.farmName = this.farms.find((obj) => obj.userId == this.userId).name
      let fullName = this.farmOwners.find((obj) => obj.userId == this.userId)
        .name
      let tempStr = fullName.split(' ')
      this.ownerName = tempStr[0]
    },
    updateUserNotifications() {
      //condition to give notifications only once a day- not every user's login
      let lastLogin = this.users.find((item) => item.userId == this.userId)
        .lastLogin
      if (moment().format('L') != lastLogin) {
        //high temp notif.
        if (this.openWeather.daily[0].temp.day > 30) {
          let notification = {
            id: fb.notification.doc().id,
            title: 'טמפרטורה גבוהה',
            subject: 'וודא צינון הלול',
            mes: 'דאג לצינון הלול. הטמפרטורה כרגע גבוהה מ-30 מעלות צלזיוס.',
            to: this.userId,
          }
          this.$store.commit('NewNotifications', notification)
        }
        //strong wind notif.
        if (this.openWeather.daily[0].wind_speed * 3.6 > 20) {
          let notification = {
            id: fb.notification.doc().id,
            title: 'רוח חזקה במשק',
            subject: 'לא מומלץ ליישם הדברה היום',
            mes: 'משבי רוח של מעל 20 קמ"ש. לא מומלץ ליישם הדברה.',
            to: this.userId,
          }
          this.$store.commit('NewNotifications', notification)
        }
        //low food amount in silo notif.
        this.chickCycle.forEach((obj) => {
          if (obj.currentFood < 500) {
            let coopName = this.coop.find((item) => item.id == obj.coopId)
              .CoopName
            let notification = {
              id: fb.notification.doc().id,
              title: 'כמות תערובת נמוכה',
              subject: 'נותרו פחות מ-500 ק"ג במיכל בלול: ' + coopName,
              mes: 'דאג להזמנת תערובת בהקדם.',
              to: this.userId,
            }
            this.$store.commit('NewNotifications', notification)
          }
        }),
          //chickens Newcastle ill treat notification
          this.chickCycle.forEach((obj) => {
            if (!obj.lastNotification) {
              fb.chickCycle.doc(obj.id).update({
                lastNotification: obj.startDate,
              })
            }

            if (
              moment(obj.lastNotification, 'DD-MM-YYYY').diff(
                moment(obj.startDate, 'DD-MM-YYYY'),
                'months'
              ) >= 3
            ) {
              let notification = {
                id: fb.notification.doc().id,
                title: 'חיסון למחלת ניוקסל - ערפול',
                subject:
                  'עליך לבצע ערפול במחזור תרנגולות שהתחיל ב ' + obj.startDate,
                mes: 'בצע ערפול כנדרש ורשום ביומן המחלות של המחזור.',
                to: this.userId,
              }
              this.$store.commit('NewNotifications', notification)

              fb.chickCycle.doc(obj.id).update({
                lastNotification: moment().format('L'),
              })
            }
          }),
          //irrigation and fertilization notif.
          this.cropCycle.forEach((obj) => {
            this.crops.forEach((item) => {
              if (obj.cropId == item.id) {
                let weatherStation = parseInt(
                  this.farms.find((item) => item.id == this.farmId)
                    .weatherStation
                )
                if (item.irrigation[weatherStation][moment().isoWeek() - 2]) {
                  let notification = {
                    id: fb.notification.doc().id,
                    title: 'השקיה - ' + item.name,
                    subject: 'נדרשת השקיה השבוע',
                    mes: 'אנא הכנס לפרטי הגידול על מנת לקבל פרטים נוספים',
                    to: this.userId,
                  }
                  this.$store.commit('NewNotifications', notification)
                }
                if (
                  item.fertilization.Nitrogen[moment().isoWeek() - 2] ||
                  item.fertilization.Phosphorus[moment().isoWeek() - 2] ||
                  item.fertilization.Potassium[moment().isoWeek() - 2] ||
                  item.fertilization.Urean[moment().isoWeek() - 2]
                ) {
                  let notification = {
                    id: fb.notification.doc().id,
                    title: 'דישון - ' + item.name,
                    subject: 'נדרש דישון השבוע',
                    mes: 'אנא הכנס לפרטי הגידול על מנת לקבל פרטים נוספים',
                    to: this.userId,
                  }
                  this.$store.commit('NewNotifications', notification)
                }
              }
            })
          })
      }
    },
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters([
      'userId',
      'farmId',
      'users',
      'farmOwners',
      'farms',
      'fields',
      'crops',
      'cropCycle',
      'coop',
      'chickCycle',
      'currentMessages',
      'Messages',
      'openWeather',
    ]),
  },
}
</script>

<style scoped>
.main {
  height: 90vh;
}
</style>
