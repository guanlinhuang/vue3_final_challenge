<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <div class="container py-lg-5 UserProductDetail">
    <div class="row d-flex justify-content-lg-center">
      <div class="col-lg-5 col-xl-4 me-5 mt-0 mt-sm-2">
        <nav aria-label="breadcrumb" class="d-none d-lg-block">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link
                to="/productsall"
                class="text-decoration-none text-dark productsall"
                >所有商品</router-link
              >
            </li>
            <li class="breadcrumb-item active text-dark" aria-current="page">
              {{ product.title }}
            </li>
          </ol>
        </nav>
        <div class="product_img mb-3 rounded-0">
          <img :src="product.imageUrl" alt="" class="object-fit-cover" />
        </div>
      </div>
      <div class="col-lg-4 mt-lg-5 px-4 px-lg-0">
        <h2>{{ product.title }}</h2>
        <div class="mb-3">{{ product.description }}</div>
        <div v-if="product.origin_price !== product.price">
          <p class="product_origin_price text-decoration-line-through mb-1">
            原價 NT$ {{ product.origin_price }}
          </p>
        </div>
        <div v-if="product.origin_price !== product.price">
          <p class="mb-1 text-danger h5">特價 NT$ {{ product.price }}</p>
        </div>
        <div v-if="product.origin_price === product.price">
          <p class="h5 mb-1">原價 NT$ {{ product.price }}</p>
        </div>

        <hr class="w-auto" />
        <div>{{ product.content }}</div>
        <div class="d-flex">
          <div class="input-group my-3">
            <button
              class="btn border-0"
              type="button"
              @click="changeQty(-1)"
              :disabled="productsQty === 1"
            >
              <i class="bi bi-dash-lg"></i>
            </button>
            <input
              type="number"
              class="form-control text-center"
              v-model="productsQty"
              min="1"
              readonly
            />
            <button class="btn border-0" type="button" @click="changeQty(1)">
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
          <div class="my-auto">
            <button
              type="button"
              @click.stop="toggleFavorite(product)"
              class="btn btn-favorite colorHeart fs-3"
            >
              <i
                class="bi"
                :class="
                  favorite.includes(product.id) ? 'bi-heart-fill' : 'bi-heart'
                " style="color:#8fc0a9"
              ></i>
            </button>
          </div>
        </div>
        <div class="row gx-lg-0">
          <button
            type="button"
            class="btnHover col mx-1 mx-lg-0 me-lg-3"
            @click="nowBuy(product.id)"
          >
            <div>
              <span>立即購買</span>
              <span>立即購買</span>
            </div>
          </button>
          <button
            type="button"
            class="btnHover btnHover5 col me-1"
            @click="addToCart(product.id)"
          >
            <div>
              <span>加到購物車</span>
              <span>加到購物車</span>
            </div>
          </button>
        </div>
      </div>
    </div>
    <div class="my-5">
      <h4 class="py-lg-3 fw-normal ms-3 ms-lg-0">看更多商品</h4>
      <swiper
        class="product-swiper"
        :navigation="{
          nextEl: '.swiper-button-next', // 下一則
          prevEl: '.swiper-button-prev', // 上一則
        }"
        :modules="modules"
        :loop="true"
        :spaceBetween="3"
        :slidesPerView="3"
        :breakpoints="{
          992: { slidesPerView: 6, spaceBetween: 30 },
        }"
      >
        <swiper-slide v-for="item in products" :key="item.id">
          <div class="position-relative text-center product h-100">
            <a @click="getProductPage(item.id)">
              <div class="swiper_img">
                <img :src="`${item.imageUrl}`" class="object-fit-cover" />
              </div>
            </a>
          </div>
        </swiper-slide>
        <button class="swiper-button-next btn btn-light"></button>
        <button class="swiper-button-prev btn btn-light"></button>
      </swiper>
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
import saveFavorite from '@/methods/saveFavorite'
export default {
  data () {
    return {
      product: {},
      id: '',
      carts: [],
      productsQty: 1,
      products: [], // swiper products
      favorite: saveFavorite.getFavorite() || [], // import進來的saveFavorite // 預設為getFavorite() 或 回傳空陣列(如果localstorage沒東西)
      favoriteProduct: [],
      modules: [Autoplay, Pagination, Navigation]
    }
  },
  inject: ['emitter'], // 內層使用inject // 可使用外層元件Userboard.vue的mitt套件功能
  components: {
    // 區域註冊
    Swiper,
    SwiperSlide
  },
  methods: {
    getProduct () {
      // 撈出某一商品id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
        }
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    getCart () {
      // 取得購物車列表 // 用於側邊欄購物車標籤
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
        this.emitter.emit('update-cart', this.carts)
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },

    // 立即購買按鈕
    nowBuy (id, qty = this.productsQty) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '加入購物車')
        this.getCart()
        this.$router.push('/cart')
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },

    // 加到購物車按鈕
    addToCart (id, qty = this.productsQty) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '加入購物車')
        this.getCart()
      })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },

    // 更新購物車
    updateCart (item) {
      // 更新購物車
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        this.getCart()
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    // 加減按鈕
    changeQty (number) {
      this.productsQty += number
    },
    // 看更多商品
    getProductPage (id) {
      this.$router.push(`/products/${id}`) // 網址改某一商品id
      this.id = id // 換新商品 id
      this.getProduct() // 渲染新商品畫面
      this.getProducts() // swiper products 重整
    },
    // swiper products
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
              .filter((e) => e.id !== this.id) // 篩選主要id以外的商品
              .sort(() => Math.random() - 0.5) // 亂數排序
            this.isLoading = false
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次')
          this.isLoading = false
        })
    },
    getFavoriteProduct () { // 從所有產品清單篩選localstorage裡收藏的產品，並儲存到this.favoriteProduct
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((response) => {
          this.favoriteProduct = response.data.products.filter((product) => this.favorite.includes(product.id))
          this.emitter.emit('update-favorite', this.favoriteProduct)
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    toggleFavorite (product) { // 「 加入我的最愛 」按鈕 // 如果localstorage沒有該筆產品id，就加入收藏，如果已經存在，就移除收藏
      if (this.favorite.includes(product.id)) {
        this.favorite.splice(this.favorite.indexOf(product.id), 1) // 如果該產品已經存在，就移除收藏
        this.$httpMessageState(
          {
            data: {
              success: true
            }
          },
          '移除收藏'
        )
      } else {
        this.favorite.push(product.id) // 如果沒有該筆產品，就加入收藏
        this.$httpMessageState(
          {
            data: {
              success: true
            }
          },
          '加入收藏'
        )
      }
      saveFavorite.saveFavorite(this.favorite) // 觸發saveFavorite.js函式 //儲存或移除localstorage裡的產品
      this.getFavoriteProduct()
    }
  },
  created () {
    this.id = this.$route.params.productId
    this.getProduct()
    this.getCart()
    this.getProducts()
  }
}
</script>

<!-- // @click.stop="toggleFavorite(product)" .stop的作用就如同大家熟知的 event.stopPropagation()，用來阻擋事件冒泡
// 事件冒泡：事件點擊後，會一直冒泡上去 -->
