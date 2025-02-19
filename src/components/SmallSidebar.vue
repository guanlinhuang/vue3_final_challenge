<template>
  <div class="Smallsidebar d-none d-lg-block  d-flex flex-column align-items-center">
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a href="#" class="text-white d-block position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-facebook"></i
      ></a>
    </div>
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a href="#" class="text-white d-block position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-instagram"></i
      ></a>
    </div>
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a href="https://line.me/ti/p/OwNL1F9kBd" class="text-white d-block position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-line"></i
      ></a>
    </div>
    <div class="addCart mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/cart"
        class="nav-link text-white position-relative position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-cart3"></i
        ><span v-if="carts.length!==0"
          class="position-absolute start-0 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 10px"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <!-- <a href="#" @click.prevent="logout" class="nav-link">登出</a> -->
    <div class="addFavorite mb-2 me-2 position-relative rounded-circle">
      <router-link to="/favorite" class="nav-link text-white position-relative position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-suit-heart-fill"></i
        ><span v-if="favoriteProduct.length!==0"
          class="position-absolute start-0 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 10px"
        >
          {{ favoriteProduct.length }}
          <span class="visually-hidden">unread messages</span></span
        ></router-link
      >
    </div>
  </div>
  <div class="Smallsidebar d-lg-none">
    <div class="addCart mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/cart"
        class="nav-link text-white position-relative position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-cart3"></i
        ><span v-if="carts.length!==0"
          class="position-absolute start-0 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 10px;z-index: 10;"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <div class="addFavorite mb-2 me-2 position-relative rounded-circle">
      <router-link to="/favorite" class="nav-link text-white position-relative position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-suit-heart-fill"></i
        ><span v-if="favoriteProduct.length!==0"
          class="position-absolute start-0 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 10px"
        >
        {{ favoriteProduct.length }}
          <span class="visually-hidden">unread messages</span></span
        ></router-link
      >
    </div>
  </div>
  <div>

  </div>
</template>

<script>
// import emitter from '@/methods/emitter'
import saveFavorite from '@/methods/saveFavorite'
export default {
  data () {
    return {
      carts: [],
      favorite: saveFavorite.getFavorite() || [],
      favoriteProduct: []
    }
  },
  inject: ['emitter'], // 內層使用inject // 可使用外層元件Userboard.vue的mitt套件功能
  methods: {
    // 取得購物車列表 // 用於重新整理的狀況下 // 若沒加此段code，重新整理後側邊欄標籤無法顯示數量
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
      }).catch((error) => {
        console.error('購物車加載失敗', error)
      })
    },
    getFavoriteProduct () { // 從所有產品清單篩選localstorage裡收藏的產品，並儲存到this.favoriteProduct // 用於重新整理的狀況下 // 若沒加此段code，重新整理後側邊欄標籤無法顯示數量
      this.$http
        .get(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`)
        .then((response) => {
          this.favoriteProduct = response.data.products.filter((product) => this.favorite.includes(product.id))
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    }
  },
  computed: {
    totalQty () { // 購物車內商品總數
      let total = 0
      if (Array.isArray(this.carts)) { // 需要確保this.carts是一個陣列 array 這樣才不會計算出錯
        this.carts.forEach(item => {
          total += item.qty
        })
      }
      return total
    }
  },

  mounted () {
    // this.carts = this.cartss // 使用這段code會報錯 // TypeError: Cannot read properties of undefined (reading 'forEach')
    // this.carts = Array.isArray(this.cartss) ? this.cartss : [] // 需要確保this.carts是一個陣列 array 這樣才不會計算出錯
    // this.getCart()
    this.emitter.on('update-cart', (msg) => {
      this.carts = msg
    })
    this.emitter.on('update-favorite', (msg) => {
      this.favoriteProduct = msg
    })
  },
  created () {
    this.getCart()
    this.getFavoriteProduct()
  }
}
</script>

<!-- forEach 可把每個item的qty(數量)取出，計算總數量(所有qty總和) -->
<!-- computed cartNum在預設的情況下，沒有定義在data裡，而是直接用Computed來運算出來
this.carts變數有變動就會觸發computed 裡的cartsNum ()函式，接著回傳cartsNum到畫面 -->
<!-- created:在模板渲染成html前調用，即通常初始化某些屬性值，然後再渲染成視圖。
       mounted:在模板渲染成html後調用，通常是初始化頁面完成後，再對html的dom節點進行一些需要的操作。 -->
<!-- Array.isArray() 函式會檢查傳入的值是否為一個 Array -->
