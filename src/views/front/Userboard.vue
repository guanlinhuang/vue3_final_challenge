<template>
  <NavbarFront></NavbarFront>
  <div class="HomeView">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
    <ToastMessages></ToastMessages>
  </div>
  <FooterFront></FooterFront>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import NavbarFront from '@/components/Navbar_front.vue'
import FooterFront from '@/components/Footer_front.vue'

export default {
  name: 'HomeView',
  components: {
    // HelloWorld,
    ToastMessages,
    NavbarFront,
    FooterFront
  },
  provide () { // 本外層元件加入provide // 可讓內層元件(加入inject)可以使用本外層元件的mitt套件功能
    return {
      emitter
    }
  },
  created () {
    console.log(process.env.VUE_APP_API, process.env.VUE_APP_PATH)
  } // 檢查是否有把環境變數加到專案中
}

</script>
