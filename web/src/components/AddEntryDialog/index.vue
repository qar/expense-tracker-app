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
                <v-row>
                  <v-col cols="6" md="6">
                    <v-menu
                      ref="dateMenu"
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      :return-value.sync="formData.date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formData.date"
                          label="日期"
                          :rules="[rules.required]"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="formData.date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateMenu = false">取消</v-btn>
                        <v-btn text color="primary" @click="$refs.dateMenu.save(formData.date)">
                          确定
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="3" md="3">
                    <v-select
                      v-model="formData.hour"
                      :items="hourOptions"
                      :rules="[rules.required]"
                      label="时"
                    ></v-select>
                  </v-col>
                  <v-col cols="3" md="3">
                    <v-select
                      v-model="formData.minute"
                      :items="minuteOptions"
                      :rules="[rules.required]"
                      label="分"
                    ></v-select>
                  </v-col>
                </v-row>
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
                  :rules="[rules.required, rules.currency]"
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
      dateMenu: false,
      formData: {
        time: new Date().toISOString().slice(0, 19),
      },
      rules: {
        required: (value) => !!value || "必填",
        currency: (value) => !Number.isNaN(Number(value)) || "无法识别的金额",
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
    hourOptions() {
      const options = [];
      for (let h = 0; h <= 24; h++) {
        options.push(`${h < 10 ? "0" + h : h}`);
      }
      return options;
    },

    minuteOptions() {
      const options = [];
      for (let m = 0; m <= 59; m++) {
        options.push(`${m < 10 ? "0" + m : m}`);
      }
      return options;
    },

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
      const time = new Date(this.formData.date);
      time.setHours(this.formData.hour);
      time.setMinutes(this.formData.minute);
      const data = {
        ...this.formData,
        time: time.valueOf().toString(),
      };
      delete data.hour;
      delete data.minute;
      delete data.date;
      this.$emit("change", data);
    },
  },
};
</script>
