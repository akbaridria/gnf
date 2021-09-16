<template>
  <div :class="`card-wrapper-create`">
      <Card>
          <template v-slot:default>
             <GradientText text="Create Your Nft" style="margin: 0 auto;" />
          </template>
      </Card>
  </div>
</template>

<script lang="ts">
import Card from "@/components/elements/Card/Card.vue"
import GradientText from "@/components/fragments/GradientText/GradientText.vue"
export default {
    name: 'CardCreate',
    components: {
        Card,
        GradientText
    }
}
</script>

<style lang="scss">
.card-wrapper-create{
    display: flex;
    width: 480px;
    margin: 0 auto;
}
</style>