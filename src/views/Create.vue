<template>
  <DefaultLayout>
    <template v-slot:default>
      <CardCreate v-if="isConnectToWallet" :isCollection="isThereCollection" @alertShow="alertShow($event)" />
      <NotConnected v-if="!isConnectToWallet" />
    </template>
  </DefaultLayout>
  <Alert
    v-if="showAlert"
    :variant="variantAlert"
    :alertText="textAlert"
    :alertDescription="descriptionAlert"
  />
</template>

<script>
import { fetchCheckUser } from "@/utils/utils.js";
import CardCreate from "@/components/fragments/Card/Create/CardCreate.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import NotConnected from "@/components/fragments/Card/NotConnected/NotConnected.vue";
import Alert from "@/components/elements/Alert/Alert.vue"
export default {
  name: "Create",
  components: {
    CardCreate,
    DefaultLayout,
    NotConnected,
    Alert
  },
  data: function () {
    return {
      payload: {
        wallet_address: this.$store.state.user.walletAddress,
      },
      isConnectToWallet: this.$store.state.user.isConnected,
      isThereCollection: false,
      variantAlert: "",
      textAlert: "",
      descriptionAlert: "",
      showAlert: false,
    };
  },
  watch: {
    "$store.state.user.isConnected": function () {
      this.$data.isConnectToWallet = this.$store.state.user.isConnected;
      this.$data.payload.wallet_address = this.$store.state.user.walletAddress;
      this.fetchUser();
    },
  },
  mounted() {
    if (this.$store.state.user.isConnected) {
      this.fetchUser();
    }
  },
  methods: {
    alertShow(value) {
      this.$data.variantAlert = value.variant
      this.$data.textAlert = value.textAlert
      this.$data.descriptionAlert = value.alertDescription
      this.$data.showAlert = true
      setTimeout(() => this.$data.showAlert = false, 4000)
    },
    async fetchUser() {
      await fetchCheckUser(this.$data.payload)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          this.$data.isThereCollection = data.length > 0 ? true : false;
        })
        .catch((error) => console.log(error));
      console.log(this.$data.isThereCollection);
    },
  },
};
</script>

<style>
</style>