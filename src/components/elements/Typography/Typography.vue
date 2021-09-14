<template>
  <div
    :class="[
      $style[`typography--${variant}`],
      color ? $style[`typography-color--${color}`] : null,
      align ? $style[`typography-align--${align}`] : null,
      pointer ? $style['typography-pointer'] : null,
    ]"
    @mouseenter="$emit('mouseenter', $event)"
    @mouseleave="$emit('mouseleave', $event)"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default({
  name: 'Typography',
  props: {
    variant: {
      type: String,
      required: false,
      default: 'small-text',
    },
    color: {
      type: String,
      required: false,
      default: 'black',
    },
    align: {
      type: String,
      required: false,
      default: 'start',
    },
    pointer: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
})
</script>

<style module lang="scss" >
@import '@/assets/styles/components/typography/_typography.module.scss';

</style>
