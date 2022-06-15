export default {
  namespaced: true,
  state: {
    transactions: [],
  },

  mutations: {
    setTransactions(state, data) {
      state.transactions = data;
    },
  },
};
