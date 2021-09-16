<template>
  <div :class="`button`">
        <span :class="`gradient-text-button`">
      <h3 style="text-align:center">{{ text }}</h3>
    </span>
  </div>
</template>

<script lang="ts">
export default {
  name: "GradientButton",
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
  padding: 5px 15px;
  background-color: $white;
  background-image: $gradient-1;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
}
.gradient-text-button {
  color: $white;
  font-weight: bold;
  width:100%;
}
</style>