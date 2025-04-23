const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // filenameHashing: false, // 若不希望打包後的檔名出現雜湊值，可加入
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/vue3_final_challenge/" // ex: '/the_f2e_2022_week1/'
      : "/",
});
