const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? 'vue3_final_challenge' // ex: '/the_f2e_2022_week1/'
    : '/'
})
