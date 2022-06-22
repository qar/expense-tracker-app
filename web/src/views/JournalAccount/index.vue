<template>
  <v-container fluid class="fill-height grey lighten-5">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" sm="12" md="12">
        <v-card tile outlined width="100%">
          <add-entry-dialog
            :visible="dialogs.entry.visible"
            :data="dialogs.entry.data"
            class="ma-2"
            @change="onEntryAdd"
            @close="closeEntryDialog()"
          />

          <v-dialog v-model="dialogs.del.visible" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">确定要删除这条记录吗？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelDialog()">取消</v-btn>
                <v-btn color="blue darken-1" text @click="removeEntry(dialogs.del.data)"
                  >确定</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
                <v-btn color="primary" dark class="ml-2" @click="openEntryDialog()">添加</v-btn>
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
            <template v-slot:item.category="{ value }">{{
              value | category(categoryMap)
            }}</template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="openEntryDialog(item)"> mdi-pencil </v-icon>
              <v-icon small @click="openDeleteConfirmDialog(item)"> mdi-delete</v-icon>
            </template>
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
import AddEntryDialog from "@/components/AddEntryDialog";
import DateSelectDialog from "@/components/DateSelectDialog";

export default {
  name: "JournalAccount",
  components: {
    AddEntryDialog,
    DateSelectDialog,
  },
  filters: {
    date(value) {
      try {
        return format(new Date(parseInt(value, 10)), "yyyy-MM-dd HH:mm:ss");
      } catch (err) {
        return "-";
      }
    },

    category(value, categoryMap) {
      return categoryMap[value]?.name || "-";
    },

    rmb(value) {
      return currency(value, { precision: 2, symbol: "CN¥" }).format();
    },
  },
  data() {
    return {
      dialogs: {
        entry: {
          visible: false,
          data: undefined,
        },
        del: {
          visible: false,
        },
      },
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
        { text: "操作", value: "actions", sortable: false },
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
    openEntryDialog(data) {
      this.$set(this.dialogs, "entry", {
        visible: true,
        data,
      });
    },

    closeEntryDialog() {
      this.$set(this.dialogs, "entry", {
        visible: false,
        data: undefined,
      });
    },

    openDeleteConfirmDialog(data) {
      this.$set(this.dialogs, "del", {
        visible: true,
        data,
      });
    },

    closeDelDialog() {
      this.$set(this.dialogs, "del", {
        visible: false,
        data: undefined,
      });
    },

    async removeEntry(data) {
      await this.$store.dispatch("transactions/remove", data?.id);
      this.closeDelDialog();
    },

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
      this.$store.dispatch("transactions/upsertEntry", data);
    },
  },
};
</script>
