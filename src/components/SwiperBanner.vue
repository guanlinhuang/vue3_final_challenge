<template>
  <div class="container-fluid">
    <swiper :navigation="true" :modules="modules" :loop="true" class="swiperBanner">
      <swiper-slide class="slideBanner">Slide 1</swiper-slide>
      <swiper-slide class="slideBanner2">Slide 2</swiper-slide>
      <swiper-slide class="slideBanner3">Slide 3</swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue' // 載入Swiper Vue.js

import { Navigation, Pagination, Autoplay } from 'swiper/modules' // 載入swiper 原生js
// Autoplay（自動播放）、Pagination（頁碼）、Navigation（上下一則導航)

import 'swiper/css' // 載入swiper 原生css // 必載入
import 'swiper/css/pagination' // 載入頁碼樣式原生css // 可不載入
import 'swiper/css/navigation' // 載入上下一則導航樣式原生css // 可不載入

export default {
  data () {
    return {
      modules: [Autoplay, Pagination, Navigation]
    }
  },
  components: { // 區域註冊
    Swiper,
    SwiperSlide
  }
}
</script>

<!-- setup () 是 Vue3 的 Composition Api 撰寫方式，取代 原本的 Option Api 的 data ()撰寫方式
但目前只會Option Api，還沒學Composition Api，可先改回 data ()

教學一：https://vocus.cc/article/66124270fd89780001f54193
教學二：https://ithelp.ithome.com.tw/articles/10259305 -->

<!-- npm install swiper --legacy-peer-dep -->

<!-- :autoplay="{delay: 2500,disableOnInteraction: false}" -->
