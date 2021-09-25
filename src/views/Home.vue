<template>
  <OverlayLoading v-if="loading" />
  <DefaultLayout>
    <template v-slot:default>
      <Card>
        <template v-slot:default>
          <div :class="`marketplace-wrapper`">
            <CardFromSearch :total="listNft.length" />
            <CollectionNft :listNft="listNft" />
          </div>
        </template>
      </Card>
    </template>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import Card from "@/components/elements/Card/Card.vue";
import CardFromSearch from "@/components/fragments/Card/Marketplace/CardFormSearch.vue";
import OverlayLoading from "@/components/elements/Overlay/OverlayLoading.vue";
import { fetchAllListing, toGateWay } from "@/utils/utils.js";
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
import CollectionNft from "@/components/fragments/Card/Profile/CollectionNft.vue"
// import CardNfts from "@/components/fragments/Card/Marketplace/CardNfts.vue";
export default {
  name: "Home",
  components: {
    DefaultLayout,
    Card,
    CardFromSearch,
    OverlayLoading,
    CollectionNft
    // CardNfts,
  },
  data: function () {
    return {
      loading: false,
      dataNfts: [],
      listNft: [],
    };
  },
  async mounted() {
    this.$data.loading = true;
    await this.getAllNft();
    this.$data.loading = false;
  },
  watch: {
    async dataNfts(newValue) {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      newValue.forEach(async (element) => {
        const dataPrice = await api.query.nft.listings(element.listing_id);
        const metaDataNft = await api.query.nft.seriesAttributes(
          dataPrice.toJSON().FixedPrice.tokens[0][0],
          dataPrice.toJSON().FixedPrice.tokens[0][1]
        );
        await fetch(toGateWay(metaDataNft.toJSON()[0].Url).href)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.log(response);
              return Promise.reject("something went wrong!");
            }
          })
          .then((data) => {
            this.$data.listNft.push({
              collectionId: dataPrice.toJSON().FixedPrice.tokens[0][0],
              seriesId: dataPrice.toJSON().FixedPrice.tokens[0][1],
              name: data.name,
              description: data.description,
              image: toGateWay(data.image),
              serialNumber: dataPrice.toJSON().FixedPrice.tokens[0][2],
              price: parseFloat(dataPrice.toJSON().FixedPrice.fixedPrice)/Math.pow(10,4)
            });
          })
          .catch((error) => console.log(error));
      });
    },
  },
  methods: {
    async getAllNft() {
      await fetchAllListing({})
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          this.$data.dataNfts = data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
<style lang="scss">
.marketplace-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
