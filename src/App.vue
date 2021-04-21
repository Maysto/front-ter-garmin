<template>
  <v-app id="app">
    <v-content class="ma-4">
      <router-view></router-view>
      </v-content>
    <Footer />
  </v-app>
</template>


<script>

import Footer from '@/components/Footer'
export default {
  name: "App",

  components: {
   Footer
  },
};
</script>
