<template>
  <v-data-table
    :headers="headers"
    :items="displayTransactions"
    :items-per-page="5"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>账单</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <data-import-dialog @import="onDataImport" />
        <add-entry-dialog @change="onEntryAdd" />
      </v-toolbar>
      <date-select-dialog @change="onMonthChange" />
    </template>

    <template v-slot:item.time="{ value }">{{ value | date }}</template>
    <template v-slot:item.type="{ value }">{{ value === "0" ? "支出" : "收入" }}</template>
    <template v-slot:item.amount="{ value }">{{ value | rmb }}</template>
    <template v-slot:item.category="{ value }">{{ categoryMap[value].name }}</template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";
import currency from "currency.js";
import { addMonths, format, startOfMonth, endOfMonth, isEqual, isAfter, isBefore } from "date-fns";
import DataImportDialog from "./DataImportDialog";
import AddEntryDialog from "./AddEntryDialog";
import DateSelectDialog from "./DateSelectDialog";

export default {
  name: "JournalAccount",
  components: {
    AddEntryDialog,
    DataImportDialog,
    DateSelectDialog,
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

      backup: [],

      dialog: false,
      month: null,
    };
  },
  computed: {
    ...mapState("transactions", ["transactions"]),
    ...mapState("categories", ["categories"]),

    displayTransactions() {
      if (!this.month) {
        return this.transactions;
      }

      const m = new Date(this.month);
      const start = startOfMonth(m);
      const end = endOfMonth(m);

      return this.transactions.filter((item) => {
        const d = new Date(parseInt(item.time, 10));
        return (isAfter(d, start) || isEqual(d, start)) && (isBefore(d, end) || isEqual(d, end));
      });
    },

    categoryMap() {
      return this.categories.reduce(
        (sum, ele) => ({
          ...sum,
          [ele.id]: ele,
        }),
        {}
      );
    },
  },
  methods: {
    onEntryAdd() {},
    onDataImport(json) {
      this.$store.dispatch("transactions/setData", json.transactions);
      this.$store.dispatch("categories/setData", json.categories);
    },

    onMonthChange(month) {
      this.month = month;
    },
  },
};
</script>
