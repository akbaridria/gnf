<template>
  <div class="history-wrapper">
    <div v-for="(index, item) in historyUser" :key="item" class="history-item">
      <div>
        {{ new Date(index.timestamp).toLocaleDateString(undefined, options) }}
      </div>
      <div>
        {{ index.event_name }}
      </div>
      <div>
        {{ index.nft_name }}
      </div>
      <div>
       {{ index.price }} CPAY
      </div>
    </div>
    <NotConnected v-if="historyUser.length === 0" text="You dont have any transaction in trapo 😭" />
  </div>
</template>

<script>
import { fetchGetUserHistory } from "@/utils/utils.js";
import NotConnected from "@/components/fragments/Card/NotConnected/NotConnected.vue"
export default {
  name: "HistoryUser",
  components: {
    NotConnected
  },
  data: function () {
    return {
      historyUser: [],
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    };
  },
  mounted() {
    this.getUserHistory();
  },
  methods: {
    async getUserHistory() {
      fetchGetUserHistory({
        wallet_address: this.$store.state.user.walletAddress,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
            return Promise.reject("something went wrong!");
          }
        })
        .then((data) => {
          this.$data.historyUser = data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/abstract/_variables.scss";
.history-item {
  display: grid;
  grid-template-columns: 300px 200px 300px 150px;
  background-color: $gray-22;
  border-radius: 8px;
  width: 100%;
  color: white;
  padding: 24px 18px;
  margin: 6px 0px;
  &:hover {
    background-color: $gray-8;
  }
}
.history-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 930px;
  margin-bottom: 24px;
}

</style>