<template>
  <v-container fluid class="fill-height grey lighten-5">
    <v-row no-gutters class="fill-height">
      <v-col cols="12" sm="12" md="12">
        <v-card tile outlined width="100%">
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
                <add-category-dialog class="ma-2" @change="onCategoryAdd" />
              </v-toolbar>
            </template>

            <template v-slot:item.type="{ value }">{{ value === "0" ? "支出" : "收入" }}</template>
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
      ],
    };
  },
  computed: {
    ...mapState("categories", ["categories"]),
  },
  methods: {
    onCategoryAdd(data) {
      this.$store.dispatch("categories/add", data);
    },
  },
};
</script>
