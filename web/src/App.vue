<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list-item-group :value="menu" active-class="deep-purple--text text--accent-4">
        <v-list-item v-for="(m, index) in menus" :key="index" :to="m.path">
          <v-list-item-title>{{ m.label }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    menu: null,
    menus: [
      {
        path: "/",
        label: "账单",
      },
      {
        path: "/categories",
        label: "账单分类",
      },
      {
        path: "/stats",
        label: "统计分析",
      },
    ],
  }),

  created() {
    this.$store.dispatch("transactions/loadData");
    this.$store.dispatch("categories/loadData");
  },
};
</script>
