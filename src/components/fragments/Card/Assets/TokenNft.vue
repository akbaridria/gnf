<template>
  <div :class="`card-wrapper-nft`">
    <Card>
      <template v-slot:default>
        <div :class="`token-sale-wrapper`">
          <GradientText :text="dataNft.name" />
          <div :class="`sale-end-wrapper`">
            <!-- <TimeOutline style="width:14px;" />
        <Typography
          :variant="`extra-small-text`"
          :color="`white`"
          :truncate="false"
        >
          Sale end in Sept 23, 2021
        </Typography> -->
          </div>
          <img
            style="margin-bottom: 50px; width: 100%"
            :class="`image-wrapper`"
            :src="dataNft.image"
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
              style="margin-bottom: 24px"
            >
              Owned By {{ tokenOwner }}
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
                {{ dataNft.price ? dataNft.price : 0 }} CPAY
              </Typography>
            </div>
            <div :class="`button-wrapper`">
              <GradientButton :text="getActionName()" />
            </div>
          </div>
        </template>
      </Card>
      <Card>
        <template v-slot:default>
          <div :class="`token-sale-wrapper`">
            <Typography
              :variant="`small-text-medium`"
              :color="`white`"
              :truncate="false"
            >
              Description
            </Typography>
            <div :class="`price-wrapper`">
              <Typography
                :variant="`small-text-medium`"
                :color="`white`"
                :truncate="false"
                style="padding: 14px 0px"
              >
                <q>{{ dataNft.description }}</q>
              </Typography>
            </div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "@/components/elements/Card/Card.vue";
import Typography from "@/components/elements/Typography/Typography.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue";
import GradientButton from "@/components/fragments/Button/GradientButton.vue";
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";

// import TimeOutline from "@/assets/Icons/TimeOutline.vue";
export default {
  name: "TokenNft",
  components: {
    Card,
    Typography,
    GradientText,
    GradientButton,
    // TimeOutline
  },
  props: {
    dataNft: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data: function () {
    return {
      tokenOwner: "",
    };
  },
  mounted() {
    this.getTokenOwner();
  },
  methods: {
    async getTokenOwner() {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const data = await api.query.nft.tokenOwner(
        [this.$props.dataNft.collectionId, this.$props.dataNft.seriesId],
        this.$props.dataNft.serialNumber
      );
      this.$data.tokenOwner = data.toHuman();
    },
    getActionName() {
      let name = "Buy Now";
      console.log(this.$data.tokenOwner.toUpperCase());
      console.log(this.$store.state.user.walletAddress.toUpperCase());
      if (
        this.$data.tokenOwner.toUpperCase() ===
        this.$store.state.user.walletAddress.toUpperCase()
      ) {
        name = "Sell Now";
      }
      return name;
    },
  },
};
</script>

<style lang="scss">
.card-wrapper-nft {
  display: flex;
  flex-direction: row;
  & > * {
    margin: 0px 20px;
  }
}
.detail-nft {
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
.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 20px;
}
.price-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.sale-end-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin-right: 6px;
  }
}
</style>