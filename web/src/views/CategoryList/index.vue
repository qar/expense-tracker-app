<template>
  <v-container fluid class="fill-height grey lighten-5">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" sm="12" md="12">
        <v-card tile outlined width="100%">
          <add-category-dialog
            :visible="dialogs.category.visible"
            :data="dialogs.category.data"
            @change="onCategoryAdd"
            @close="closeCategoryDialog()"
          />
          <v-dialog v-model="dialogs.del.visible" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">确定要删除这条记录吗？</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelDialog()">取消</v-btn>
                <v-btn color="blue darken-1" text @click="removeEntry(dialogs.del.data)"
                  >确定</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-data-table
            :headers="headers"
            :items="categories"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>分类</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="ml-2" @click="openCategoryDialog()">添加</v-btn>
              </v-toolbar>
            </template>

            <template v-slot:item.type="{ value }">{{ value === "0" ? "支出" : "收入" }}</template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="openCategoryDialog(item)"> mdi-pencil </v-icon>
              <v-icon small @click="openDeleteConfirmDialog(item)"> mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AddCategoryDialog from "@/components/AddCategoryDialog";

export default {
  name: "CategoryList",
  components: {
    AddCategoryDialog,
  },
  data() {
    return {
      dialogs: {
        category: {
          visible: false,
          data: undefined,
        },
        del: {
          visible: false,
        },
      },
      headers: [
        {
          text: "分类",
          align: "start",
          value: "name",
        },
        {
          text: "类型",
          value: "type",
        },
        { text: "操作", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState("categories", ["categories"]),
  },
  methods: {
    async removeEntry(data) {
      await this.$store.dispatch("categories/remove", data?.id);
      this.closeDelDialog();
    },

    openDeleteConfirmDialog(data) {
      this.$set(this.dialogs, "del", {
        visible: true,
        data,
      });
    },

    closeDelDialog() {
      this.$set(this.dialogs, "del", {
        visible: false,
        data: undefined,
      });
    },

    openCategoryDialog(data) {
      this.$set(this.dialogs, "category", {
        visible: true,
        data,
      });
    },

    closeCategoryDialog() {
      this.$set(this.dialogs, "category", {
        visible: false,
        data: undefined,
      });
    },

    onCategoryAdd(data) {
      this.$store.dispatch("categories/upsert", data);
    },
  },
};
</script>
