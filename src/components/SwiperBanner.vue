<template>
  <div class="container-fluid">
    <swiper :pagination="{
      dynamicBullets: true,
      clickable: true,
    }"
     :autoplay="{delay: 2500,disableOnInteraction: false}" :modules="modules" :loop="true" class="swiperBanner">
      <swiper-slide class="slideBanner"></swiper-slide>
      <swiper-slide class="slideBanner2"></swiper-slide>
      <swiper-slide class="slideBanner3"></swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue' // 載入Swiper Vue.js

import { Autoplay, Pagination } from 'swiper/modules' // 載入swiper 原生js
// （自動播放）、Pagination（頁碼）、Navigation（上下一則導航)

import 'swiper/css' // 載入swiper 原生css // 必載入
// import 'swiper/css/pagination' // 載入頁碼樣式原生css // 可不載入
// import 'swiper/css/navigation' // 載入上下一則導航樣式原生css // 可不載入

export default {
  setup () {
    return {
      modules: [Autoplay, Pagination]
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

<!-- swiper中文網：https://www.swiper.com.cn/api/autoplay/16.html -->

<!-- :autoplay="{delay: 2500,disableOnInteraction: false}" 自動輪播
disableOnInteraction:true 觸碰後停止自動切換 -->

<!-- dynamicBullets: true 動態分頁器，當你的slide很多時，開啟後，分頁器小點的數量會部分隱藏
clickable: true 點選分頁器的指示點分頁器會控制Swiper切換 -->
