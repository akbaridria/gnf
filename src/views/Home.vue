<template>
  <div class="home">
    <Typography :variant="`h4`" :color="`gradient-1`">
      H1
    </Typography>
  </div>
</template>

<script lang="ts">
import Typography from '@/components/elements/Typography/Typography.vue';
export default {
  name: 'Home',
  components : {
    Typography
  }
}
</script>
