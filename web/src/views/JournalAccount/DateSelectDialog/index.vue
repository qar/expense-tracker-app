<template>
  <v-dialog ref="dialog" v-model="dialog" :return-value.sync="date" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="选择账单月份"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" type="month" scrollable hide-details>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="dialog = false">取消</v-btn>
      <v-btn text color="primary" @click="onOk">确定</v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  name: "DateSelectDialog",

  props: ["value"],

  data() {
    return {
      date: null,
      dialog: false,
    };
  },

  watch: {
    value: {
      handler(newV) {
        this.date = newV;
      },
      immediate: true,
    },
  },

  methods: {
    onOk() {
      this.dialog = false;
      this.$refs.dialog.save(this.date);
      this.$emit("change", this.date);
      this.$emit("input", this.date);
    },
  },
};
</script>
