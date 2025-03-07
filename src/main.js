/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import SmallSidebar from '@/components/SmallSidebar.vue'
import { currency, date } from '@/methods/filters'
import $httpMessageState from './methods/pushMessageState'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import {
  Form, Field, ErrorMessage, defineRule, configure
} from 'vee-validate'
import { all as AllRules } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule])
})

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})
setLocale('zh_TW')
const app = createApp(App)
app.use(router)
app.use(VueAxios, axios)
app.component('Loading', Loading)
app.component('SmallSidebar', SmallSidebar)
app.config.globalProperties.$filters = {
  currency, date
}
app.config.globalProperties.$httpMessageState = $httpMessageState
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)

app.mount('#app')
