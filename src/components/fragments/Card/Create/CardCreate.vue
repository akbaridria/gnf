<template>
  <div style="margin: 0 auto">
    <OverlayLoading v-if="loading" />
    <div :class="`card-wrapper-create`" v-if="!showDif">
      <Card>
        <template v-slot:default>
          <div :class="`form-create-collection`">
            <GradientText
              text="Create Your Trapo Collection"
              style="margin: 0 auto"
            />
            <div :class="`wrapper-form-collection`">
              <InputSearch
                placeholder="Name Of your Collection"
                @inputValue="getInputCollection($event)"
              />
              <GradientButton text="Create" @click="addCollection" />
            </div>
          </div>
        </template>
      </Card>
    </div>
    <div :class="`card-wrapper-create-nft`" v-if="showDif">
      <Card>
        <template v-slot:default>
          <div :class="`form-create-nft`">
            <GradientText text="Create Your Nft" />
            <InputSearch
              placeholder="Name Of your Nft"
              @inputValue="getNftName($event)"
            />
            <TextArea @inputTextArea="getTextAreaData($event)" />
            <ImageOutline
              v-if="!imageShow"
              style="width: 150px; margin: 0 auto"
            />
            <div
              v-if="imageShow"
              style="max-width: 150px; margin: 0 auto; padding: 20px 0px"
            >
              <img :src="imageData" style="width: 150px;" />
            </div>
            <BaseButton text="Upload File" @click="clickImage" />
            <input
              type="file"
              id="inputFile"
              accept="image/*"
              @change="changeNftImage($event)"
              enctype="multipart/form-data"
              style="display: none"
            />
          </div>
        </template>
      </Card>
      <Card>
        <template v-slot:default>
          <GradientButton text="Create Nft" @click="processMintNft" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
import { web3FromSource, web3Enable } from "@polkadot/extension-dapp";
import { fetchAddUser, fetchCheckUser } from "@/utils/utils.js";
import { NFTStorage } from "nft.storage";
const apiKey = process.env.VUE_APP_NFTSTORAGE;
const client = new NFTStorage({ token: apiKey });
import Card from "@/components/elements/Card/Card.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue";
import InputSearch from "@/components/fragments/Input/InputSearch/InputSearch.vue";
import GradientButton from "@/components/fragments/Button/GradientButton.vue";
import TextArea from "@/components/fragments/Input/Textarea/TextArea.vue";
import BaseButton from "@/components/elements/Button/BaseButton.vue";
import ImageOutline from "@/assets/Icons/ImageOutline.vue";
import OverlayLoading from "@/components/elements/Overlay/OverlayLoading.vue";
export default {
  name: "CardCreate",
  components: {
    Card,
    GradientText,
    InputSearch,
    GradientButton,
    TextArea,
    BaseButton,
    ImageOutline,
    OverlayLoading,
  },
  props: {
    isCollection: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: function () {
    return {
      collectionName: "",
      collectionId: 0,
      showDif: false,
      imageShow: false,
      imageData: "",
      fileType: "",
      nftName: "",
      nftDescription: "",
      fileImage: "",
      loading: false,
    };
  },
  watch: {
    isCollection(newValue) {
      this.$data.showDif = newValue;
    },
    async collectionId(newValue) {
      await fetchAddUser({
        wallet_address: this.$store.state.user.walletAddress,
        collection_id: newValue,
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
          this.$data.showDif = true;
          this.$emit("alertShow", {
            variant: "success",
            textAlert: "Success",
            alertDescription: "Transaction is completed!",
          });
        })
        .catch((error) => console.log(error));
    },
  },
  methods: {
    getTextAreaData(data) {
      this.$data.nftDescription = data;
    },
    getNftName(nameNft) {
      this.$data.nftName = nameNft;
    },
    clickImage() {
      document.getElementById("inputFile").click();
    },
    changeNftImage(e) {
      this.$data.fileImage = e.target.files[0];
      this.$data.imageData = URL.createObjectURL(this.$data.fileImage);
      this.$data.fileType = e.target.files[0].type;
      this.$data.imageShow = true;
    },
    getInputCollection(value) {
      this.$data.collectionName = value;
    },
    async addCollection() {
      const { api } = await UseCennznet("app_name", { network: "nikau" });
      let create = api.tx.nft.createCollection(
        this.$data.collectionName,
        null,
        null
      );
      const allInjected = await web3Enable("app name");
      console.log(allInjected);
      const injector = await web3FromSource("cennznet-extension");
      const signer = injector.signer;
      await create
        .signAndSend(
          this.$store.state.user.walletAddress,
          { signer },
          (status) => {
            status.toHuman().events.forEach((element) => {
              if (element.event.section === "nft") {
                this.$data.collectionId = element.event.data[0];
              }
            });
          }
        )
        .catch((error) => console.log(error));
      console.log(this.$data.collectionId);
    },
    async storeImageToNftStorage() {
      const metadata = await client.store({
        name: this.$data.nftName,
        description: this.$data.nftDescription,
        image: this.$data.fileImage,
      });
      return metadata.url;
    },
    async processMintNft() {
      this.$data.loading = true;
      if (
        this.$data.nftName === "" ||
        this.$data.fileImage === "" ||
        this.$data.nftDescription === ""
      ) {
        this.$emit("alertShow", {
          variant: "danger",
          textAlert: "Error",
          alertDescription: "Please Filled All The Required Filled.",
        });
      } else {
        await fetchCheckUser({
          wallet_address: this.$store.state.user.walletAddress,
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return Promise.reject("something went wrong!");
            }
          })
          .then(async (data) => {
            const collectionId = data[0].collection_id;
            const urlImage = await this.storeImageToNftStorage();
            const mintNft = await this.mintNftUnique(collectionId, urlImage);
            if (mintNft) {
              this.$emit("alertShow", {
                variant: "success",
                textAlert: "Success",
                alertDescription: "Transaction is completed!",
              });
            }
          })
          .catch((error) => console.log(error));
      }

      this.$data.loading = false;
    },
    async mintNftUnique(collectionId, urlImage) {
      const { api } = await UseCennznet("app_name", { network: "nikau" });

      const data = await api.tx.nft.mintUnique(
        collectionId,
        this.$store.state.user.walletAddress,
        [{ url: urlImage }],
        null,
        null
      );
      const allInjected = await web3Enable("app name");
      console.log(allInjected);
      const injector = await web3FromSource("cennznet-extension");
      const signer = injector.signer;
      await data.signAndSend(this.$store.state.user.walletAddress, { signer });
      return true;
    },
  },
};
</script>

<style lang="scss">
.card-wrapper-create {
  display: flex;
  width: 480px;
  margin: 0 auto;
}
.card-wrapper-create-nft {
  display: flex;
  flex-direction: column;
  width: 480px;
  margin: 0 auto;
  & > * {
    margin: 16px 0px;
  }
}
.form-create-collection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > * {
    padding-bottom: 20px;
  }
}
.wrapper-info-create-collection {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}
.form-create-nft {
  display: flex;
  flex-direction: column;
  width: 100%;
  & > * {
    padding-bottom: 20px;
  }
}
.wrapper-form-collection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  & > * {
    margin: 0px 10px;
  }
}
</style>