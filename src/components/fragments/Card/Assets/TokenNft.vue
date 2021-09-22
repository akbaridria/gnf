<template>
  <div :class="`card-wrapper-nft`">
    <OverlayLoading v-if="loading" />

    <div style="width: 400px">
      <Card>
        <template v-slot:default>
          <div :class="`token-sale-wrapper-image`">
            <GradientText
              :text="`${dataNft.name} #${dataNft.collectionId}${dataNft.seriesId}${dataNft.serialNumber}`"
            />
            <div
              v-if="listingStat.timestamp"
              style="margin-bottom: 24px"
              :class="`sale-end-wrapper`"
            >
              <TimeOutline style="width: 14px" />
              <Typography
                :variant="`extra-small-text`"
                :color="`white`"
                :truncate="false"
              >
                Sale start at
                {{
                  new Date(listingStat.timestamp).toLocaleDateString(
                    undefined,
                    options
                  )
                }}
              </Typography>
            </div>
            <img
              style="margin-bottom: 50px; width: 100%"
              :class="`image-wrapper`"
              :src="dataNft.image"
            />
          </div>
        </template>
      </Card>
    </div>
    <div :class="`detail-nft`">
      <Card>
        <template v-slot:default>
          <div :class="`token-sale-wrapper`">
            <Typography
              :variant="`small-text-medium`"
              :color="`white`"
              :truncate="false"
            >
              Owned By
            </Typography>
            <Typography
              :variant="`extra-small-text`"
              :color="`white`"
              :truncate="false"
              class="text-wrapper-owner"
            >
              {{ tokenOwner }}
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
            <div :class="`button-wrapper`" @click="clickButton">
              <GradientButton :text="actionName" />
            </div>
            <a
              class="btn"
              id="actionButton"
              href="#open-modal"
              style="display: none"
            ></a>
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
                :variant="`extra-small-text`"
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
      <Modal
        @errorNumber="$emit('alertToParent', $event)"
        @submitAndSell="callAction($event)"
      />
    </div>
  </div>
</template>

<script>
import Card from "@/components/elements/Card/Card.vue";
import Typography from "@/components/elements/Typography/Typography.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue";
import GradientButton from "@/components/fragments/Button/GradientButton.vue";
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
import { web3FromSource, web3Enable } from "@polkadot/extension-dapp";
import Modal from "@/components/elements/Modal/Modal.vue";
import TimeOutline from "@/assets/Icons/TimeOutline.vue";
import {
  fetchAddTransaction,
  fetchAddHistory,
  fetchCheckListingById,
  fetchDeleteListing,
} from "@/utils/utils.js";
import OverlayLoading from "@/components/elements/Overlay/OverlayLoading.vue";
export default {
  name: "TokenNft",
  components: {
    Card,
    Typography,
    GradientText,
    GradientButton,
    OverlayLoading,
    Modal,
    TimeOutline,
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
      listingId: 0,
      loading: false,
      showModal: false,
      priceSell: 0,
      actionName: "Buy Now",
      listingStat: {},
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };
  },
  watch: {
    async listingId(newValue) {
      await fetchAddTransaction({
        wallet_address: this.$store.state.user.walletAddress,
        listing_id: newValue,
        type: "Sell",
        sold: false,
        token_id: `${this.$props.dataNft.collectionId},${this.$props.dataNft.seriesId},${this.$props.dataNft.serialNumber}`,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      console.log(this.$props.dataNft.name);
      await fetchAddHistory({
        wallet_address: this.$store.state.user.walletAddress,
        event_name: "Sell",
        price: this.$data.priceSell,
        nft_name: this.$props.dataNft.name,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .catch((err) => console.log(err));
      this.$data.loading = false;
      this.$emit("alertToParent", {
        variant: "success",
        alertText: "Success",
        description: "Transaction is submitted, you can see it in explorer.",
      });
    },
  },
  async mounted() {
    this.$data.loading = true;
    await this.getTokenOwner();
    await this.getActionName();
    this.$data.loading = false;
  },
  methods: {
    clickButton() {
      if (this.$data.actionName == "Sell Now") {
        document.getElementById("actionButton").click();
      }
      if (this.$data.actionName == "Cancel Listing") {
        this.cancelListingNft();
      }
      if(this.$data.actionName == "Buy Now"){
        this.buyNft()
      }
    },
    async buyNft(){
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const buy = api.tx.nft.buy(this.$data.listingStat.listing_id)
      const allInjected = await web3Enable("app name");
      console.log(allInjected);
      const injector = await web3FromSource("cennznet-extension");
      const signer = injector.signer;
      const status = await buy.signAndSend(
        this.$store.state.user.walletAddress,
        { signer }
      );
      if (status) {
        await fetchDeleteListing({
          listingId: parseInt(this.$data.listingStat.listing_id),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return Promise.reject("something went wrong!");
            }
          })
          .catch((err) => console.log(err));
        await fetchAddHistory({
          wallet_address: this.$store.state.user.walletAddress,
          event_name: "Buy",
          price: this.$props.dataNft.price ? this.$props.dataNft.price : 0,
          nft_name: this.$props.dataNft.name,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return Promise.reject("something went wrong!");
            }
          })
          .catch((err) => console.log(err));
        this.$emit("alertToParent", {
          variant: "success",
          alertText: "Submitted",
          description:
            "Your transaction successfully submit! check it on explorer.",
        });
      }
    },
    async cancelListingNft() {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const cancel = await api.tx.nft.cancelSale(
        this.$data.listingStat.listing_id
      );
      const allInjected = await web3Enable("app name");
      console.log(allInjected);
      const injector = await web3FromSource("cennznet-extension");
      const signer = injector.signer;
      const status = await cancel.signAndSend(
        this.$store.state.user.walletAddress,
        { signer }
      );
      console.log(status.toHuman());
      if (status) {
        await fetchDeleteListing({
          listingId: parseInt(this.$data.listingStat.listing_id),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return Promise.reject("something went wrong!");
            }
          })
          .catch((err) => console.log(err));
        await fetchAddHistory({
          wallet_address: this.$store.state.user.walletAddress,
          event_name: "Cancel Listing",
          price: this.$props.dataNft.price ? this.$props.dataNft.price : 0,
          nft_name: this.$props.dataNft.name,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return Promise.reject("something went wrong!");
            }
          })
          .catch((err) => console.log(err));
        this.$emit("alertToParent", {
          variant: "success",
          alertText: "Submitted",
          description:
            "Your transaction successfully submit! check it on explorer.",
        });
      }
    },
    async getTokenOwner() {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const data = await api.query.nft.tokenOwner(
        [this.$props.dataNft.collectionId, this.$props.dataNft.seriesId],
        this.$props.dataNft.serialNumber
      );
      this.$data.tokenOwner = data.toHuman();
    },
    async getActionName() {
      await fetchCheckListingById({
        token_id: `${this.$props.dataNft.collectionId},${this.$props.dataNft.seriesId},${this.$props.dataNft.serialNumber}`,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          if (data.length > 0) {
            this.$data.listingStat = data[0];
            if (
              this.$data.tokenOwner.toUpperCase() ===
              this.$store.state.user.walletAddress.toUpperCase()
            ) {
              this.$data.actionName = "Cancel Listing";
            }
          } else {
            if (
              this.$data.tokenOwner.toUpperCase() ===
              this.$store.state.user.walletAddress.toUpperCase()
            ) {
              this.$data.actionName = "Sell Now";
            }
          }
        })
        .catch((err) => console.log(err));
      // const { api } = await UseCennznet("app_name", { network: "nikau" });
      // const status = api.derive.nft.tokenInfo([this.$props.dataNft.collectionId, this.$props.dataNft.seriesId,this.$props.dataNft.serialNumber])
      // console.log('statusss token', status)
    },
    async callAction(value) {
      this.$data.loading = true;
      this.$data.priceSell = value;
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      if (this.$data.actionName === "Sell Now") {
        const sell = api.tx.nft.sell(
          [
            this.$props.dataNft.collectionId,
            this.$props.dataNft.seriesId,
            this.$props.dataNft.serialNumber,
          ],
          null,
          16000,
          value,
          null
        );
        const allInjected = await web3Enable("app name");
        console.log(allInjected);
        const injector = await web3FromSource("cennznet-extension");
        const signer = injector.signer;
        sell
          .signAndSend(
            this.$store.state.user.walletAddress,
            { signer },
            (status) => {
              status.toHuman().events.forEach((element) => {
                if (element.event.section === "nft") {
                  this.$data.listingId = element.event.data[1];
                  this.$data.loading = false;
                }
              });
            }
          )
          .catch((err) => {
            console.log(err);
            this.$data.loading = false;
            this.$emit("alertToParent", {
              variant: "danger",
              alertText: "Error",
              description: "Oopss.. something went wrong",
            });
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.card-wrapper-nft {
  display: flex;
  flex-direction: row;
  & > * {
    margin: 0px 20px;
  }
}
.text-wrapper-owner {
  width: 400px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 20px;
}
.detail-nft {
  display: flex;
  flex-direction: column;
  width: 500px;
  & > * {
    margin-bottom: 20px;
  }
}
.token-sale-wrapper-image {
  display: flex;
  flex-direction: column;
  padding: 12px 12px;
  width: 100%;
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
}
.price-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.image-wrapper {
  background: #eef2f7;
  border-radius: 15px;
  padding: 0.25em;
  margin: 0 0 0.5em;
  box-shadow: 0px 5px 5px rgba(255, 255, 255, 0.25);
  margin: 18px 0px;

  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
  -webkit-transition: 0.3s ease-in-out;
  transition: 0.3s ease-in-out;
  &:hover {
    -webkit-filter: grayscale(0);
    filter: grayscale(0);
  }
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