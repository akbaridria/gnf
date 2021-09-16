<template>
  <div :class="{'badge badge-active': active, 'badge': !active}" @click="$emit('clickBadge', text)">
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
    active: {
        type: Boolean,
        required:false,
        default: false
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/_variables.scss";
.badge {
  display: flex;
  align-items: center;
  padding: 0px 15px;
  background-color: $gray-22;
  cursor: pointer;
}
.badge-active {
  border: 1px solid transparent;
  border-image: $gradient-1;
  border-image-slice: 1;
}
.gradient-text-button {
  color: $white;
}
</style>