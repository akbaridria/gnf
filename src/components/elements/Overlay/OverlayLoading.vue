<template>
  <div :class="'overlay-container'">
    <div :class="'loader'"></div>
  </div>
</template>

<script>
export default {
    name: 'OverlayLoading'
}
</script>

<style lang="scss">
.overlay-container {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  .loader {
    border: 8px solid #c4c4c4;
    border-radius: 50%;
    border-top: 8px solid #444141;
    width: 80px;
    height: 80px;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
