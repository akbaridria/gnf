<template >
  <div :class="`card-nfts-wrapper`">
      <CardNft v-for="index in 100" :key="index" />
  </div>
</template>

<script lang="ts">
import CardNft from "@/components/fragments/Card/Marketplace/CardNft.vue"
export default {
    name: 'CardNfts',
    components: {
        CardNft
    }
}
</script>

<style lang="scss">
.card-nfts-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    & > * {
        margin: 12px 12px;
    }
}

</style>