<template>
  <div>
    <h1 :class="`logo`">TraPo</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: "Logo",
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";

.logo {
  margin-right: 20px;
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