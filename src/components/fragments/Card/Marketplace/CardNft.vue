<template >
  <div
    :class="`card-nft-default`"
    :style="`width: ${widthCard}px`"
    @click="goToAsset"
  >
    <div>
      <Typography variant="extra-small-text" color="blue-5">
        #{{ dataNft.collectionId }}
      </Typography>
      <Typography variant="extra-small-text--medium" color="white">
        {{ dataNft.name }}
      </Typography>
    </div>
    <div style="margin-bottom: 5px">
      <img :class="`image-wrapper`" :src="dataNft.image" />
    </div>
    <Typography variant="extra-small-text" color="blue-5"> Price </Typography>
    <Typography variant="extra-small-text--medium" color="white">
      {{
        dataNft.price ? Number(parseFloat(dataNft.price).toFixed(2)).toLocaleString() : 0
      }}
      CPAY
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
    widthCard: {
      type: Number,
      required: false,
      default: 250,
    },
    dataNft: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  methods: {
    goToAsset() {
      this.$router.push({ name: "Assets", query: this.$props.dataNft });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/_variables.scss";

.card-nft-default {
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  border-image: $gradient-1;
  border-image-slice: 1;
  padding: 12px 12px;
  cursor: pointer;
  height: fit-content;
  &:hover {
    transform: translateY(-10px);
  }
}
.image-wrapper {
  width: 100%;
  height: 100%;
  padding: 12px 0px;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  &:hover {
    -webkit-filter: grayscale(0);
    filter: grayscale(0);
  }
}
</style>