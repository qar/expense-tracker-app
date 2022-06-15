<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">添加</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-select
                  v-model="formData.type"
                  :items="types"
                  item-value="value"
                  item-text="label"
                  label="类型"
                ></v-select>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field label="时间" value="12:30:00" type="datetime-local"></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-select
                  v-model="formData.category"
                  :items="categories"
                  item-value="value"
                  item-text="label"
                  label="分类"
                ></v-select>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field label="金额" v-model="formData.amount" prefix="￥"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
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
export default {
  name: "AddEntryDialog",
  data() {
    return {
      valid: false,
      formData: {},
      dialog: false,
      formTitle: "记帐",
      types: [
        {
          label: "支出",
          value: "0",
        },
        {
          label: "收入",
          value: "1",
        },
      ],
      categories: [],
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },

    save() {
      this.dialog = false;
    },
  },
};
</script>
