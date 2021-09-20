<template>
  <div :class="`layout-wrapper`">
      <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
    name: 'DefaultLayout'
}
</script>

<style lang="scss">
@import '@/assets/styles/abstract/_variables.scss';

.layout-wrapper {
    display: flex;
    margin: 0 auto;
    width: 1200px;
    padding: 20px 20px;
    background-color: $gray-24;
    justify-content: center;
}
</style>