<template>
  <NavbarFront></NavbarFront>
  <div class="HomeView">
    <router-view></router-view>
    <ToastMessages></ToastMessages>
    <SmallSidebar></SmallSidebar>
  </div>
  <FooterFront></FooterFront>
</template>

<script>
import emitter from '@/methods/emitter' // mitt跨元件資料傳遞js
import ToastMessages from '@/components/ToastMessages.vue'
import NavbarFront from '@/components/Navbar_front.vue'
import FooterFront from '@/components/Footer_front.vue'
import SmallSidebar from '@/components/SmallSidebar'

export default {
  components: {
    ToastMessages,
    NavbarFront,
    FooterFront,
    SmallSidebar
  },
  provide () { // 本外層元件加入provide // 可讓內層元件(加入inject)可以使用本外層元件的mitt套件功能
    return {
      emitter
    }
  },
  created () {
    // console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)// 檢查是否有把環境變數加到專案中
  }
}

</script>
