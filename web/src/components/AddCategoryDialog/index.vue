<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="quickLink" color="blue darken-1" text plain v-bind="attrs" v-on="on">{{
        formTitle
      }}</v-btn>
      <v-btn v-else color="primary" dark class="ml-2" v-bind="attrs" v-on="on">添加</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  label="分类名称"
                  v-model="formData.name"
                  :rules="[rules.required, rules.unique]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-select
                  v-model="formData.type"
                  :items="types"
                  :rules="[rules.required]"
                  item-value="value"
                  item-text="label"
                  label="类型"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">取消</v-btn>
        <v-btn :disabled="!valid" color="blue darken-1" text @click="save">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddCategoryDialog",
  props: {
    quickLink: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        unique: (value) => this.isUniqueCategory(value),
        required: (value) => !!value || "必填",
      },
      valid: false,
      formData: {},
      dialog: false,
      formTitle: "新建账单分类",
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
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },

    save() {
      this.validate();
      this.dialog = false;
      this.$emit("change", this.formData);
    },

    validate() {
      this.$refs.form.validate();
    },

    /**
     * @return true - is unique
     */
    isUniqueCategory(val) {
      return !this.$store.state.categories.categories.find((i) => i.name === val) || "已存在";
    },
  },
};
</script>
