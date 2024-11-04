<template>
  <div class="container py-5">
    <h3>熱銷商品</h3>
    <swiper
      :navigation="true"
      :modules="modules"
      :loop="true"
      class="swiperProducts"
      :slidesPerView="3"
      :centeredSlides="true"
      :spaceBetween="30"
      :pagination="{
        type: 'fraction',
      }"
    >
      <swiper-slide class="slideProducts">Slide 1</swiper-slide>
      <swiper-slide class="slideProducts2">Slide 2</swiper-slide>
      <swiper-slide class="slideProducts3">Slide 3</swiper-slide>
      <swiper-slide class="slideProducts">Slide 4</swiper-slide>
      <swiper-slide class="slideProducts2">Slide 5</swiper-slide>
      <swiper-slide class="slideProducts3">Slide 6</swiper-slide>
      <swiper-slide class="slideProducts">Slide 7</swiper-slide>
      <swiper-slide class="slideProducts2">Slide 8</swiper-slide>
      <swiper-slide class="slideProducts3">Slide 9</swiper-slide>
    </swiper>
    <div class="d-flex justify-content-center py-5">
      <a href="#" class="btn btn-outline-primary">探索更多</a>
    </div>
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
  components: {
    // 區域註冊
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

<!-- slidesPerView 每次輪播更換則數
centeredSlides 預設第一塊居左，設定true可居中
spaceBetween 每則輪播間距，如果想做文字跑馬燈，也可以設定成 auto，讓他自動計算
pagination="{  下方顯示第一頁/總頁數
  type: 'fraction',
}" -->
