<template>
  <div style="margin: 0 auto">
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
            <InputSearch placeholder="Name Of your Nft" />
            <TextArea />
            <ImageOutline v-if="!imageShow" style="width: 150px; margin: 0 auto" />
            <div v-if="imageShow" style="width: 150px; margin: 0 auto; padding: 20px 0px;">
              <img :src="imageData" />
            </div>
            <BaseButton text="Upload File" @click="clickImage" />
            <input type="file" id="inputFile" accept="image/*" @change="changeNftImage($event)" enctype="multipart/form-data" style="display:none;" />
          </div>
        </template>
      </Card>
      <Card>
        <template v-slot:default>
          <GradientButton text="Create Nft" />
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
import { web3FromSource, web3Enable } from "@polkadot/extension-dapp";
import { fetchAddUser } from "@/utils/utils.js";
import Card from "@/components/elements/Card/Card.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue";
import InputSearch from "@/components/fragments/Input/InputSearch/InputSearch.vue";
import GradientButton from "@/components/fragments/Button/GradientButton.vue";
import TextArea from "@/components/fragments/Input/Textarea/TextArea.vue";
import BaseButton from "@/components/elements/Button/BaseButton.vue";
import ImageOutline from "@/assets/Icons/ImageOutline.vue";
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
      imageData: '',
      filename: ''
    };
  },
  watch: {
    isCollection(newValue){
      this.$data.showDif = newValue
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
            console.log(response);
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          console.log(data);
          this.$data.showDif = true
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
    clickImage(){
      document.getElementById('inputFile').click()
    },
    changeNftImage(e){
      console.log(e)
      const file = e.target.files[0];
      this.$data.imageData = URL.createObjectURL(file);
      this.$data.imageShow = true
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
              console.log(element);
              if (element.event.section === "nft") {
                this.$data.collectionId = element.event.data[0];
              }
            });
          }
        )
        .catch((error) => console.log(error));
      console.log(this.$data.collectionId);
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