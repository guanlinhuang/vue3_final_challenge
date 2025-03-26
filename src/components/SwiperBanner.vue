<template>
  <div class="container-fluid">
    <Swiper :pagination="{
      dynamicBullets: true,
      clickable: true,
    }"
     :autoplay="{delay: 2500,disableOnInteraction: false}" :modules="modules" :loop="true" class="swiperBanner">
      <SwiperSlide class="slideBanner"></SwiperSlide>
      <SwiperSlide class="slideBanner2"></SwiperSlide>
      <SwiperSlide class="slideBanner3"></SwiperSlide>
    </Swiper>
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
