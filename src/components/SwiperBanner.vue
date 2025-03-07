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
import { Swiper, SwiperSlide } from 'swiper/vue'

import { Autoplay, Pagination } from 'swiper/modules'

import 'swiper/css'

export default {
  setup () {
    return {
      modules: [Autoplay, Pagination]
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
