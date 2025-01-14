<template>
  <!-- <img
    src=""
    alt=""
    style="width: 100%; height: 300px; background-color: antiquewhite"
  /> -->
  <div class="container userCart">
    <div class="mt-5" v-if="cart.total !== 0">
      <div
        class="shopping_process d-flex justify-content-center align-items-center"
      >
        <span class="text-center mx-3"
          ><i class="bi bi-cart-check fs-3"></i>
          <p>商品確認</p></span
        >
        <span class="process_gray_line"></span>
        <span class="process_gray text-center mx-3"
          ><i class="bi bi-pen fs-3"></i>
          <p>資料填寫</p></span
        >
        <span class="process_gray_line"></span>
        <span class="process_gray text-center mx-3"
          ><i class="bi bi-cash-coin fs-3"></i>
          <p>訂單確認</p></span
        >
        <span class="process_gray_line"></span>
        <span class="process_gray text-center mx-3"
          ><i class="bi bi-cart-check-fill fs-3"></i>
          <p>訂單完成</p></span
        >
      </div>
      <div class="row justify-content-center mt-5">
        <div class="col col-lg-7 me-4">
          <table class="mx-auto table align-middle">
            <thead>
              <tr class="text-center">
                <th>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItemAll()"
                  >
                  <i class="bi bi-x-lg"></i>
                  </button>
                </th>
                <th></th>
                <th class="text-start" style="width: 250px">商品</th>
                <th>數量</th>
                <th>單價</th>
                <th>總價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart.carts" :key="item.id">
                <td class="text-center">
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    :disabled="status.loadingItem === item.id"
                    @click="removeCartItem(item.id)"
                  >
                  <i class="bi bi-x-lg"></i>
                  </button>
                </td>
                <!-- <td class="text-center"><router-link to="/products/${item..product.id}">{{ item.product.title }}</router-link></td> -->
                <td style="width: 70px">
                  <div style="width: 70px; height: 100px">
                    <img
                      :src="item.product.imageUrl"
                      alt=""
                      class="w-100 h-100 object-fit-cover"
                    />
                  </div>
                </td>
                <td class="align-top">
                  <a
                    class="productName text-decoration-none text-dark"
                    @click="getProductPage(item.product.id)"
                    >{{ item.product.title }}</a
                  >
                </td>
                <td style="width: 150px">
                  <div class="input-group">
                    <button
                      class="btn border-0"
                      type="button"
                      @click="changeQty(-1, item)"
                      :disabled="item.qty === 1"
                    >
                      <i class="bi bi-dash-lg"></i>
                    </button>
                    <input
                      type="number"
                      class="form-control text-center noline"
                      @change="updateCart(item)"
                      v-model.number="item.qty"
                      min="1"
                      readonly
                    />
                    <button
                      class="btn border-0"
                      type="button"
                      @click="changeQty(1, item)"
                    >
                      <i class="bi bi-plus-lg"></i>
                    </button>
                  </div>
                </td>
                <td class="text-center">${{ item.product.price }}</td>
                <td class="text-center">${{ item.total }}</td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex justify-content-end">
            <router-link
              to="/productsall"
              type="button"
              class="mt-3 py-2 btnHover"
            >
              <div>
                <span>繼續選購</span>
                <span>繼續選購</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="col col-lg-4">
          <div class="border px-3 pb-3 stickyTop">
            <div class="d-flex justify-content-between align-items-center my-3">
              <p class="mb-0">商品總價</p>
              <p class="fs-5 mb-0">
                NT${{ $filters.currency(Math.round(cart.total)) }}
              </p>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div class="input-group mb-3 w-100">
                <input
                  type="text"
                  class="form-control noline"
                  placeholder="請輸入優惠碼"
                  v-model="coupon_code"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  class="btn btn-outline"
                  type="button"
                  id="button-addon2"
                  @click="addCouponCode"
                >
                  套用優惠碼
                </button>
              </div>
              <!-- <div>
              <input
                type="text"
                class="coupon_form me-3"
                v-model="coupon_code"
                placeholder="請輸入優惠碼"
              /></div>
            <button class="btn" type="button" @click="addCouponCode">
              <div>
                <span>套用優惠碼</span>
                <span>套用優惠碼</span>
              </div>
            </button> -->
            </div>
            <hr />
            <div
              class="d-flex justify-content-between align-items-center"
            >
              <p class="mb-0">總金額</p>
              <p class="mb-0 fs-3 text-success">
                  NT${{ $filters.currency(Math.round(cart.final_total)) }}
              </p>
            </div>
            <div v-if="cart.final_total !== cart.total">
              <!-- <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0">總金額</p>
                <p class="mb-0 fs-3 text-success">
                  NT$
                  {{ $filters.currency(Math.round(cart.final_total)) }}
                </p>
              </div> -->
              <p class="mb-0 text-end text-danger">(已套用優惠券)</p>
            </div>
            <!-- // cart.final_total 是整個購物車的總金額(折扣後) -->
            <div>
              <router-link
                to="/order"
                type="button"
                class="mt-3 py-2 btnHover w-100"
              >
                <div>
                  <span>下一步</span>
                  <span>下一步</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 150px; margin-bottom: 250px">
      <div class="text-center my-5">
        <p class="fs-4 ls">您的購物車目前是空的唷！</p>
        <router-link
          to="/productsall"
          type="button"
          class="btnHover btn-lg rounded-0 mt-3"
        >
          <div>
            <span>去逛逛商店 <i class="bi bi-arrow-right" /></span>
            <span>去逛逛商店 <i class="bi bi-arrow-right" /></span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
</template>
<script>
export default {
  data () {
    return {
      cart: {},
      // carts: [],
      coupon_code: '',
      // shipping: 250,
      status: {
        loadingItem: '' // 對應品項 id
      },
      productsQty: ''
    }
  },
  methods: {
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log('getCart', response)
        this.cart = response.data.data
        this.carts = response.data.data.carts
        // this.productsQty = response.data.data.carts.item.qty
        // this.isLoading = false
        // console.log('this.cart', this.cart)
        console.log('this.carts', this.carts)
        // console.log('this.productsQty', response.data.data.carts.item.qty)
      })
      console.log(typeof this.shipping)
    },

    // 更新購物車
    updateCart (item) {
      // 更新購物車
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${item.id}`
      // this.isLoading = true
      // this.status.loadingItem = item.id // 用於disabled狀態
      const cart = {
        product_id: item.product_id,
        qty: item.qty
      }
      this.$http.put(url, { data: cart }).then((res) => {
        console.log('updateCart', res)
        // this.status.loadingItem = ''
        this.getCart()
      })
    },

    // 加減按鈕
    changeQty (number, item) {
      item.qty += number
      this.updateCart(item)
    },

    // 套用優惠券
    addCouponCode () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/coupon` // 有包含計算公式，而計算公式是後端才會做的事，前端只需跟後端說設定打幾折
      const coupon = {
        code: this.coupon_code
      }
      // this.isLoading = true
      this.$http.post(url, { data: coupon }).then((response) => {
        // 透過 "套用優惠券" API 告知後端要套用優惠卷，後端會驗證這個優惠卷是否有效，有效就會做個記錄
        this.$httpMessageState(response, '加入優惠券')
        this.getCart()
        // this.isLoading = false
        console.log('addCouponCode', response)
      })
    },

    // 移除購物車中的商品
    removeCartItem (id) {
      this.status.loadingItem = id // 用於禁用按鈕
      // this.isLoading = true // 開啟讀取效果
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = '' // 解除禁用按鈕
        this.getCart()
        // this.isLoading = false // 關閉讀取效果
        console.log('removeCartItem', response)
      })
    },

    removeCartItemAll () {
      // this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除所有購物車品項')
        this.getCart()
        // this.isLoading = false
      })
    },

    getProductPage (id) {
      // 取得某一商品id，並導到該商品獨立頁面
      this.$router.push(`/products/${id}`)
    }
  },

  created () {
    this.getCart()
  }
}
</script>

<!-- $filters.currency() 千分字號
     Math.round() 四捨五入 -->

<!-- :disabled="this.status.loadingItem === item.id"
為避免用戶不知道自己已經加入了，但一直重複點擊按鈕，所以按鈕加入disabled狀態，無法再點擊，用意讓用戶知道已經點擊加入了
當this.status.loadingItem（addCart函式裡的id） 等於 item.id（點擊時的id） 時，進入disabled跟讀取效果狀態 -->

<!-- class="cartName text-decoration-none text-dark" -->
