<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">导入</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-file-input truncate-length="15" @change="onFileChange"></v-file-input>
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
      json: null,
      dialog: false,
      formTitle: "导入账单",
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
      this.json = await csvtojsonV2().fromString(text);
    },

    close() {
      this.json = null;
      this.dialog = false;
    },

    save() {
      this.dialog = false;
      this.$emit("import", this.json);
    },
  },
};
</script>
