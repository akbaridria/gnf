<template>
  <div class="not-connected-wrapper">
      <Logo />
      <Typography variant="medium-text" color="white">
          Please connect your wallet!
      </Typography>
  </div>
</template>

<script>
import Logo from "@/components/fragments/Logo/Logo.vue";
import Typography from "@/components/elements/Typography/Typography.vue"
export default {
    name: 'NotConnected',
    components: {
        Logo,
        Typography
    }
}
</script>

<style lang="scss">
.not-connected-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>