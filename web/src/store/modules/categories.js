import { nanoid } from "nanoid";
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

    async add(ctx, data) {
      let id = nanoid(10);
      while (ctx.state.categories.find((i) => i.id == id)) {
        id = nanoid(10);
      }
      const newData = [...ctx.state.categories, { ...data, id }];
      ctx.dispatch("setData", newData);
    },
  },
};
