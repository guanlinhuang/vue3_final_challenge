const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '<--repository name-->' // ex: '/the_f2e_2022_week1/'
    : '/'
})
