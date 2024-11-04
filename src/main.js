/* eslint-disable vue/multi-word-component-names */
// 這三行本來就有了
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 用於登入頁面login.vue // 格式來自官網
import axios from 'axios' // npm install --save axios vue-axios --legacy-peer-dep
import VueAxios from 'vue-axios'

// 讀取視覺套件 // 格式來自官網
import Loading from 'vue3-loading-overlay' // npm install vue3-loading-overlay --legacy-peer-dep
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

// 千分字號 & 轉換日期// js  // 可套用到全域 // 格式來自官網
import { currency, date } from '@/methods/filters'

// 推播訊息狀態 // js
import $httpMessageState from './methods/pushMessageState'

// 載入 bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css' // npm install bootstrap@5.3.3 --legacy-peer-dep

// 手風琴 (Accordion) // js
import Collapse from 'bootstrap/js/dist/collapse'

// 引入 VeeValidate 元件跟功能
import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import { all as AllRules } from '@vee-validate/rules' // 引入 VeeValidate 的驗證規則 // * 代表全部，即把所有的 rule 匯入到 AllRules 這個變數下
import { localize, setLocale } from '@vee-validate/i18n' // 引入 VeeValidate 的 i18n 功能
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json' // 引入 VeeValidate 的繁體中文語系檔

/// 使用 Object.keys 將 AllRules 轉為陣列並使用 forEach 迴圈將驗證規則加入 VeeValidate
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true // 當輸入任何內容直接進行驗證
})
/// 設定預設語系
setLocale('zh_TW')

// createApp(App).use(router).mount('#app') // 這行本來就有了
const app = createApp(App)
app.use(router)
app.use(VueAxios, axios) // 用於登入頁面login.vue
app.use('Collapse', Collapse) // 手風琴 (Accordion) // js
app.component('Loading', Loading) // 讀取視覺套件 // 全域註冊
app.config.globalProperties.$filters = { // 千分字號 & 轉換日期 // 可套用到全域
  currency, date
}
app.config.globalProperties.$httpMessageState = $httpMessageState // 推播訊息狀態
// 此函式的用途是整合 Ajax 的錯誤事件，統一整理發送給予 Toast 處理
// 正常來說不建議太多方法掛Global，這裡可以使用provide來處理
app.component('Form', Form) // 引入 VeeValidate 元件跟功能 // 全域註冊
app.component('Field', Field) // 引入 VeeValidate 元件跟功能 // 全域註冊
app.component('ErrorMessage', ErrorMessage) // 引入 VeeValidate 元件跟功能 // 全域註冊

app.mount('#app') // 上面掛載了一些外掛后，將它綁定到html文件上的<div id="app"></div>這個區塊上，就可渲染

// app.use 是用來載入套件js或自定義檔案
// app.component 是用來註冊元件
