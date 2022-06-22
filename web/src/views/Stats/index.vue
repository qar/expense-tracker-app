<template>
  <v-container fluid class="fill-height grey lighten-5">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" sm="12" md="12">
        <v-expansion-panels v-model="panels" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>本月消费趋势</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-sheet color="rgba(0, 0, 0, 0.12)">
                <v-sparkline
                  :value="thisMonthTransactions.values"
                  :labels="thisMonthTransactions.labels"
                  line-width="2"
                  height="60"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item"> {{ item.value }} </template>
                </v-sparkline>
              </v-sheet>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import currency from "currency.js";
import { isThisMonth, format } from "date-fns";

export default {
  name: "Stats",
  data() {
    return {
      panels: [0],
      value: [200, 675, 410, 390, 310, 460, 250, 240],
    };
  },

  computed: {
    ...mapState("transactions", ["transactions"]),

    thisMonthTransactions() {
      const data = this.transactions
        .filter((i) => isThisMonth(parseInt(i.time, 10)) && i.type === "0")
        .map((i) => {
          return {
            ...i,
            dayLabel: format(parseInt(i.time, 10), "dd日"),
          };
        });
      const group = {};
      data.forEach((i) => {
        if (!group[i.dayLabel]) {
          group[i.dayLabel] = [];
        }
        group[i.dayLabel].push(i);
      });
      const result = {
        values: [],
        labels: [],
      };
      Object.entries(group)
        .sort((a, b) => a[0].slice(0, 2) - b[0].slice(0, 2))
        .forEach(([dayLabel, dataList]) => {
          result.labels.push(dayLabel);
          const sum = dataList.reduce((sum, ele) => {
            return sum.add(ele.amount);
          }, currency(0.0)).value;
          result.values.push(sum);
        });
      return result;
    },
  },
};
</script>
