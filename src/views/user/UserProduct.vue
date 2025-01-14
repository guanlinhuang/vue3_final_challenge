<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <!-- <img
    src=""
    alt=""
    style="width: 100%; height: 300px; background-color: antiquewhite"
  /> -->
  <div class="container py-lg-5">
    <div class="row d-flex justify-content-lg-center">
      <div class="col-lg-3 me-5">
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
        <img :src="product.imageUrl" alt="" class="img-fluid mb-3" />
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
        <!-- <div v-for="item in carts" :key="item.id">
        <input
          type="number"
          class="form-control"
          min="1"
          @change="updateCart(item)"
          v-model.number="item.qty"
        /></div> -->
        <div>{{ product.content }}</div>
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
            class="btnHover col me-1"
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
      <h4 class="py-3 fw-normal">看更多商品</h4>
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
      >
        <swiper-slide v-for="item in products" :key="item.id">
          <div class="position-relative text-center product h-100">
            <a @click="getProductPage(item.id)">
              <!-- <div
                v-if="item.origin_price !== item.price"
                class="onSale position-absolute text-white bg-danger py-1 px-3"
                style="z-index: 5"
              >
                特 價
              </div> -->
              <div class="product_img" style="height: 200px;">
                <img :src="`${item.imageUrl}`" class="object-fit-cover" />
              </div>
              <!-- <p class="my-1 fw-normal">{{ item.title }}</p> -->
              <!-- <div class="price text-center">
                <div v-if="item.origin_price !== item.price">
                  <p class="mb-1 text-danger">NT$ {{ item.price }}</p>
                </div>
                <div v-if="item.origin_price === item.price">
                  <p class="mb-1">NT$ {{ item.price }}</p>
                </div>
                <div v-if="item.origin_price !== item.price">
                  <p
                    class="product_origin_price mb- ms-2 text-decoration-line-through"
                    style="font-size: 13px"
                  >
                    NT$ {{ item.origin_price }}
                  </p>
                </div>
              </div> -->
            </a>
          </div>
        </swiper-slide>
        <button class="swiper-button-next btn btn-light">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button class="swiper-button-prev btn btn-light"></button>
      </swiper>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
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
      product: {},
      status: {
        loadingItem: ''
      },
      id: '',
      carts: [],
      productsQty: 1,
      products: [], // swiper products
      modules: [Autoplay, Pagination, Navigation]
    }
  },
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
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
          console.log('this.product', this.product)
        }
      })
    },
    getCart () {
      // 取得購物車列表
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
        console.log('this.carts', this.carts)
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
    },

    // 更新購物車
    // updateCart (item) {
    //   // 更新購物車
    //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
    //   // this.isLoading = true
    //   // this.status.loadingItem = item.id // 用於disabled狀態
    //   const cart = {
    //     product_id: item.product_id,
    //     qty: item.qty
    //   }
    //   this.$http.put(url, { data: cart }).then((res) => {
    //     console.log('updateCart', res)
    //     // this.status.loadingItem = ''
    //     this.getCart()
    //   })
    // },
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
            // .splice(1, 5)
            this.isLoading = false
            console.log('this.others', this.products)
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次')
          this.isLoading = false
        })
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
