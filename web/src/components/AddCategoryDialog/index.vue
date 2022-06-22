<template>
  <v-dialog :value="visible" max-width="500px">
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
    visible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: undefined,
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

  watch: {
    data: {
      handler(newV, oldV) {
        if (!newV || newV === oldV) {
          return;
        }
        console.log(newV);
        this.formData = {
          ...newV,
        };
      },
      immediate: true,
    },
  },

  computed: {
    formTitle() {
      return this.data?.id ? "编辑账单分类" : "新建账单分类";
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },

    save() {
      this.validate();
      this.close();
      this.$emit("change", this.formData);
    },

    validate() {
      this.$refs.form.validate();
    },

    /**
     * @return true - is unique
     */
    isUniqueCategory(val) {
      const one = this.$store.state.categories.categories.find((i) => i.name === val);
      if (one && one.id !== this.data?.id) {
        return "已存在";
      }
      return true;
    },
  },
};
</script>
