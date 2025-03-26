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
          <img :src="product.imageUrl" :alt="product.title" class="object-fit-cover" />
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
      <Swiper
        class="product-swiper"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :modules="modules"
        :loop="true"
        :spaceBetween="3"
        :slidesPerView="3"
        :breakpoints="{
          992: { slidesPerView: 6, spaceBetween: 30 },
        }"
      >
        <SwiperSlide v-for="item in products" :key="item.id">
          <div class="position-relative text-center product h-100">
            <a @click="getProductPage(item.id)">
              <div class="swiper_img">
                <img :src="`${item.imageUrl}`" :alt="item.title" class="object-fit-cover" />
              </div>
            </a>
          </div>
        </SwiperSlide>
        <button class="swiper-button-next btn btn-light"></button>
        <button class="swiper-button-prev btn btn-light"></button>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import saveFavorite from '@/methods/saveFavorite'
export default {
  data () {
    return {
      product: {},
      id: '',
      carts: [],
      productsQty: 1,
      products: [],
      favorite: saveFavorite.getFavorite() || [],
      favoriteProduct: [],
      modules: [Autoplay, Pagination, Navigation]
    }
  },
  inject: ['emitter'],
  components: {
    Swiper,
    SwiperSlide
  },
  methods: {
    getProduct () {
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
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
        this.emitter.emit('update-cart', this.carts)
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
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
    updateCart (item) {
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
    changeQty (number) {
      this.productsQty += number
    },
    getProductPage (id) {
      this.$router.push(`/products/${id}`)
      this.id = id
      this.getProduct()
      this.getProducts()
    },
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
              .filter((e) => e.id !== this.id)
              .sort(() => Math.random() - 0.5)
            this.isLoading = false
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次')
          this.isLoading = false
        })
    },
    getFavoriteProduct () {
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
    toggleFavorite (product) {
      if (this.favorite.includes(product.id)) {
        this.favorite.splice(this.favorite.indexOf(product.id), 1)
        this.$httpMessageState(
          {
            data: {
              success: true
            }
          },
          '移除收藏'
        )
      } else {
        this.favorite.push(product.id)
        this.$httpMessageState(
          {
            data: {
              success: true
            }
          },
          '加入收藏'
        )
      }
      saveFavorite.saveFavorite(this.favorite)
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
