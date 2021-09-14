<template>
  <div :class="`nav`">
    <div :class="`left-menu`">
      <div><Logo /></div>
      <div :class="`list-menu`">
        <router-link v-for="(menu, index) in listMenu" :key="index" :to="`${menu.to}`">
        {{ menu.name }}
        </router-link>
        <!-- <router-link to="/about">Farms</router-link>
        <router-link to="/about">Pools</router-link> -->
      </div>
    </div>
    <div :class="`left-menu`">
      <div>
          <BaseButton :text="`conect to metamask`" />
      </div>
      <div>
          <BaseButton :text="`0 MATIC`" />
      </div>
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import Logo from "@/components/fragments/Logo/Logo.vue";
import BaseButton from "@/components/elements/Button/BaseButton.vue"
export default {
  name: "NavigationBar",
  components: {
    Logo,
    BaseButton,
  },
  data: function () {
    return{
      listMenu: [
          {
              to: '/',
              name: 'Dashboard'
          },
          {
              to: '/swaps',
              name: 'Swaps'
          },
          {
              to: '/farms',
              name: 'Farms'
          },
          {
              to: '/pools',
              name: 'Pools'
          }
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/abstract/_variables.scss";

.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: $gray-24;
  padding: 15px 15px;
}
a {
    color: $gray-8 ;
    &:hover {
        color: $white;
    }
    &.router-link-exact-active {
      color: $white;
    }
}
.left-menu {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.list-menu{
    display: flex;
    flex-direction: row;
    align-items: center;
    & > * {
        margin: 0px 10px;
    }
}
</style>