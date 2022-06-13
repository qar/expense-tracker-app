<template>
  <v-data-table :headers="headers" :items="transactions" :items-per-page="5" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>账单</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <data-import-dialog @import="onDataImport" />
      </v-toolbar>
    </template>

    <template v-slot:item.time="{ value }">{{ value | date }}</template>
    <template v-slot:item.type="{ value }">{{ value === "0" ? "支出" : "收入" }}</template>
    <template v-slot:item.amount="{ value }">{{ value | rmb }}</template>
  </v-data-table>
</template>

<script>
import currency from "currency.js";
import { format } from "date-fns";
import DataImportDialog from "./DataImportDialog";

export default {
  name: "JournalAccount",
  components: {
    DataImportDialog,
  },
  filters: {
    date(value) {
      return format(new Date(parseInt(value, 10)), "yyyy-MM-dd HH:mm:ss");
    },

    rmb(value) {
      return currency(value, { precision: 2, symbol: "CN¥" }).format();
    },
  },
  data() {
    return {
      headers: [
        {
          text: "账单时间",
          align: "start",
          sortable: false,
          value: "time",
        },
        { text: "账单类型", value: "type" },
        { text: "账单分类", value: "category" },
        { text: "账单金额", value: "amount" },
      ],

      transactions: [],

      dialog: false,
    };
  },
  methods: {
    onDataImport(json) {
      this.transactions = json;
    },
  },
};
</script>
