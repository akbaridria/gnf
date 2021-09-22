<template>
  <textarea
    rows="10"
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
  padding: 12px 12px;
  border: none;
  border-radius: 12px;
  &:focus {
    outline: none;
  }
}
</style>