<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="ml-2" v-bind="attrs" v-on="on">添加</v-btn>
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
                  :rules="[rules.required]"
                  item-value="value"
                  item-text="label"
                  label="类型"
                ></v-select>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  label="时间"
                  v-model="formData.time"
                  :rules="[rules.required]"
                  type="datetime-local"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <v-select
                  v-model="formData.category"
                  :items="categories"
                  :rules="[rules.required]"
                  item-value="value"
                  item-text="label"
                  label="分类"
                >
                  <template v-slot:append-item>
                    <v-divider class="mb-2"></v-divider>
                    <add-category-dialog class="ma-2" @change="onCategoryAdd" quickLink />
                  </template>
                </v-select>
              </v-col>

              <v-col cols="12" md="12">
                <v-text-field
                  label="金额"
                  v-model="formData.amount"
                  :rules="[rules.required]"
                  prefix="￥"
                ></v-text-field>
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
import AddCategoryDialog from "@/components/AddCategoryDialog";

export default {
  name: "AddEntryDialog",
  components: {
    AddCategoryDialog,
  },
  data() {
    return {
      valid: false,
      formData: {
        time: new Date().toISOString().slice(0, 19),
      },
      rules: {
        required: (value) => !!value || "必填",
      },
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
    };
  },
  computed: {
    categories() {
      return this.$store.state.categories.categories.map((i) => ({
        value: i.id,
        label: i.name,
      }));
    },
  },
  methods: {
    onCategoryAdd(data) {
      this.$store.dispatch("categories/add", data);
    },

    close() {
      this.dialog = false;
    },

    validate() {
      this.$refs.form.validate();
    },

    save() {
      this.dialog = false;
      this.$emit("change", this.formData);
    },
  },
};
</script>
