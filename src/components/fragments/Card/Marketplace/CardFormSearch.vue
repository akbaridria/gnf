<template>
  <Card>
    <template v-slot:default>
      <div :class="`header-market-wrapper`">
        <div>
        <GradientText text="200,000 results" />
        </div>
        <div :class="`wrap-search`">
            <Badge text="All" :active="badgeActive === 'All'" @clickBadge="badgeActive = 'All'" />
            <Badge text="On Sale" :active="badgeActive === 'On Sale'" @clickBadge="badgeActive = 'On Sale'" />
            <Badge text="On Auction" :active="badgeActive === 'On Auction'" @clickBadge="badgeActive = 'On Auction'"  />
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from "@/components/elements/Card/Card.vue";
import GradientText from "@/components/fragments/GradientText/GradientText.vue";
import Badge from "@/components/fragments/Badge/Badge.vue"
export default {
  name: "CardFromSearch",
  components: {
    Card,
    GradientText,
    Badge
  },
  data: function(){
      return {
          badgeActive: 'All'
      }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";
.header-market-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width:100%;
}
.wrap-search{
    display: flex;
    flex-direction: row;
    align-items: center;
    & > * {
        margin: 0px 5px;
    }
}
</style>