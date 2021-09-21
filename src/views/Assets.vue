<template>
<DefaultLayout>
  <template v-slot:default>
  <div class="asset-token-wrapper">
    <TokenNft :dataNft="$route.params" />
  </div>
  </template>
</DefaultLayout>
</template>

<script lang="ts">
import DefaultLayout from "@/components/layouts/DefaultLayout.vue"
import TokenNft from "@/components/fragments/Card/Assets/TokenNft.vue";
export default {
  name: "assets",
  components: {
    TokenNft,
    DefaultLayout
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