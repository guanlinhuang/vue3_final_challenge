<template>
    <Loading :active="isLoading"></Loading>
    <div class="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/user/cart">購物車</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
      </nav>
      <div class="row justify-content-center">
        <article class="col-8">
          <h2>{{ product.title }}</h2>
          <div>{{ product.content }}</div>
          <div>{{ product.description }}</div>
          <img :src="product.imageUrl" alt="" class="img-fluid mb-3">
        </article>
        <div class="col-4">
          <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
          <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
          <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
          <hr>
          <button type="button" class="btn btn-outline-danger"
                  @click="addToCart(product.id)">
            加到購物車
          </button>
        </div>
      </div>
    </div>
    <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
  </template>

<script>
import SmallSidebar from '@/components/SmallSidebar.vue'
export default {
  data () {
    return {
      product: {},
      status: {
        loadingItem: ''
      },
      id: '',
      carts: []
    }
  },
  components: { // 區域註冊
    SmallSidebar
  },
  methods: {
    getProduct () { // 撈出某一商品id
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        this.isLoading = false
        if (response.data.success) {
          this.product = response.data.product
        }
      })
    },
    getCart () { // 取得購物車列表
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
        console.log('this.carts', this.carts)
      })
    },

    addToCart (id, qty = 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      this.isLoading = true
      this.$http.post(url, { data: cart }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '加入購物車')
        // this.$router.push('/user/cart')
        this.getCart()
      })
    }
  },
  created () {
    this.id = this.$route.params.productId // -Ne8gzmrkTBOmbLnw1PT
    this.getProduct()
    this.getCart()
  }
}
</script>
