<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <h1 class="text-h5 font-weight-medium">My Expenses</h1>
      </div>

      <v-spacer />

      <settings-button
        @import="openImportDialog"
        @export-transactions="exportTransactions()"
        @export-categories="exportCategories()"
      />
      <data-import-dialog :visible.sync="importDialogVisible" @import="onDataImport" />
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
import SettingsButton from "@/components/SettingsButton";
import DataImportDialog from "@/components/DataImportDialog";
import { Parser } from "json2csv";
import FileSaver from "file-saver";

export default {
  name: "App",
  components: {
    DataImportDialog,
    SettingsButton,
  },

  data: () => ({
    importDialogVisible: false,
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

  methods: {
    openImportDialog() {
      this.importDialogVisible = true;
    },

    onDataImport(json) {
      this.$store.dispatch("transactions/setData", json.transactions);
      this.$store.dispatch("categories/setData", json.categories);
    },

    exportTransactions() {
      const data = this.$store.state.transactions.transactions;
      const fields = ["id", "time", "type", "category", "amount"];
      const parser = new Parser({ fields });
      const csv = parser.parse(data);
      const blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "transactions.csv");
    },

    exportCategories() {
      const data = this.$store.state.categories.categories;
      const fields = ["id", "name", "type"];
      const parser = new Parser({ fields });
      const csv = parser.parse(data);
      const blob = new Blob([csv], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "categories.csv");
    },
  },
};
</script>
