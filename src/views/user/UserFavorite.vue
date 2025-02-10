<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <!-- <img
    src=""
    alt=""
    style="width: 100%; height: 300px; background-color: antiquewhite"
  /> -->
  <div class="container products_all">
    <div v-if="favorite.length !== 0" class="py-5">
    <h3 class="text-center">收藏清單</h3>
    <div class="row justify-content-center gx-1 gx-lg-4">
      <div class="col col-lg-9 mt-lg-5" style="margin-top: 45px">
        <div class="row row-cols-2 row-cols-lg-5">
          <div
            class="col mb-4 mb-lg-5"
            v-for="item in favoriteProduct"
            :key="item.id"
          >
            <div
              class="position-relative text-center product d-flex flex-column h-100"
            >
              <a @click="getProductPage(item.id)">
                <div
                  v-if="item.origin_price !== item.price"
                  class="onSale position-absolute text-white bg-danger py-1 px-3"
                  style="z-index: 5"
                >
                  特 價
                </div>
                <div class="product_img">
                  <img :src="`${item.imageUrl}`" class="object-fit-cover" />
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
                      class="product_origin_price mb- ms-2 text-decoration-line-through"
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
                  class="btn btn-sm px-3 me-3 fs-5"
                  style="color: #8fc0a9; border: #8fc0a9 1px solid"
                  @click="addToCart(item.id, 1)"
                >
                  <i class="bi bi-cart-plus"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeFavorite(item)"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></div>
    <div v-else style="margin-top: 150px; margin-bottom: 250px">
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
  <!-- <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar> -->
</template>

<script>
import saveFavorite from '@/methods/saveFavorite'

export default {
  data () {
    return {
      favorite: saveFavorite.getFavorite() || [], // import進來的saveFavorite // 取得getFavorite() 或 回傳空陣列(如果localstorage沒東西)
      favoriteProduct: [],
      isLoading: false,
      carts: []
      // status: {
      //   loadingItem: ''
      // }
    }
  },
  inject: ['emitter'], // 內層使用inject // 可使用外層元件Userboard.vue的mitt套件功能
  methods: {
    getFavoriteProduct () {
      // 從所有產品清單篩選localstorage裡收藏的產品，並儲存到this.favoriteProduct
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
          // console.log(this.favoriteProduct.length)
          this.emitter.emit('update-favorite', this.favoriteProduct)
        })
        .catch((error) => {
          this.isLoading = false
          this.$httpMessageState(error, '連線錯誤')
        })
    },
    getCart () {
      // 取得購物車列表 // 用於側邊欄購物車標籤
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
        // console.log('this.carts', this.carts)
        this.emitter.emit('update-cart', this.carts)
      })
    },
    removeFavorite (item) {
      // 移除收藏的產品
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
      this.getFavoriteProduct() // 重新渲染畫面
    },
    // updateFavorite () {
    //   this.favorite = saveFavorite.getFavorite()
    // },
    // addToCart (id, qty) {
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
    //   const data = {
    //     product_id: id,
    //     qty
    //   }
    //   this.status.loadingItem = id
    //   this.$http
    //     .post(api, { data })
    //     .then((response) => {
    //       this.status.loadingItem = ''
    //       this.qty = 1
    //       // this.emitter.emit('update-cart', id)
    //       this.$httpMessageState(response, ` ${response.data.data.product.title} 加入購物車 `)
    //     })
    //     .catch((error) => {
    //       this.$httpMessageState(error, '連線錯誤')
    //     })
    // }
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
          // this.emitter.emit('update-cart', id)
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
      // 取得某一商品id，並導到該商品獨立頁面
      this.$router.push(`/products/${id}`)
    }
  },
  created () {
    this.getFavoriteProduct()
    console.log(this.favorite.length)
  }
  // mounted () {
  //   // this.emitter.on('update-favorite', this.updateFavorite) // on是監聽
  //   this.getFavoriteProduct()
  // }
}
</script>
