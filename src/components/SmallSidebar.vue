<template>
  <div class="follow_us fs-3 d-flex flex-column align-items-center">
    <div class="followBtn">
      <a href="#" class="p-2 ms-1 text-white d-block"
        ><i class="bi bi-facebook"></i
      ></a>
    </div>
    <div class="followBtn">
      <a href="#" class="p-2 ms-1 text-white d-block"
        ><i class="bi bi-instagram"></i
      ></a>
    </div>
    <div class="followBtn">
      <a href="#" class="p-2 ms-1 text-white d-block"
        ><i class="bi bi-line"></i
      ></a>
    </div>
    <div class="followBtn">
      <router-link
        to="/cart"
        class="nav-link text-white p-2 ms-1 position-relative"
        ><i class="bi bi-cart3"></i
        ><span
          class="position-absolute start-0 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 10px"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <!-- <a href="#" @click.prevent="logout" class="nav-link">登出</a> -->
    <div class="followBtn">
      <router-link to="#" class="nav-link text-white p-2 ms-1 position-relative"
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
      })
      return total
    }
  },
  // Cannot read properties of undefined (reading 'forEach')
  // TypeError: Cannot read properties of undefined (reading 'forEach')
  // 因為呼叫 forEach 來取得未定義的值，所以第一行需要加分號「;」（應該是吧)
  // 但關掉讀取錯誤視窗，仍可以正常運作，重新整理仍會出現報錯

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
    this.carts = this.cartss
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
