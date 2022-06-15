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
};
