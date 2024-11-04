<!-- 製作單一元件樣式排版 -->
<template>
  <div
    class="toast"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
    ref="toast"
  >
    <div class="toast-header">
      <span
        :class="`bg-${msg.style}`"
        class="p-2 rounded me-2 d-inline-block"
      ></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body" v-if="msg.content">
      {{ msg.content }}
    </div>
  </div>
</template>
  <!-- // 上方程式碼來自bootstrap官網 -->
<script>
import Toast from 'bootstrap/js/dist/toast' // 匯入原生js
export default {
  name: 'MyToast', // 不設也可以，設了等於自定義元件的名稱，在 Vue 的開發工具就會以這個名稱顯示。若沒有設定就會以該元件的檔名為名稱顯示
  props: ['msg'],
  mounted () {
    const toastEl = this.$refs.toast
    const toast = new Toast(toastEl, {
      // 透過mounted生命週期來把Toast實體化，才能使用到方法
      delay: 6000 // 持續顯示6秒
    })
    toast.show()
  }
}
</script>

<!-- 出現紅色波浪底線出現原因：
ESlint 有一個規則叫做 multi-word-component-names，這個規則緣由與 Vue 的元件可能會與原生 HTML 與未來可能會有的標籤發生衝突
比如說 Vue 創建了一個叫做 'div'，但原生的標籤就已經有 div 了（衝突到），這就是為什麼會規定 multi-word-component-names 的

若快速修復只有讓 ESLint 忽略掉不符合規則的那行而已
所以解決方法有兩個：
1. 將 name: 'Toast' 改成 MyToast、AppToast 之類具有兩個單字以上的名字
2. 到 .eslintrc.js 加入 'vue/multi-word-component-names': 'off' 以關閉這個規則
關閉規則加入的地方 -->
