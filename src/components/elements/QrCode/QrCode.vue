<template>
  <qrcode-vue :value="url" :size="size" level="H" />
</template>
<script>
import QrcodeVue from "qrcode.vue";

export default {
  props: {
      url: {
          type: String,
          required:false,
          default: 'https://example.com/'
      }
  },
  data() {
    return {
    //   value: "https://example.com",
      size: 150,
    };
  },
  components: {
    QrcodeVue,
  },
};
</script>