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

    async upsert(ctx, data) {
      let id = data?.id;
      let newList = [...ctx.state.categories];
      if (!id) {
        // new
        while (newList.find((i) => i.id == id)) {
          id = nanoid(10);
        }
        newList = [...newList, { ...data, id }];
      } else {
        // update
        const index = newList.findIndex((i) => i.id === id);
        newList[index] = {
          ...data,
        };
      }
      ctx.dispatch("setData", newList);
    },

    async remove(ctx, id) {
      const newList = [...ctx.state.categories];
      const index = newList.findIndex((i) => i.id === id);
      newList.splice(index, 1);
      ctx.dispatch("setData", newList);
    },
  },
};
