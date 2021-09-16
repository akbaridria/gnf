<template>
  <DefaultLayout>
    <template v-slot:default>
      <CardCreate />
    </template>
  </DefaultLayout>
</template>

<script lang="ts">
import CardCreate from "@/components/fragments/Card/Create/CardCreate.vue";
import DefaultLayout from "@/components/layouts/DefaultLayout.vue";
export default {
  name: "Create",
  components: {
    CardCreate,
    DefaultLayout,
  },
};
</script>

<style>
</style>