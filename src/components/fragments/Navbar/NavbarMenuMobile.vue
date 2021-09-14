<template>
<div :class="`nav`">
  <div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>

    <ul class="menu__box">
      <li v-for="(menu, index) in listMenu" :key="index" > <router-link  :to="`${menu.to}`">
        {{ menu.name }}
        </router-link></li>
    </ul>
  </div>
  <div style="margin-top: 10px;">
      <Logo />
  </div>
</div>
</template>

<script lang="ts">
import Logo from "@/components/fragments/Logo/Logo.vue";
export default {
  name: "NavigationBarMobile",
  components: {
      Logo
  },
  data: function () {
    return {
      listMenu: [
        {
          to: "/",
          name: "Dashboard",
        },
        {
          to: "/swaps",
          name: "Swaps",
        },
        {
          to: "/farms",
          name: "Farms",
        },
        {
          to: "/pools",
          name: "Pools",
        },
      ],
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
}
a {
    padding: 20px 20px;
    color: $gray-8 ;
    &:hover {
        color: $white;
    }
    &.router-link-exact-active {
      color: $white;
    }
}

#menu__toggle {
  opacity: 0;
}

#menu__toggle:checked ~ .menu__btn > span {
  transform: rotate(45deg);
}
#menu__toggle:checked ~ .menu__btn > span::before {
  top: 0;
  transform: rotate(0);
}
#menu__toggle:checked ~ .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
}
#menu__toggle:checked ~ .menu__box {
  visibility: visible;
  left: 0;
}

.menu__btn {
  display: flex;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 20px;

  width: 10px;
  height: 10px;

  cursor: pointer;
  z-index: 1;
}

.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;

  width: 100%;
  height: 2px;

  background-color: #616161;

  transition-duration: 0.25s;
}
.menu__btn > span::before {
  content: "";
  top: -8px;
}
.menu__btn > span::after {
  content: "";
  top: 8px;
}

.menu__box {
  display: block;
  position: fixed;
  visibility: hidden;
  top: 0;
  left: -100%;

  width: 300px;
  height: 100%;

  margin: 0;
  padding: 80px 0;

  list-style: none;

  background-color: $gray-24;
  box-shadow: 1px 0px 6px rgba(0, 0, 0, 0.2);

  transition-duration: 0.25s;
}

.menu__item {
  display: block;
  padding: 12px 24px;

  color: #333;

  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 600;

  text-decoration: none;

  transition-duration: 0.25s;
}
.menu__item:hover {
  background-color: #cfd8dc;
}
</style>