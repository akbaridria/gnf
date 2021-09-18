<template>
  <DefaultLayout>
    <template v-slot:default>
      <Card>
        <template v-slot:default>
          <div :class="`marketplace-wrapper`">
          <CardFromSearch />
          <CardNfts />
          </div>
        </template>
      </Card>
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import Card from "@/components/elements/Card/Card.vue";
import CardFromSearch from "@/components/fragments/Card/Marketplace/CardFormSearch.vue";
import CardNfts from "@/components/fragments/Card/Marketplace/CardNfts.vue";
export default {
  name: 'Home',
  components : {
    DefaultLayout,
    Card,
    CardFromSearch,
    CardNfts,
  }
}
</script>
<style lang="scss">
.marketplace-wrapper{
  display: flex;
  flex-direction: column;
}

</style>
