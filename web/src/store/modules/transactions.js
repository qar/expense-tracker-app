import { persistData, loadPersistedData } from "@/utils";
import { nanoid } from "nanoid";

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

    async upsertEntry(ctx, data) {
      const time = new Date(parseInt(data.time, 10)).valueOf().toString();
      let id = data?.id;
      let index = -1;
      if (id) {
        index = ctx.state.transactions.findIndex((i) => i.id === id);
      } else {
        id = nanoid(16);
      }
      let newData;
      if (index >= 0) {
        newData = [...ctx.state.transactions];
        newData[index] = { ...data, id, time };
      } else {
        newData = [...ctx.state.transactions, { ...data, id, time }];
      }
      ctx.dispatch("setData", newData);
    },

    async remove(ctx, id) {
      const newData = [...ctx.state.transactions];
      const index = ctx.state.transactions.findIndex((i) => i.id === id);
      newData.splice(index, 1);
      ctx.dispatch("setData", newData);
    },
  },
};
