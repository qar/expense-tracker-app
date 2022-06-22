<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on">mdi-cog-outline</v-icon>
    </template>

    <v-list>
      <v-list-item-group v-model="model">
        <v-list-item v-for="(item, i) in items" :key="i" @click="item.clickHandler">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "SettingsButton",

  data() {
    return {
      model: false,
      items: [
        {
          icon: "mdi-application-import",
          text: "导入测试账单 CSV 文件",
          clickHandler: () => this.$emit("import"),
        },
        {
          icon: "mdi-application-export",
          text: "导出账单 CSV 文件",
          clickHandler: () => this.$emit("export-transactions"),
        },
        {
          icon: "mdi-application-export",
          text: "导出账单分类 CSV 文件",
          clickHandler: () => this.$emit("export-categories"),
        },
      ],
    };
  },
};
</script>
