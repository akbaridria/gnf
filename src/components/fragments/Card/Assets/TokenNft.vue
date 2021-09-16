<template>
<div :class="`card-wrapper-nft`">
  <Card>
    <template v-slot:default>
      <div :class="`token-sale-wrapper`">
        <GradientText text="Skeleton in your mind #3230" />
        <div :class="`sale-end-wrapper`">
        <TimeOutline style="width:14px;" />
        <Typography
          :variant="`extra-small-text`"
          :color="`white`"
          :truncate="false"
        >
          Sale end in Sept 23, 2021
        </Typography>
        </div>
        <img
          style="margin-bottom: 50px;"
          :class="`image-wrapper`"
          src="https://lh3.googleusercontent.com/x9W-B5-DYFpH0qr7nhTIa4NwYEWfXOIa-9SvJw_kAg0msWKiH8zPIb0lqT7A8Fk0x5TGvOPLckT366vE9M8yuJK0dfvrcT2yN7CEoyE=w600"
        />
      </div>
    </template>
  </Card>
  <div :class="`detail-nft`">
  <Card>
    <template v-slot:default>
      <div :class="`token-sale-wrapper`">
        <Typography
          :variant="`small-text-medium`"
          :color="`white`"
          :truncate="false"
        >
          Owned By #cryptoCommunity
        </Typography>
        <div :class="`price-wrapper`">
            <Typography
          :variant="`small-text-medium`"
          :color="`white`"
          :truncate="false"
        >
          Price
        </Typography>
        <Typography
          :variant="`small-text-medium`"
          :color="`pink-1`"
          :truncate="false"
        >
          345.8 CPAY
        </Typography>
       
        </div>
        <div :class="`button-wrapper`">
         <GradientButton text="Buy Now" />
         </div>
      </div>
    </template>
  </Card>
  <!-- <Card>
    <template v-slot:default>
      <div :class="`token-sale-wrapper`">
        <Typography
          :variant="`small-text-medium`"
          :color="`white`"
          :truncate="false"
        >
          Owned By #cryptoCommunity
        </Typography>
        <div :class="`price-wrapper`">
            <Typography
          :variant="`small-text-medium`"
          :color="`white`"
          :truncate="false"
        >
          Price
        </Typography>
        <Typography
          :variant="`small-text-medium`"
          :color="`pink-1`"
          :truncate="false"
        >
          345.8 CPAY
        </Typography>
       
        </div>
        <div :class="`button-wrapper`">
         <GradientButton text="Buy Now" />
         </div>
      </div>
    </template>
  </Card> -->
  </div>
  
  </div>
  
</template>

<script lang="ts">
import Card from "@/components/elements/Card/Card.vue";
import Typography from "@/components/elements/Typography/Typography.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue"
import GradientButton from "@/components/fragments/Button/GradientButton.vue"
import TimeOutline from "@/assets/Icons/TimeOutline.vue";
export default {
  name: "TokenNft",
  components: {
    Card,
    Typography,
    GradientText,
    GradientButton,
    TimeOutline
  },
};
</script>

<style lang="scss">
.card-wrapper-nft{
    display: flex;
    flex-direction: row;
    & > * {
        margin: 0px 20px;
    }
    
}
.detail-nft{
    display: flex;
    flex-direction: column;
    width: 1000px;
    & > * {
        margin-bottom: 20px;
    }
}
.token-sale-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.button-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 20px;
}
.price-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}
.sale-end-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    & > * {
        margin-right: 6px;
    }
}
</style>