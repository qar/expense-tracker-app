<template>
  <v-data-table
    :headers="headers"
    :items="transactions"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  name: "JournalAccount",
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
    };
  },
};
</script>
