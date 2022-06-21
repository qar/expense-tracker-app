module.exports = {
  transpileDependencies: ["vuetify"],

  publicPath: process.env.VUE_APP_FOR_GH_PAGES ? "." : "/",

  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "My Expenses";
      return args;
    });
  },
};
