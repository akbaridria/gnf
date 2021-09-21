<template>
  <div style="margin: 0 auto">
    <NotConnected v-if="!$store.state.user.isConnected" />
    <DefaultLayout v-else>
      <template v-slot:default>
        <Card style="margin: 0 auto">
          <template v-slot:default>
            <div class="profile-wrapper">
              <div class="avatar">
                <WalletOutline />
              </div>
              <Typography
                variant="large-text"
                color="white"
                style="margin-top: 12px"
              >
                {{ walletName }}
              </Typography>
              <Typography variant="small-text--medium" color="white">
                {{ walletAddress }}
              </Typography>
              <Tab :listTab="listTab" @changeTab="activeTab = $event" />
              <div v-if="noCollectionId">
                <Typography variant="small-text--medium" color="white">
                  Oops! you dont have any collection in trapo
                </Typography>
              </div>
              <div v-else>
                <CollectionNft v-if="activeTab === 'Collection'" :listNft="allNft" />
                <HistoryUser v-if="activeTab === 'History'" />
              </div>
            </div>
          </template>
        </Card>
      </template>
    </DefaultLayout>
  </div>
</template>

<script>
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
import Card from "@/components/elements/Card/Card.vue";
import WalletOutline from "@/assets/Icons/WalletOutline.vue";
import Tab from "@/components/elements/Tab/Tab.vue";
import Typography from "@/components/elements/Typography/Typography.vue";
import store from "@/store/store";
import NotConnected from "@/components/fragments/Card/NotConnected/NotConnected.vue";
import CollectionNft from "@/components/fragments/Card/Profile/CollectionNft.vue";
import HistoryUser from "@/components/fragments/Card/Profile/HistoryUser.vue";
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
import { fetchCheckUser } from "@/utils/utils.js";
// import { toGatewayURL } from "nft.storage";
export default {
  name: "Your Profile",
  components: {
    DefaultLayout,
    Card,
    WalletOutline,
    Tab,
    Typography,
    NotConnected,
    CollectionNft,
    HistoryUser,
  },
  data: function () {
    return {
      listTab: ["Collection", "History"],
      activeTab: "Collection",
      noCollectionId: false,
      dataNft: '',
      collectionId: 0,
      allNft: [],
      seriesId: 0
    };
  },
  watch: {
    "$store.state.user.isConnected"() {
      this.getAllNft();
    },
    async dataNft(newValue){
      const response = await fetch(newValue.data);
      const data = await response.json()
      const GATEWAY = new URL('https://dweb.link/')
      const dataImage = new URL(`/ipfs/${data.image.slice('ipfs://'.length)}`, GATEWAY)
      this.$data.allNft.push({
        collectionId: this.$data.collectionId,
        seriesId: newValue.seriesId,
        name: data.name,
        description: data.description,
        image: dataImage,
        serialNumber: newValue.serialNumber
      })
    }
  },
  computed: {
    walletName() {
      return store.state.user.walletName;
    },
    walletAddress() {
      return store.state.user.walletAddress;
    },
  },
  mounted() {
    if (this.$store.state.user.isConnected) {
      this.getAllNft();
    }
  },
  methods: {
    async getAllNft() {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const collectionId = await this.checkCollectionId(
        this.$store.state.user.walletAddress
      );
      if (typeof collectionId !== "undefined") {
        this.$data.collectionId = collectionId[0].collection_id
        const collecNft = await api.rpc.nft.collectedTokens(
          collectionId[0].collection_id,
          this.$store.state.user.walletAddress
        );
        console.log('disini collect', collecNft.toHuman())
        collecNft.toHuman().forEach(async (element) => {
          
        await api.query.nft.seriesAttributes(
            collectionId[0].collection_id,
            element.seriesId
          ).then((data) => {
            const GATEWAY = new URL('https://dweb.link/')
            this.$data.dataNft = {
              data: new URL(`/ipfs/${data.toHuman()[0].Url.slice('ipfs://'.length)}`, GATEWAY),
              seriesId: element.seriesId, serialNumber:element.serialNumber }
          })
        });
      } else {
        this.$data.noCollectionId = true;
      }
    },
    async checkCollectionId(walletAddress) {
      return await fetchCheckUser({
        wallet_address: walletAddress,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          return data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  border-radius: 50%;
  border: 1px solid white;
  padding: 12px;
  background-color: $primary-8;
}
.profile-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>