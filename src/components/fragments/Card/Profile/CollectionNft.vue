<template>
  <div class="collection-nft-wrapper">
      <CardNft v-for="(index, item) in listNft" :dataNft="index" :key="item" :widthCard="250" />
   
  </div>
</template>

<script>
import CardNft from "@/components/fragments/Card/Marketplace/CardNft.vue"
export default {
    name: 'CollectionNft',
    components: {
        CardNft
    },
    props: {
        listNft: {
            type: Array,
            required:false,
            default: () => []
        }
    }
}
</script>

<style lang="scss">
.collection-nft-wrapper{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    & > * {
        margin: 12px 12px;
    }
}
</style>