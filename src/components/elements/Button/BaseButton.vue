<template>
  <div :class="`button`">
    <span :class="`gradient-text-button`">
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "BaseButton",
  props: {
    text: {
      type: String,
      required: false,
      default: "button",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/_variables.scss";
.button {
  display: flex;
  align-items: center;
  padding: 0px 15px;
  background-color: $gray-22;
  cursor: pointer;
  &:hover {
    border: 1px solid transparent;
    border-image: $gradient-1;
    border-image-slice: 1;
  }
}
.gradient-text-button {
  background-color: $white;
  background-image: $gradient-1;
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
}
</style>