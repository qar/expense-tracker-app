import Vue from "vue";
import Vuex from "vuex";

import transactions from "./modules/transactions";
import categories from "./modules/categories";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    categories,
    transactions,
  },
});
