<template>
  <div class="container py-5 SwiperProducts">
    <h3 class="py-3 text-center">熱銷商品</h3>
    <swiper
      class="product-swiper"
      :navigation="{
        nextEl: '.swiper-button-next', // 下一則
        prevEl: '.swiper-button-prev', // 上一則
      }"
      :modules="modules"
      :loop="true"
      :spaceBetween="3"
      :slidesPerView="2"
      :breakpoints="{
        992: { slidesPerView: 6, spaceBetween: 30 },
      }"
    >
      <swiper-slide v-for="item in products" :key="item.id">
        <div class="position-relative text-center product h-100 mb-4 mb-lg-0">
          <a @click="getProductPage(item.id)">
            <div
              v-if="item.origin_price !== item.price"
              class="onSale position-absolute text-white bg-danger py-1 px-3 d-none d-lg-block"
              style="z-index: 5"
            >
              特 價
            </div>
            <div class="swiper_img">
              <img :src="`${item.imageUrl}`" class="object-fit-cover" />
            </div>
            <div>
              <p class="my-1 fw-normal mx-2">{{ item.title }}</p>
              <div class="price text-center">
                <div v-if="item.origin_price !== item.price">
                  <p class="mb-0 mb-lg-1 text-danger">NT$ {{ item.price }}</p>
                </div>
                <div v-if="item.origin_price === item.price">
                  <p class="mb-0 mb-lg-1">NT$ {{ item.price }}</p>
                </div>
                <div v-if="item.origin_price !== item.price">
                  <p
                    class="product_origin_price mb-0 mb-lg-3 text-decoration-line-through"
                    style="font-size: 13px"
                  >
                    NT$ {{ item.origin_price }}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </swiper-slide>
      <button class="swiper-button-next btn btn-light"></button>
      <button class="swiper-button-prev btn btn-light"></button>
    </swiper>
    <div class="d-flex justify-content-center">
      <router-link to="/productsall" class="btnHover"
        ><div>
          <span>more</span>
          <span>more</span>
        </div></router-link
      >
    </div>
  </div>
</template>

<script>
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
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
              .filter((e) => e.id !== this.id) // 篩選主要id以外的商品
              .sort(() => Math.random() - 0.5) // 亂數排序
            // .splice(1, 5)
            this.isLoading = false
            // console.log('this.others', this.products)
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次')
          this.isLoading = false
        })
    },
    getProductPage (id) {
      this.$router.push(`/products/${id}`) // 網址改某一商品id
      this.id = id // 換新商品 id
      // this.getProduct() // 渲染新商品畫面
      this.getProducts() // swiper products 重整
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
}"
9. breakpoints：RWD 響應式斷點，992：當螢幕寬度大於或等於992px時 -->

<!-- Swiper中文官網
https://3.swiper.com.cn/ -->

<!-- lang="scss" 是什麼？
表示該style標籤中使用的是scss語法編寫的樣式

scoped 是什麼？
在 .vue 檔案裏，在 style 裏加上 scoped 屬性的作用是避免目前元件的 style 會污染到子元件的 style

什麼是 deep selector？
deep selector 就是做相反的事。意思是無視 scoped 的限制，即使設定了 scoped，還是可以把父元件的樣式穿透到子元件 -->
