<template>
      <OverlayLoading v-if="loading" />
      <div class="asset-token-wrapper">
        <Logo />
        <Typography variant="large-text--bold" color="white">
          The Owner
        </Typography>
        <Typography variant="large-text" color="white">
          {{ tokenOwner }}
        </Typography>
        <Typography variant="large-text--bold" color="white">
          Token Id
        </Typography>
        <Typography variant="large-text" color="white">
          {{
            `[${$route.query.collectionId}, ${$route.query.seriesId},
        ${$route.query.serialNumber}]`
          }}
        </Typography>
      </div>
</template>

<script>
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
import Logo from "@/components/fragments/Logo/Logo.vue"
import OverlayLoading from "@/components/elements/Overlay/OverlayLoading.vue";
import Typography from "@/components/elements/Typography/Typography.vue";
export default {
  name: "Owner",
  components: {
    OverlayLoading,
    Typography,
    Logo
  },
  data: function () {
    return {
      loading: false,
      tokenOwner: "",
    };
  },
  async mounted() {
    this.$data.loading = true;
    await this.getTokenOwner();
    this.$data.loading = false;
  },
  methods: {
    async getTokenOwner() {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const data = await api.query.nft.tokenOwner(
        [this.$route.query.collectionId, this.$route.query.seriesId],
        this.$route.query.serialNumber
      );
      this.$data.tokenOwner = data.toHuman();
    },
  },
};
</script>

<style lang="scss" scoped>
.asset-token-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 20px;
}
</style>