<template>
  <div class="history-wrapper">
    <table class="table-bordered">
      <thead>
        <tr>
          <th>Date Time</th>
          <th>Event Name</th>
          <th>Nft Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(index, item) in historyUser" :key="item">
          <td>{{ new Date(index.timestamp).toLocaleDateString(undefined, options) }}</td>
          <td>{{ index.event_name }}</td>
          <td>{{ index.nft_name }}</td>
          <td>{{ index.price }} CPAY</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { fetchGetUserHistory } from "@/utils/utils.js";
export default {
  name: "HistoryUser",
  data: function () {
    return {
      historyUser: [],
      options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
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
          console.log(data);
          this.$data.historyUser = data;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss">
.history-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 842px;
  background-color: white;
  margin-bottom: 24px;
}
th {
  text-align: left;
}
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}
table > thead > tr > th,
table > tbody > tr > th,
table > tfoot > tr > th,
table > thead > tr > td,
table > tbody > tr > td,
table > tfoot > tr > td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: 2px solid #ddd;
}
table > caption + thead > tr:first-child > th,
table > colgroup + thead > tr:first-child > th,
table > thead:first-child > tr:first-child > th,
table > caption + thead > tr:first-child > td,
table > colgroup + thead > tr:first-child > td,
table > thead:first-child > tr:first-child > td {
  border-top: 0;
}
table > tbody + tbody {
  border-top: 2px solid #ddd;
}

table {
  border: 1px solid #ddd;
}
table > thead > tr > th,
table > tbody > tr > th,
table > tfoot > tr > th,
table > thead > tr > td,
table > tbody > tr > td,
table > tfoot > tr > td {
  border: 1px solid #ddd;
}
table > thead > tr > th,
table > thead > tr > td {
  border-bottom-width: 2px;
}
table > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
table > tbody > tr:hover {
  background-color: #f5f5f5;
}
</style>