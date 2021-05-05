<template>
  <nav>
    <v-app-bar color="#F5F5F5" class="black--text" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        <span class="font-weight-light">Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="disconnect" text>
        <span>Exit</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app class="blue">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <p class="white--text subheading mt-1 text-center">
            {{ this.user.firstname }} {{ this.user.lastname }}
          </p>
        </v-flex>
        <v-flex class="mt-4 mb-4">
          <PopupRelative v-bind:links="links"
          />
        </v-flex>
      </v-layout>
      <v-list flat>
        <v-list-item
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
          active-class="blue"
        >
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import PopupRelative from "../Relative/PopupRelative.vue";
export default {
  data: () => ({
    user: {},
    drawer: true,
    links: [],
  }),
  components: {
    PopupRelative,
  },
  methods: {
    disconnect() {
      this.$session.destroy();
      this.$router.replace({ name: "HomePage" });
    },
    async getInfos() {
      let token = this.$session.get("token");
      const header = new Headers();
      header.append("Authorization", token);
      return fetch("https://ter-garmin.herokuapp.com/api/users/Dashboard", {
        method: "GET",
        headers: header,
      })
        .then((response) => {
          response.json().then((response) => {
            this.user = response.user;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.getInfos();
  },
};
</script>
