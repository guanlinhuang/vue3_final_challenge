<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <div class="container products_all mainContainer">
    <div v-if="favorite.length !== 0" class="py-5">
      <h3 class="text-center">收藏清單</h3>
      <div class="row justify-content-center">
        <div class="col col-lg-9 mt-lg-5" style="margin-top: 45px">
          <div class="row row-cols-2 row-cols-lg-4 row-cols-xxl-5 gx-2 gx-lg-4 p-1 p-lg-0">
            <div
              class="col mb-4 mb-lg-5"
              v-for="item in favoriteProduct"
              :key="item.id"
            >
              <div
                class="position-relative text-center product d-flex flex-column h-100"
              >
                <div class="mb-2">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeFavorite(item)"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
                <a @click="getProductPage(item.id)">
                  <div
                    v-if="item.origin_price !== item.price"
                    class="onSale_favorite position-absolute text-white bg-danger py-1 px-3"
                    style="z-index: 5"
                  >
                    特 價
                  </div>
                  <div class="product_img">
                    <img
                      :src="`${item.imageUrl}`"
                      :alt="item.title"
                      class="object-fit-cover"
                    />
                  </div>
                  <p class="my-1 fw-normal">{{ item.title }}</p>
                  <div class="price text-center">
                    <div v-if="item.origin_price !== item.price">
                      <p class="mb-1 text-danger">NT$ {{ item.price }}</p>
                    </div>
                    <div v-if="item.origin_price === item.price">
                      <p class="mb-1">NT$ {{ item.price }}</p>
                    </div>
                    <div v-if="item.origin_price !== item.price">
                      <p
                        class="product_origin_price mb-1 text-decoration-line-through"
                        style="font-size: 13px"
                      >
                        NT$ {{ item.origin_price }}
                      </p>
                    </div>
                  </div>
                </a>
                <div class="mt-auto">
                  <button
                    type="button"
                    class="btnHover btnHover5 col ms-1 ms-lg-0 me-lg-1"
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
          </div>
        </div>
      </div>
    </div>
    <div v-else style="padding-top: 180px; padding-bottom: 250px">
      <div class="text-center my-5">
        <p class="fs-4 ls">您的收藏清單目前是空的唷！</p>
        <router-link
          to="/productsall"
          type="button"
          class="btnHover btn-lg rounded-0 mt-3 d-block w-25 mx-auto"
        >
          <div>
            <span>去逛逛商店 <i class="bi bi-arrow-right" /></span>
            <span>去逛逛商店 <i class="bi bi-arrow-right" /></span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import saveFavorite from '@/methods/saveFavorite'

export default {
  data () {
    return {
      favorite: saveFavorite.getFavorite() || [],
      favoriteProduct: [],
      isLoading: false,
      carts: []
    }
  },
  inject: ['emitter'],
  methods: {
    getFavoriteProduct () {
      this.isLoading = true
      this.$http
        .get(
          `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((response) => {
          this.isLoading = false
          this.favoriteProduct = response.data.products.filter((product) =>
            this.favorite.includes(product.id)
          )
          this.emitter.emit('update-favorite', this.favoriteProduct)
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http
        .get(url)
        .then((response) => {
          this.carts = response.data.data.carts
          this.emitter.emit('update-cart', this.carts)
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    removeFavorite (item) {
      this.isLoading = true
      this.favorite.splice(this.favorite.indexOf(item.id), 1)
      this.$httpMessageState(
        {
          data: {
            success: true
          }
        },
        `已將 ${item.title} 移除喜愛清單`
      )
      saveFavorite.saveFavorite(this.favorite)
      this.isLoading = false
      this.getFavoriteProduct()
    },
    addToCart (id, qty = this.productsQty) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http
        .post(url, { data: cart })
        .then((response) => {
          this.isLoading = false
          this.$httpMessageState(
            response,
            ` ${response.data.data.product.title} 加入購物車 `
          )
          this.getCart()
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    getProductPage (id) {
      this.$router.push(`/products/${id}`)
    }
  },
  created () {
    this.getFavoriteProduct()
  }
}
</script>
