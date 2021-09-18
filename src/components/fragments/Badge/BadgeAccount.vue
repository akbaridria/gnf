<template>
  <div class="wallet-account">
    <div class="wallet-icon-container">
      <WalletOutline />
    </div>
    <div class="wallet-name-wrapper">
      <Typography variant="small-text--medium" color="white">
        {{ accountName }}
      </Typography>
      <Typography variant="extra-small-text" color="gray-8">
        {{ walletAddress }}
      </Typography>
    </div>
    <div>
      <BaseButton :text="`${balance} CPAY`" />
    </div>
  </div>
</template>

<script lang="ts">
import WalletOutline from "@/assets/Icons/WalletOutline.vue";
import Typography from "@/components/elements/Typography/Typography.vue";
import BaseButton from "@/components/elements/Button/BaseButton.vue";
export default {
  name: "BadgeAccount",
  components: {
    WalletOutline,
    Typography,
    BaseButton,
  },
  props: {
    accountName: {
      type: String,
      required: false,
      default: "wallet-name",
    },
    walletAddress: {
      type: String,
      required: false,
      default: "0x",
    },
    balance: {
      type: Number,
      required: false,
      default: 0,
    },
  },
};
</script>

<style lang="scss">
.wallet-account {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.wallet-icon-container {
  display: flex;
  align-items: center;
  width: 30px;
  margin: 0px 5px;
}
.wallet-name-wrapper {
  width: 100px;
  margin: 0px 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>