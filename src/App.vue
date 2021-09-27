<template>
  <NavigationBar v-if="!isMobile()" @showAlert="alertShow($event)" />
  <NotConnected v-if="isMobile()" :text="`Oops Trapo currently only available on chorme desktop only`" />
  <Alert
    v-if="showAlert"
    :variant="variantAlert"
    :alertText="textAlert"
    :alertDescription="descriptionAlert"
  />
</template>
<script >
import NavigationBar from "@/components/fragments/Navbar/NavigationBar.vue";
import Alert from "@/components/elements/Alert/Alert.vue";
import NotConnected from "@/components/fragments/Card/NotConnected/NotConnected.vue"
export default {
  name: "App",
  components: {
    NavigationBar,
    Alert,
    NotConnected
  },
  data: function () {
    return {
      variantAlert: "",
      textAlert: "",
      descriptionAlert: "",
      showAlert: false,
    };
  },
  methods: {
    isMobile() {
      return screen.width <= 760 ? true : false;
    },
    alertShow(value) {
      this.$data.variantAlert = value.variant
      this.$data.textAlert = value.textAlert
      this.$data.descriptionAlert = value.alertDescription
      this.$data.showAlert = true
      setTimeout(() => this.$data.showAlert = false, 4000)
    }
  },
  
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
@import "@/assets/styles/main.scss";
@import "@/assets/styles/abstract/_variables.scss";

input,
textarea,
body {
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
