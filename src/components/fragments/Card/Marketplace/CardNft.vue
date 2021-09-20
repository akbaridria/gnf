<template >
  <div :class="`card-nft-default`" :style="`width: ${widthCard}px`" @click="$router.push('/assets/tokenId')">
    <div>
      <Typography variant="extra-small-text" color="blue-5"> #{{dataNft.collectionId}} </Typography>
      <Typography variant="extra-small-text--medium" color="white">
        {{ dataNft.name }}
      </Typography>
    </div>
    <div style="margin-bottom: 5px">
      <img
        :class="`image-wrapper`"
        :src="dataNft.image"
      />
    </div>
    <Typography variant="extra-small-text" color="blue-5"> Price </Typography>
    <Typography variant="extra-small-text--medium" color="white">
      345.34 CPAY
    </Typography>
  </div>
</template>

<script lang="ts">
import Typography from "@/components/elements/Typography/Typography.vue";
export default {
  name: "CardNft",
  components: {
    Typography,
  },
  props: {
    widthCard : {
      type: Number,
      required:false,
      default: 250
    },
    dataNft: {
      type: Object,
      required:false,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";

.card-nft-default {
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  border-image: $gradient-1;
  border-image-slice: 1;
  padding: 12px 12px;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
  }
}
.image-wrapper {
  width: 100%;
  height: 100%;
  padding: 12px 0px;
}
</style>