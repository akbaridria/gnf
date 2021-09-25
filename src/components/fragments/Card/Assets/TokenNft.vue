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
                {{ Number(parseFloat(priceSell).toFixed(1)).toLocaleString() }}
                CPAY
              </Typography>
            </div>
            <div :class="`button-wrapper`" @click="clickButton">
              <GradientButton :text="actionName" />
            </div>
            <a
              class="btn"
              id="actionButtonSell"
              href="#open-modal-sell"
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
  fetchCheckStatusListing,
  fetchAddUser,
  fetchDeleteUser,
  fetchDeletListing,
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
      actionName: "",
      listingStat: {},
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
      txhash: "",
    };
  },
  watch: {
    async listingId(newValue) {
      await fetchAddTransaction({
        wallet_address: this.$store.state.user.walletAddress,
        listing_id: newValue.toHuman(),
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
        .catch((err) => {
          console.log(err);
          this.$data.loading = false;
          this.$emit("alertToParent", {
            variant: "danger",
            alertText: "Error",
            description: "Oopss.. something went wrong",
          });
        });
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
    async getTokenOwner() {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const data = await api.query.nft.tokenOwner(
        [this.$props.dataNft.collectionId, this.$props.dataNft.seriesId],
        this.$props.dataNft.serialNumber
      );
      this.$data.tokenOwner = data.toHuman();
    },
    async getActionName() {
      await fetchCheckStatusListing({
        token_id: `${this.$props.dataNft.collectionId},${this.$props.dataNft.seriesId},${this.$props.dataNft.serialNumber}`,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .then(async (data) => {
          const { api } = await UseCennznet("app_name", { network: "nikau" });

          if (data.length > 0) {
            const dataPrice = await api.query.nft.listings(data[0].listing_id);
            this.$data.listingStat = data[0];
            this.$data.priceSell =
              dataPrice.toJSON().FixedPrice.fixedPrice / Math.pow(10, 4);
            if (
              this.$data.tokenOwner === this.$store.state.user.walletAddress
            ) {
              this.$data.actionName = "Cancel Listing";
            } else {
              this.$data.actionName = "Buy Now";
            }
          } else {
            if (
              this.$data.tokenOwner === this.$store.state.user.walletAddress
            ) {
              this.$data.actionName = "Sell Now";
            } else {
              this.$data.actionName = "Buy Now";
            }
          }
        })
        .catch((err) => console.log(err));
    },
    clickButton() {
      if (this.$data.actionName === "Sell Now") {
        document.getElementById("actionButtonSell").click();
      }
      if (this.$data.actionName === "Buy Now") {
        this.buyNft();
      }
    },
    async buyNft() {
      this.$data.loading = true;
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const buy = api.tx.nft.buy(this.$data.listingStat.listing_id);
      const allInjected = await web3Enable("app name");
      console.log(allInjected);
      const injector = await web3FromSource("cennznet-extension");
      const signer = injector.signer;
      await buy
        .signAndSend(
          this.$store.state.user.walletAddress,
          { signer },
          async (status) => {
            if (status.isFinalized) {
              this.$data.txhash = status.status.toJSON().Finalized;
              this.$emit("alertShow", {
                variant: "success",
                textAlert: "Submitted",
                alertDescription:
                  "Transaction is Submitted!, wait for 5-10 Minutes while data is being loaded!",
              });
              await this.fetchHistory(this.$data.txhash, "Buy");
              await this.fetchDeleteUserByTokenAndWallet(
                `${this.$props.dataNft.collectionId},${this.$props.dataNft.seriesId},${this.$props.dataNft.serialNumber}`
              );
              await this.fetchInserUser(
                `${this.$props.dataNft.collectionId},${this.$props.dataNft.seriesId},${this.$props.dataNft.serialNumber}`
              );
              await this.fetchDeleteUserListing();
            }
          }
        )
        .catch((err) => {
          console.log(err);
          this.$data.loading = false;
          this.$emit("alertToParent", {
            variant: "danger",
            alertText: "Error",
            description: "Oopss.. something went wrong, with your transaction",
          });
        });
    },
    async fetchInserUser(newValue) {
      await fetchAddUser({
        wallet_address: this.$store.state.user.walletAddress,
        token_id: newValue.toString(),
        price: this.$data.priceSell,
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          this.$data.loading = false;
          console.log(error);
        });
    },
    async fetchDeleteUserListing() {
      await fetchDeletListing({
        listingId: this.$data.listingStat.listing_id,
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          this.$data.loading = false;
          console.log(error);
        });
    },
    async fetchDeleteUserByTokenAndWallet(newValue) {
      await fetchDeleteUser({
        token_id: newValue.toString(),
      })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          this.$data.loading = false;
          this.$emit("alertToParent", {
            variant: "danger",
            alertText: "Error",
            description: "Oopss.. Error to Delete User",
          });
        });
    },

    async fetchHistory(txHash, event) {
      await fetchAddHistory({
        wallet_address: this.$store.state.user.walletAddress,
        event_name: event,
        tx_hash: txHash,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          this.$data.loading = false;
        });
    },

    async callAction(value) {
      console.log(value);
      this.$data.loading = true;
      this.$data.priceSell = value;
      console.log(this.$data.priceSell);
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      const sell = api.tx.nft.sell(
        [
          this.$props.dataNft.collectionId,
          this.$props.dataNft.seriesId,
          this.$props.dataNft.serialNumber,
        ],
        null,
        16001,
        Math.pow(10, 4) * value,
        null
      );
      const allInjected = await web3Enable("app name");
      console.log(allInjected);
      const injector = await web3FromSource("cennznet-extension");
      const signer = injector.signer;
      let counter = 0;
      sell
        .signAndSend(
          this.$store.state.user.walletAddress,
          { signer },
          async (status) => {
            if (status.isFinalized) {
              this.$data.txhash = status.status.toJSON().Finalized;
              await this.fetchHistory(this.$data.txhash, "Sell");
              this.$data.loading = false;
              this.$emit("alertShow", {
                variant: "success",
                textAlert: "Submitted",
                alertDescription:
                  "Transaction is Submitted!, wait for 5-10 Minutes while data is being loaded!",
              });
            }
            status.events.forEach(async (element) => {
              if (element.event.section === "nft" && counter === 0) {
                counter += 1;
                this.$data.listingId = element.event.data[1];
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