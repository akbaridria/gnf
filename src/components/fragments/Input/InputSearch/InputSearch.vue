<template>
  <div style="width:100%;">
    <input :class="`input-style`" type="text" :placeholder="placeholder" @input="$emit('inputValue', $event.target.value)"/>
  </div>
</template>

<script lang="ts">
export default {
  name: "InputSearch",
  props: {
    placeholder : {
      type: String,
      required:false,
      default: 'Input Value'
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";
.input-style {
  width: 250px;
  color: white;
  background-color: $gray-22;
  padding: 12px 12px;
  width: 100%;
  border: none;
  border-radius: 10px;
  &:focus {
      outline: none;
  }
}
</style>