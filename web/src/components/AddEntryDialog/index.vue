<template>
  <v-dialog :value="visible" persistent max-width="500px">
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
                  label="金额"
                  v-model="formData.amount"
                  :rules="[rules.required, rules.currency]"
                  prefix="￥"
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

              <v-col cols="12" md="12">
                <v-select
                  v-model="formData.category"
                  :items="categories"
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
                      item-value="value"
                      item-text="label"
                      label="时"
                    ></v-select>
                  </v-col>
                  <v-col cols="3" md="3">
                    <v-select
                      v-model="formData.minute"
                      :items="minuteOptions"
                      :rules="[rules.required]"
                      item-value="value"
                      item-text="label"
                      label="分"
                    ></v-select>
                  </v-col>
                </v-row>
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
      valid: false,
      dateMenu: false,
      formData: {},
      rules: {
        required: (value) => (!!value && value !== 0) || "必填",
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
        options.push({
          label: `${h < 10 ? "0" + h : h}`,
          value: h,
        });
      }
      return options;
    },

    minuteOptions() {
      const options = [];
      for (let m = 0; m <= 59; m++) {
        options.push({
          label: `${m < 10 ? "0" + m : m}`,
          value: m,
        });
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
  watch: {
    visible: {
      handler(newV, oldV) {
        if (!newV) {
          return;
        }
        const { date, hour, minute } = this.getDateTime(new Date());

        this.formData = {
          type: "0",
          date,
          hour,
          minute,
        };

        // 如果编辑过一条数据，再关闭，然后再添加一条数据，
        // 此时在当前组件的声明周期内，formData.amount 字段从有值变成了 undefined,
        // 会触发 v-form 校验
        // 所以每次打开弹窗时手动重置表单的校验信息
        this.$refs?.form?.resetValidation();
      },
      immediate: true,
    },
    data: {
      handler(newV, oldV) {
        if (!newV || newV === oldV) {
          return;
        }
        const { date, hour, minute } = this.getDateTime(
          newV?.time ? parseInt(newV.time, 10) : new Date()
        );

        this.formData = {
          type: "0",
          date,
          hour,
          minute,
          ...newV,
        };
      },
      immediate: true,
    },
  },

  methods: {
    reset() {
      this.$refs?.form?.resetValidation();
    },

    /**
     * leave values empty if milliseconds creates an invalid date object
     * @reutrn { date: "2020-11-23", hour: "4", minute: "5" }
     */
    getDateTime(milliseconds) {
      const result = {
        date: "",
        hour: "",
        minute: "",
      };
      const d = new Date(milliseconds);
      if (d.toString() === "Invalid Date") {
        return result;
      }
      let month = d.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let date = d.getDate();
      date = date < 10 ? "0" + date : date;
      result.date = `${d.getFullYear()}-${month}-${date}`;
      result.hour = d.getHours();
      result.minute = d.getMinutes();
      return result;
    },

    onCategoryAdd(data) {
      this.$store.dispatch("categories/add", data);
    },

    close() {
      this.reset();
      this.$emit("close");
    },

    save() {
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
      this.close();
    },
  },
};
</script>
