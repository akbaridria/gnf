<template>
  <textarea
    :placeholder="placeholder"
    v-model="valueArea"
    :class="`text-area-form`"
  >
  </textarea>
</template>

<script lang="ts">
export default {
  name: "TextArea",
  props: {
    placeholder: {
      type: String,
      required: false,
      default: "Describe your Nft",
    },
  },
  data: function () {
    return {
      valueArea: "",
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";
.text-area-form {
  min-width: 300px;
  color: white;
  background-color: $gray-22;
  padding: 8px 8px;
  border: 1px solid transparent;
  border-image: $gradient-1;
  border-image-slice: 1;
  &:focus {
    outline: none;
  }
}
</style>