import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
        isConnected: false,
        walletAddress: '',
        walletName: '',
        collectionId: 0
    }
  },
  mutations: {
    updateConnect(state, item) {
      state.user.isConnected = item.isConnected
      state.user.walletAddress = item.walletAddress
      state.user.walletName = item.walletName
    }
  },
  actions: {},
  modules: {},
});