<template>
  <div :class="`nav`">
    <div v-if="!isMobile()" :class="`left-menu`">
      <div><Logo /></div>
      <div :class="`list-menu`">
        <router-link
          v-for="(menu, index) in listMenu"
          :key="index"
          :to="`${menu.to}`"
        >
          {{ menu.name }}
        </router-link>
        <!-- <router-link to="/about">Farms</router-link>
        <router-link to="/about">Pools</router-link> -->
      </div>
    </div>

    <div v-if="!isMobile()" :class="`left-menu`">
      <div v-if="!isConnected">
        <BaseButton :text="`CONNECT WALLET`" @click="connectWallet" />
      </div>
      <BadgeAccount
        v-if="isConnected"
        :accountName="accountName"
        :walletAddress="accountAddress"
        :balance="balance"
      />
    </div>
  </div>
  <a class="btn" id="actionButton" href="#open-modal" style="display: none"></a>
  <ModalAccount
    :allAccount="getAllAccount"
    @getAccountId="callAction($event)"
  />
  <router-view />
</template>

<script>
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
// import {web3FromSource, web3Enable} from "@polkadot/extension-dapp"
import Logo from "@/components/fragments/Logo/Logo.vue";
import BaseButton from "@/components/elements/Button/BaseButton.vue";
import BadgeAccount from "@/components/fragments/Badge/BadgeAccount.vue";
import ModalAccount from "@/components/elements/Modal/ModalAccount.vue";
export default {
  name: "NavigationBar",
  components: {
    Logo,
    BaseButton,
    BadgeAccount,
    ModalAccount,
  },
  data: function () {
    return {
      listMenu: [
        {
          to: "/",
          name: "Marketplace",
        },
        {
          to: "/create",
          name: "Create",
        },
        {
          to: "/profile",
          name: "Profile",
        },
      ],
      isConnected: false,
      accountName: "wallet-name",
      accountAddress: "0x",
      balance: 0,
      assetId: 16001,
      AllAccount: [],
    };
  },
  computed: {
    getAllAccount() {
      return this.$data.AllAccount;
    },
  },
  methods: {
    isMobile() {
      return screen.width <= 760 ? true : false;
    },
    async callAction(iAddress) {
      const { api, accounts, isExtensionInstalled } = await UseCennznet("app_name", {
        network: "nikau",
      });
      this.$data.isConnected = isExtensionInstalled;
      this.$data.accountName = accounts[iAddress].meta.name;
      this.$data.accountAddress = accounts[iAddress].address;
      this.$data.assetId = 16001;
      this.$store.commit("updateConnect", {
        isConnected: isExtensionInstalled,
        walletAddress: accounts[iAddress].address,
        walletName: accounts[iAddress].meta.name,
      });
      await api.query.genericAsset.freeBalance(
        this.$data.assetId,
        accounts[iAddress].address,
        (balance) => {
          this.$data.balance = balance / Math.pow(10, 4);
        }
      );
      document.getElementById('close-modal').click()
    },
    async connectWallet() {
      try {
        const { api, accounts, isExtensionInstalled } = await UseCennznet(
          "app_name",
          { network: "nikau" }
        );
        if (accounts.length > 1) {
          this.$data.AllAccount = accounts;
          console.log(this.$data.AllAccount);
          document.getElementById("actionButton").click();
        } else {
          this.$data.isConnected = isExtensionInstalled;
          this.$data.accountName = accounts[0].meta.name;
          this.$data.accountAddress = accounts[0].address;
          this.$data.assetId = 16001;
          this.$store.commit("updateConnect", {
            isConnected: isExtensionInstalled,
            walletAddress: accounts[0].address,
            walletName: accounts[0].meta.name,
          });
          await api.query.genericAsset.freeBalance(
            this.$data.assetId,
            accounts[0].address,
            (balance) => {
              this.$data.balance = balance / Math.pow(10, 4);
            }
          );
        }
      } catch (error) {
        this.$emit("showAlert", {
          variant: "danger",
          textAlert: "Error",
          alertDescription:
            "Install Cennz extention or Allowed this website to connect",
        });
      }
    },
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
  text-decoration: none;
  color: $gray-8;
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
.list-menu {
  display: flex;
  flex-direction: row;
  align-items: center;
  & > * {
    margin: 0px 10px;
  }
}
</style>