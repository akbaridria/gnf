<template>
  <div class="tab-wrapper">
    <div
      v-for="(index, item) in listTab"
      :key="item"
      @click="clickTab(index)"
      :class="{'oneTab-default': activeTab !== index, 'oneTab-active': activeTab === index}"
    >
      {{ index }} 
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tab",
  props: {
    listTab: {
      type: Array,
      required: false,
      default: () => ["Collection", "History"],
    },
  },
  data: function () {
    return {
      activeTab: this.$props.listTab[0],
    };
  },
  methods: {
    clickTab(value) {
      this.$data.activeTab = value
      this.$emit('changeTab', value)
    },
  },
};
</script>

<style lang="scss">
.tab-wrapper {
  display: flex;
  flex-direction: row;
  padding: 48px 0px;
}
.oneTab-default {
  color: white;
  padding: 12px 24px;
  cursor: pointer;
}
.oneTab-active {
  color: white;
  padding: 12px 24px;
  cursor: pointer;
  border-bottom: 1px solid white;
}
</style>