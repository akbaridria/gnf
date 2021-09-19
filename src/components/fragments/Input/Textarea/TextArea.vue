<template>
  <textarea
    :placeholder="placeholder"
    :class="`text-area-form`"
    @input="$emit('inputTextArea', $event.target.value)"
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