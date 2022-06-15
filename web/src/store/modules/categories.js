import { persistData, loadPersistedData } from "@/utils";

const STORAGE_KEY = "categories";

export default {
  namespaced: true,
  state: {
    categories: [],
  },
  mutations: {
    setCategories(state, data) {
      state.categories = data;
    },
  },
  actions: {
    async loadData(ctx) {
      ctx.commit("setCategories", loadPersistedData(STORAGE_KEY));
    },

    async setData(ctx, data) {
      ctx.commit("setCategories", data);
      persistData(STORAGE_KEY, data);
    },
  },
};
