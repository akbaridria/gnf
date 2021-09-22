<template>
  <div
    :class="{
      'alert-container': variant === 'success',
      'alert-container-danger': variant === 'danger',
    }"
  >
    <div style="width: 32px" v-if="variant === 'success'">
      <CheckCircle />
    </div>
    <div style="width: 32px" v-if="variant === 'danger'">
      <HelpCircleOutline />
    </div>
    <div>
      <Typography variant="medium-text--bold" color="white">
        {{ alertText }}
      </Typography>
      <Typography variant="small-text--medium" color="white">
        {{ alertDescription }}
      </Typography>
    </div>
  </div>
</template>

<script>
import Typography from "@/components/elements/Typography/Typography.vue";
import CheckCircle from "@/assets/Icons/CheckCircle.vue";
import HelpCircleOutline from "@/assets/Icons/HelpCircleOutline.vue";
export default {
  name: "Alert",
  components: {
    Typography,
    CheckCircle,
    HelpCircleOutline,
  },
  props: {
    variant: {
      type: String,
      required: false,
      default: "success",
    },
    alertText: {
      type: String,
      required: false,
      default: "Success",
    },
    alertDescription: {
      type: String,
      required: false,
      default: "This is Alert Description",
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";
.alert-container {
  z-index: 10000;
  animation: fadeOut 2s forwards;
  animation-delay: 2s;
  display: flex;
  flex-direction: row;
  position: fixed;
  width: 300px;
  min-height: 60px;
  background-color: rgba(59, 206, 123, 0.16);
  backdrop-filter: blur(40px);
  border-radius: 8px;
  color: #fff;
  padding: 12px 12px;
  top: 20%;
  right: 1%;
  & > * {
    margin: 0px 5px;
  }
}

.alert-container-danger {
  z-index: 10000;
  animation: fadeOut 2s forwards;
  animation-delay: 4s;
  display: flex;
  flex-direction: row;
  position: fixed;
  width: 300px;
  min-height: 60px;
  background-color: rgba(232, 33, 43, 0.16);
  backdrop-filter: blur(40px);
  border-radius: 8px;
  color: #fff;
  padding: 12px 12px;
  top: 20%;
  right: 1%;
  & > * {
    margin: 0px 5px;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    z-index: -1;
  }
}
</style>
