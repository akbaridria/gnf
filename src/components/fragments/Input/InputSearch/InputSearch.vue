<template>
  <div>
    <input :class="`input-style`" type="text" placeholder="Search items" />
  </div>
</template>

<script lang="ts">
export default {
  name: "InputSearch",
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";
.input-style {
  width: 250px;
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