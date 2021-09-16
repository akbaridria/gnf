<template>
  <NavigationBar v-if="!isMobile()" />
  <NavigationBarMobile v-if="isMobile()" />
  
</template>
<script lang="ts">
import NavigationBar from "@/components/fragments/Navbar/NavigationBar.vue";
import NavigationBarMobile from "@/components/fragments/Navbar/NavbarMenuMobile.vue";

export default {
  name: "App",
  components: {
    NavigationBar,
    NavigationBarMobile,
  },
  methods: {
    isMobile(){
      return screen.width <=760 ? true : false
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import '@/assets/styles/main.scss';
@import '@/assets/styles/abstract/_variables.scss';

input, textarea, body {
  font-family: "Poppins", sans-serif;
  background-color: $gray-24;
}
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
