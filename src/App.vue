<template>
  <NavigationBar />
</template>
<script lang="ts">
import NavigationBar from "@/components/fragments/Navbar/NavigationBar.vue";
export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
body {
  font-family: "Poppins", sans-serif;
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
