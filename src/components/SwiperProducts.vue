<template>
  <div class="container py-5">
    <h3 class="py-3">熱銷商品</h3>
    <swiper
      class="product-swiper"
      :navigation="{
        nextEl: '.swiper-button-next', // 下一則
        prevEl: '.swiper-button-prev', // 上一則
      }"
      :modules="modules"
      :loop="true"
      :slidesPerView="4"
      :spaceBetween="30"
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <div class="position-relative product">
          <a @click="getProduct(item.id)">
            <div
              v-if="item.origin_price !== item.price"
              class="onSale position-absolute text-white bg-danger py-1 px-3" style="z-index:5"
            >
              特 價
            </div>
            <div class="product_img rounded-4">
                  <img
                    :src="`${item.imageUrl}`" class="object-fit-cover"
                  />
                </div>
            <h5 class="my-1 fw-normal">{{ item.title }}</h5>
            <div v-if="item.origin_price !== item.price">
              <p class="mb-1 fs-4 text-danger">NT$ {{ item.price }}</p>
            </div>
            <div v-if="item.origin_price === item.price">
              <p class="mb-1 fs-4">NT$ {{ item.price }}</p>
            </div>
            <div v-if="item.origin_price !== item.price">
              <p class="mb-1 text-decoration-line-through">
                NT$ {{ item.origin_price }}
              </p>
            </div>
          </a>
        </div>
      </swiper-slide>
      <button class="swiper-button-next btn btn-light"></button>
      <button class="swiper-button-prev btn btn-light"></button>
    </swiper>
    <div class="d-flex justify-content-center py-5">
      <router-link to="/products" class="btn btn-outline-primary"
        >more</router-link
      >
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
      modules: [Autoplay, Pagination, Navigation],
      products: []
    }
  },
  components: {
    // 區域註冊
    Swiper,
    SwiperSlide
  },
  methods: {
    getProducts () {
      // 取得商品列表_all
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all` // *** api改${}
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        console.log(this.products)
      })
    },
    getProduct (id) {
      // 取得某一商品id，並導到該商品獨立頁面
      this.$router.push(`/products/${id}`)
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<!-- 若要編輯vue裡的Swiper裡的class屬性標籤，有兩個方法
1.在vue直接加style，要加lang="scss" 、scoped、deep，才能覆蓋過去
2.在自定義的_swiper.scss編輯，要加!important，才能覆蓋過去 -->
<!-- <style lang="scss" scoped>
// .swiper 原生css帶有 position-relative 和 overflow-hidden
// .swiper-button-next 或 .swiper-button-prev，原生帶css有 position-absolute 樣式
.swiper-button-next { // 原生帶有 position-absolute 樣式
  text-indent: 10%;
  white-space: nowrap;
  overflow: hidden;
  width: 40px;
  height: 60px;
  top:42%;
  //right:-20px; // 如果直接移動 navigation 位置，會發現超出 .swiper 的部分會被隱藏，所以直接調整swiper尺寸
  right:0px; // 此為最後一步驟 //完成.swiper區塊設定後，再設定左右 navigaiton button 的位置就完成
}

.swiper-button-prev {
  text-indent: -10%;
  white-space: nowrap;
  overflow: hidden;
  width: 40px;
  height: 60px;
  top:42%;
  //left: -20px; // 如果直接移動 navigation 位置，會發現超出 .swiper 的部分會被隱藏，所以直接調整swiper尺寸
  left:0px; // 此為最後一步驟 //完成.swiper區塊設定後，再設定左右 navigaiton button 的位置就完成
  // background: #000
}

:deep(.product-swiper) {
  margin: auto;
  padding: 0;

  @media (min-width: 768px) { // 768px以下不會顯示navigation
    margin: 0 -20px !important;
    padding: 0 20px !important;
    // 同時使用margin跟padding可互相抵銷，可保持原本swiper尺寸，也可將navigation超出.swiper尺寸，且超出的部分不會被隱藏
  }
}
</style> -->

<!-- setup () 是 Vue3 的 Composition Api 撰寫方式，取代 原本的 Option Api 的 data ()撰寫方式
但目前只會Option Api，還沒學Composition Api，可先改回 data ()

教學一：https://vocus.cc/article/66124270fd89780001f54193
教學二：https://ithelp.ithome.com.tw/articles/10259305 -->

<!-- npm install swiper --legacy-peer-dep -->

<!-- Swiper屬性說明
1. navigation 進退導覽按鈕
2. modules 在專案中引入swiper 時，需要用到的Swiper模組，沒有模組，就無法左右滑
3. loop 預設滑到最後一張，不會切換到第一張，設定true，可切換到第一張，讓Swiper看起來是循環的
4. slidesPerView 每次輪播更換則數
5. spaceBetween 每則輪播間距，如果想做文字跑馬燈，也可以設定成 auto，讓他自動計算
6. autoplay="{ delay: 2500,disableOnInteraction: true}"
autoplay 自動切換的時間間隔
delay 延遲(間隔)多久就會切換
autoplayDisableOnInteraction 設定true，用戶操作swiper之後自動切換會停止
7. centeredSlides 預設第一塊居左，設定true可居中
8. pagination="{  下方顯示第一頁/總頁數
  type: 'fraction',
}" -->

<!-- Swiper中文官網
https://3.swiper.com.cn/ -->

<!-- lang="scss" 是什麼？
表示該style標籤中使用的是scss語法編寫的樣式

scoped 是什麼？
在 .vue 檔案裏，在 style 裏加上 scoped 屬性的作用是避免目前元件的 style 會污染到子元件的 style

什麼是 deep selector？
deep selector 就是做相反的事。意思是無視 scoped 的限制，即使設定了 scoped，還是可以把父元件的樣式穿透到子元件 -->
