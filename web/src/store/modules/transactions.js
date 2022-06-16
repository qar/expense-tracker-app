import { persistData, loadPersistedData } from "@/utils";

const STORAGE_KEY = "transactions";

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

  actions: {
    async loadData(ctx) {
      ctx.commit("setTransactions", loadPersistedData(STORAGE_KEY));
    },

    async setData(ctx, data) {
      ctx.commit("setTransactions", data);
      persistData(STORAGE_KEY, data);
    },

    async addEntry(ctx, data) {
      const newData = [...ctx.state.transactions, data];
      ctx.dispatch("setData", newData);
    },
  },
};
