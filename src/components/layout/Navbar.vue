<template>
  <div class="navbar">
    <nav class="light-green darken-4 container_fluid">
      <div class="column_img">
        <router-link :to="{ name: 'Notifications' }" class="brand-logo right"
          ><img
            src="https://firebasestorage.googleapis.com/v0/b/mesheknetapp.appspot.com/o/app%20base%20files%2FmeshekNet_logo.png?alt=media&token=77731a26-1333-40ad-ad50-77a6b53c9080"
            alt="logo"
            height="60"
            width="65"
          />
        </router-link>
      </div>
      <figure class="column_icon right" @click="toggleNav">
        &#9776;
      </figure>
      <div class="column_right">
        <ul
          v-if="
            this.$route.path !== '/signup' &&
            this.$route.path !== '/login' &&
            this.$route.path !== '/'
          "
          ref="nav"
        >
          <li
            @click="toggleNav"
            v-for="link in links.slice().reverse()"
            :key="link.name"
          >
            <router-link class="white-text" :to="{ name: link.route }">{{
              link.name
            }}</router-link>
          </li>
        </ul>
      </div>
      <div
        v-if="
          this.$route.path !== '/signup' &&
          this.$route.path !== '/login' &&
          this.$route.path !== '/'
        "
        class="column_left"
      >
        <ul>
          <li><a class="white-text" @click="logout">התנתק</a></li>
          <li v-if="isAdmin()">
            <router-link class="white-text" :to="{ name: 'Admin' }"
              >מנהל מערכת</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
const fb = require('@/fb.js')
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        { name: 'התראות', route: 'Notifications' },
        { name: 'הגידולים שלי', route: 'MyCrops' },
        { name: 'הלול שלי', route: 'MyCoop' },
        { name: 'מזג אויר', route: 'Weather' },
        { name: 'צור קשר', route: 'Contact' },
      ],
    }
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        //clear store local saved data
        sessionStorage.clear()
        this.$router.push({ name: 'Landing' })
      })
    },
    toggleNav() {
      const nav = this.$refs.nav.classList
      nav.contains('active') ? nav.remove('active') : nav.add('active')
    },
    isAdmin() {
      return this.users.find((obj) => obj.userId == this.userId).admin
    },
  },
  computed: {
    //get local data from firestore using the store
    ...mapGetters(['userId', 'users']),
  },
}
</script>

<style>
.container_fluid {
  width: 100%;
}
.navbar .column_img {
  position: relative;
  left: 7px;
}
.navbar .column_icon {
  margin-right: 100px;
  display: none;
}

.navbar .column_right ul {
  float: right;
  margin-right: 100px;
}
.navbar .column_left {
  float: left;
}

li .router-link-exact-active {
  background-color: rgb(30, 85, 41);
  
  border-bottom: double;
}

@media screen and (max-width: 759px) {
  nav .column_right ul {
    top: 56px;
    background: #33691e;
    position: absolute;
    width: 200px;
    flex-direction: column;
    transform: rotate(180deg);

    display: none;
  }

  nav .column_right ul.active {
    display: block;
    z-index: 99;
  }

  nav .column_right ul li {
    transform: rotate(-180deg);
    width: 100%;
  }

  .navbar .column_icon {
    margin-right: 100px;
    position: relative;

    font-size: 40px;
    display: block;
  }
  .navbar figure {
    cursor: pointer;
    margin: 0;
  }
}
</style>
