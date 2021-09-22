<template>
<NotConnected v-if="!$store.state.user.isConnected" />
<DefaultLayout v-else >
  <template v-slot:default>
  <div class="asset-token-wrapper">
    <TokenNft :dataNft="$route.query" @alertToParent="alertFromChild($event)"  />
  </div>
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
import DefaultLayout from "@/components/layouts/DefaultLayout.vue"
import TokenNft from "@/components/fragments/Card/Assets/TokenNft.vue";
import Alert from "@/components/elements/Alert/Alert.vue";
import NotConnected from "@/components/fragments/Card/NotConnected/NotConnected.vue";
export default {
  name: "assets",
  components: {
    TokenNft,
    DefaultLayout,
    Alert,
    NotConnected
  },
  data: function(){
    return {
      variantAlert: '',
      textAlert: '',
      descriptionAlert:'',
      showAlert: false,
    }
  },
  methods: {
    alertFromChild(value){
      this.$data.textAlert = value.alertText
      this.$data.variantAlert = value.variant
      this.$data.descriptionAlert = value.description
      this.$data.showAlert = true
      setTimeout(() => this.$data.showAlert = false, 4000)
    }
  }
};
</script>

<style lang="scss">
.asset-token-wrapper{
  display: flex;
  margin: 0 auto;
  justify-content: center;
  width: 800px;
}
</style>