<template>
  <div :class="`card-wrapper`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
    name: 'Card',
    props: {
      gradientBorder: {
        type: Boolean,
        required: false,
        default: false
      }
    }

}
</script>

<style lang="scss">
@import '@/assets/styles/abstract/_variables.scss';
.card-wrapper{
  display: flex;
  width: 100%;
  background-color: $gray-23;
  padding: 20px 20px;
  border-radius: 15px;
}
</style>