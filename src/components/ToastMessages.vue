<!-- 掌管定位 訊息的呈現 -->
<template>
  <div
    class="toast-container position-absolute pe-3 top-0 end-0"
    style="z-index: 1050"
  >
    <Toast v-for="(msg, key) in messages" :key="key" :msg="msg" />
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue'
export default {
  components: { Toast }, // 區域註冊
  data () {
    return {
      messages: []
    }
  },
  inject: ['emitter'], // 內層使用inject // 可使用外層元件Dashboard.vue的mitt套件功能
  mounted () {
    this.emitter.on('push-message', (message) => {
      // message名稱自定義 // on是監聽
      console.log(message)
      const { style = 'success', title, content } = message // 也可不設success，這就端看寫的人怎麼設計而已，也可以不給預設值，要求使用一定要傳第一個參數
      this.messages.push({ style, title, content })
    })
  }
}
</script>
