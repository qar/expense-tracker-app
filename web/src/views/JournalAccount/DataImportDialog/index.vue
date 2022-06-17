<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="ml-2" v-bind="attrs" v-on="on">导入</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-file-input
            truncate-length="15"
            placeholder="导入账单"
            @change="onTransactionsFileChange"
          ></v-file-input>

          <v-file-input
            truncate-length="15"
            placeholder="导入分类"
            @change="onCategoriesFileChange"
          ></v-file-input>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">取消</v-btn>
        <v-btn color="blue darken-1" text @click="save">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import csvtojsonV2 from "csvtojson";

export default {
  name: "DataImportDialog",
  data() {
    return {
      transactions: [],
      categories: [],
      dialog: false,
      formTitle: "数据导入",
      editedItem: {},
    };
  },
  methods: {
    async readFileAsync(f) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsText(f);
      });
    },

    async onFileChange(file) {
      const text = await this.readFileAsync(file);
      return await csvtojsonV2().fromString(text);
    },

    async onTransactionsFileChange(file) {
      this.transactions = await this.onFileChange(file);
    },

    async onCategoriesFileChange(file) {
      this.categories = await this.onFileChange(file);
    },

    close() {
      this.transactions = [];
      this.categories = [];
      this.dialog = false;
    },

    save() {
      this.dialog = false;
      this.$emit("import", {
        transactions: this.transactions,
        categories: this.categories,
      });
    },
  },
};
</script>
