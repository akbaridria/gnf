<template >
  <div :class="`card-nft-default`" @click="$router.push('/assets/tokenId')">
    <div>
      <Typography variant="extra-small-text" color="blue-5"> Owner </Typography>
      <Typography variant="extra-small-text--medium" color="white">
        Skeleton in your mind #3230 Skeleton in your mind #3230 Skeleton in your
        mind #3230 Skeleton in your mind #3230
      </Typography>
    </div>
    <div style="margin-bottom: 5px">
      <img
        :class="`image-wrapper`"
        src="https://lh3.googleusercontent.com/x9W-B5-DYFpH0qr7nhTIa4NwYEWfXOIa-9SvJw_kAg0msWKiH8zPIb0lqT7A8Fk0x5TGvOPLckT366vE9M8yuJK0dfvrcT2yN7CEoyE=w600"
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
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";

.card-nft-default {
  width: 250px;
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
}
</style>