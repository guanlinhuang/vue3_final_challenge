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
      <a href="#" class="text-white d-block position-absolute top-50 start-50 translate-middle"
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
      <router-link to="#" class="nav-link text-white position-relative position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-suit-heart-fill"></i
        ><span
          class="position-absolute start-0 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 10px"
        >
          99
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
          style="font-size: 13px; top: 10px"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <div class="addFavorite mb-2 me-2 position-relative rounded-circle">
      <router-link to="#" class="nav-link text-white position-relative position-absolute top-50 start-50 translate-middle"
        ><i class="bi bi-suit-heart-fill"></i
        ><span
          class="position-absolute start-0 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 10px"
        >
          99
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
export default {
  // props: { // 設定內層所接收的props
  //   cartss: {
  //     type: Array, // 預期傳進來的型別是陣列，所以先定義類型為物件Object
  //     default () {
  //       return [] // 如外層沒有正確傳遞，給它一個預設值-空的物件
  //     }
  //   }
  // },
  props: ['cartss'],
  watch: {
    cartss () {
      this.carts = this.cartss
    }
  },
  data () {
    return {
      carts: []
    }
  },
  // methods: {
  //   // 取得購物車列表
  //   getCart () {
  //     const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
  //     // this.isLoading = true
  //     this.$http.get(url).then((response) => {
  //       // console.log('getCart', response)
  //       // this.carts = response.data.data.carts
  //       // this.cartLength = response.data.data.carts.length
  //       // // this.isLoading = false
  //       // console.log('this.cart', this.cartLength)
  //       this.carts = response.data.data.carts
  //       console.log('SmallSidebar', this.carts)
  //     })
  //   }
  // },
  // computed: {
  //   cartsNum () {
  //     let cartNum = 0
  //     this.carts.forEach(item => {
  //       cartNum += item.qty
  //     })
  //     return cartNum
  //   }
  // },
  computed: {
    totalQty () { // 購物車內商品總數
      let total = 0
      this.carts.forEach(item => {
        total += item.qty
        console.log('SmallSidebar', this.carts)
      })
      return total
    }
  },

  // watch: {
  //   carts: {
  //     hander (n, o) {
  //       let cartNum = 0
  //       this.carts.forEach(function (e) {
  //         cartNum += e.qty
  //       })
  //       return cartNum
  //     },
  //     immediate: true
  //   }

  // },
  mounted () {
    // this.carts = this.cartss // 使用這段code會報錯 // TypeError: Cannot read properties of undefined (reading 'forEach')
    this.carts = Array.isArray(this.cartss) ? this.cartss : [] // this.carts 需要確保是一個陣列 array 所以才不會出錯
  }
  // created () {
  //   emitter.on('updateCart', () => {
  //     this.getCart()
  //   })
  // emitter.on('update-favorite', () => {
  //   this.favoriteNum = this.getLocalStorage()
  // })
  // },
  // mounted () {
  //   this.getCart()
  //   window.addEventListener('scroll', this.windowScroll)
  // }
}
</script>

<!-- forEach 可把每個item的qty(數量)取出，計算總數量(所有qty總和) -->
<!-- computed cartNum在預設的情況下，沒有定義在data裡，而是直接用Computed來運算出來
this.carts變數有變動就會觸發computed 裡的cartsNum ()函式，接著回傳cartsNum到畫面 -->
<!-- created:在模板渲染成html前調用，即通常初始化某些屬性值，然後再渲染成視圖。
       mounted:在模板渲染成html後調用，通常是初始化頁面完成後，再對html的dom節點進行一些需要的操作。 -->
<!-- Array.isArray() 函式會檢查傳入的值是否為一個 Array -->
