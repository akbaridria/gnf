<template>
  <div style="margin: 0 auto">
    <div :class="`card-wrapper-create`">
      <Card>
        <template v-slot:default>
          <div :class="`form-create-collection`">
            <GradientText
              text="Create Your Collection"
              style="margin: 0 auto"
            />
            <div :class="`wrapper-form-collection`">
              <InputSearch placeholder="Name Of your Collection" />
              <GradientButton text="Create" />
            </div>
            <div style="width: 150px; margin: 0 auto">
              <HelpCircleOutline />
            </div>
            <Typography variant="small-text-medium" color="white" :truncate="false">
              You dont have any collection!
            </Typography>
            <Typography variant="extra-small-text--medium" color="white" :truncate="false">
              Before you can mint NFt as many as you can, you have to create your collection first.
            </Typography>
          </div>
        </template>
      </Card>
    </div>
    <div :class="`card-wrapper-create-nft`">
      <Card>
        <template v-slot:default>
          <div :class="`form-create-nft`">
            <GradientText text="Create Your Nft" />
            <InputSearch placeholder="Name Of your Nft" />
            <TextArea />
            <ImageOutline style="width: 150px; margin: 0 auto" />
            <BaseButton text="Upload File" />
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

<script lang="ts">
import Card from "@/components/elements/Card/Card.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue";
import InputSearch from "@/components/fragments/Input/InputSearch/InputSearch.vue";
import GradientButton from "@/components/fragments/Button/GradientButton.vue";
import TextArea from "@/components/fragments/Input/Textarea/TextArea.vue";
import BaseButton from "@/components/elements/Button/BaseButton.vue";
import ImageOutline from "@/assets/Icons/ImageOutline.vue";
import HelpCircleOutline from "@/assets/Icons/HelpCircleOutline.vue";
import Typography from "@/components/elements/Typography/Typography.vue"
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
    HelpCircleOutline,
    Typography
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