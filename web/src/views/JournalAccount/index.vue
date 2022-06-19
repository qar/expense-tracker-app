<template>
  <v-container fluid class="fill-height grey lighten-5">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" sm="12" md="12">
        <v-card tile outlined width="100%">
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
                <v-chip-group column>
                  <v-chip label outlined class="ma-2" color="teal"> 收入 {{ incomeText }}</v-chip>
                  <v-chip label outlined class="ma-2" color="red"> 支出 {{ outcomeText }}</v-chip>
                </v-chip-group>
                <v-spacer></v-spacer>
                <data-import-dialog class="ma-2" @import="onDataImport" />
                <add-entry-dialog class="ma-2" @change="onEntryAdd" />
              </v-toolbar>
            </template>

            <template v-slot:header="{ props: { headers } }">
              <thead>
                <tr>
                  <th :colspan="headers.length">
                    <date-select-dialog v-model="month" />
                    <v-select
                      v-model="selectedCategories"
                      :items="categories"
                      item-value="id"
                      item-text="name"
                      :menu-props="{ maxHeight: '400' }"
                      label="选择账单分类"
                      multiple
                    ></v-select>
                  </th>
                </tr>
              </thead>
            </template>

            <template v-slot:item.time="{ value }">{{ value | date }}</template>
            <template v-slot:item.type="{ value }">{{ value === "0" ? "支出" : "收入" }}</template>
            <template v-slot:item.amount="{ value }">{{ value | rmb }}</template>
            <template v-slot:item.category="{ value }">{{ categoryMap[value].name }}</template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      selectedCategories: [],
    };
  },
  computed: {
    ...mapState("transactions", ["transactions"]),
    ...mapState("categories", ["categories"]),

    displayTransactions() {
      return this.transactions
        .filter((item) => this.filterByMonth(item, this.month))
        .filter((item) => this.filterByCategory(item, this.selectedCategories));
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

    /**
     * 表格所展示数据中的收入类型数据汇总并格式化
     */
    incomeText() {
      const value = this.displayTransactions.reduce((sum, ele) => {
        if (ele.type === "1") {
          return sum.add(ele.amount);
        }
        return sum;
      }, currency(0.0));

      return value.format();
    },

    /**
     * 表格所展示数据中的支出类型数据汇总并格式化
     */
    outcomeText() {
      const value = this.displayTransactions.reduce((sum, ele) => {
        if (ele.type === "0") {
          return sum.add(ele.amount);
        }
        return sum;
      }, currency(0.0));

      return value.format();
    },
  },

  methods: {
    filterByMonth(item, month) {
      if (!month) {
        return true;
      }
      const m = new Date(month);
      const start = startOfMonth(m);
      const end = endOfMonth(m);

      const d = new Date(parseInt(item.time, 10));
      return (isAfter(d, start) || isEqual(d, start)) && (isBefore(d, end) || isEqual(d, end));
    },

    filterByCategory(item, selectedCategories = []) {
      if (!selectedCategories.length) {
        return true;
      }
      return selectedCategories.includes(item.category);
    },

    onEntryAdd(data) {
      this.$store.dispatch("transactions/addEntry", data);
    },
    onDataImport(json) {
      this.$store.dispatch("transactions/setData", json.transactions);
      this.$store.dispatch("categories/setData", json.categories);
    },
  },
};
</script>
