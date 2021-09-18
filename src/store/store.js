import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
        isConnected: false,
        walletAddress: ''
    }
  },
  mutations: {
    updateConnect(state, item) {
      state.user.isConnected = item.isConnected
      state.user.walletAddress = item.walletAddress
    }
  },
  actions: {},
  modules: {},
});