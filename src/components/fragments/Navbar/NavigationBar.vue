<template>
  <div :class="`nav`">
    <div :class="`left-menu`">
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

    <div :class="`left-menu`">
      <div v-if="!isConnected">
        <BaseButton :text="`CONNECT WALLET`" @click="connectWallet" />
      </div>
      <BadgeAccount v-if="isConnected" :accountName="accountName" :walletAddress="accountAddress" :balance="balance" />
    </div>
  </div>
  <router-view />
</template>

<script lang="ts">
import { UseCennznet } from "@cennznet/api/hooks/UseCennznet";
// import {web3FromSource, web3Enable} from "@polkadot/extension-dapp"
import Logo from "@/components/fragments/Logo/Logo.vue";
import BaseButton from "@/components/elements/Button/BaseButton.vue";
import BadgeAccount from "@/components/fragments/Badge/BadgeAccount.vue";
export default {
  name: "NavigationBar",
  components: {
    Logo,
    BaseButton,
    BadgeAccount
  },
  data: function () {
    return {
      listMenu: [
        {
          to: "/",
          name: "Marketplace",
        },
        {
          to: "/stats",
          name: "Stats",
        },
        {
          to: "/create",
          name: "Create",
        },
      ],
      isConnected: false,
      accountName: 'wallet-name',
      accountAddress: '0x',
      balance: 0
    };
  },
  methods: {
    async connectWallet() {
      const { api, accounts, isExtensionInstalled } = await UseCennznet(
        "app_name",
        { network: "nikau" }
      );
      
      this.$data.isConnected = isExtensionInstalled
      this.$data.accountName = accounts[0].meta.name
      this.$data.accountAddress = accounts[0].address
      let assetId = 16001;
      // let listingId = await api.query.nft.nextListingId();
      // console.log('ini listing', listingId.toHuman())
      //  listingId = await api.query.nft.nextListingId();
      // console.log('ini listing', listingId.toHuman())
      // let listing = await api.query.nft.listings(800)
      // console.log(listing.toHuman())
      // console.log(accounts)
      // let coll = api.query.nft.collectionName(63)
      // console.log((await coll).toHuman())
      // const tokenInfos = await api.derive.nft.tokenInfoForCollection(63);
      // console.log(tokenInfos)
      // const sell = await api.tx.nft.sell([63,1,0], null, 16001, 16001, null)
      // const allInjected = await web3Enable('app name');
      // console.log(allInjected)
      // const injector = await web3FromSource('cennznet-extension')
      // const signer = injector.signer;
      // sell.signAndSend(this.$data.accountAddress, {signer}).catch((error) => console.log(error))
      await api.query.genericAsset.freeBalance(
        assetId,
        accounts[0].address,
        (balance) => {
          this.$data.balance = balance/Math.pow(10,4)

        }
      );
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