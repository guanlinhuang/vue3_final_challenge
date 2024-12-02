<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row justify-content-center" v-if="cart.total !== 0">
      <div class="col-7">
        <table class="mx-auto table align-middle">
          <thead>
            <tr>
              <th style="width: 48px"><button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItemAll()"
                >
                  <i class="bi bi-trash3"></i>
                </button></th>
              <th class="text-center" style="width: 150px">品名</th>
              <th style="width: 150px">數量</th>
              <th>單價</th>
              <th>總價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </td>
              <td class="text-center">{{ item.product.title }}</td>
              <td>
                <div class="input-group input-group-sm">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    @change="updateCart(item)"
                    v-model.number="item.qty"
                  />
                  <div class="input-group-text border-0 bg-transparent">
                    / {{ item.product.unit }}
                  </div>
                </div>
              </td>
              <td class="text-end">{{ item.product.price }}</td>
              <td class="text-end">{{ item.total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td colspan="2">
                <div class="input-group mb-3 input-group-sm">
                  <input
                    type="text"
                    class="form-control"
                    v-model="coupon_code"
                    placeholder="請輸入優惠碼"
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="button"
                      @click="addCouponCode"
                    >
                      套用優惠碼
                    </button>
                  </div>
                </div>
              </td>
              <td class="text-end">商品總價</td>
              <td v-if="cart.final_total == cart.total">
                <p class="fs-3 mb-0 text-end">
                  NT$ {{ $filters.currency(Math.round(cart.total)) }}
                </p>
              </td>
              <td v-else>
                <p class="mb-0 text-end">
                  <span class="text-end text-danger">(已套用優惠券)</span> NT$
                  {{ $filters.currency(Math.round(cart.final_total)) }}
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="3" class="text-center"></td>
              <td class="text-end">運費</td>
              <td class="text-end">{{ $data.shipping}}</td>
            </tr>
            <tr>
              <td colspan="4" class="text-end">總金額</td>
              <td>
                <p class="fs-3 mb-0 text-end text-success">
                  NT$
                  {{
                    $filters.currency(
                      Math.round(cart.final_total + $data.shipping)
                    )
                  }}
                </p>
              </td>
            </tr>
            <tr>
              <td colspan="5" class="text-center text-success">
                <router-link
                  to="/order"
                  type="button"
                  class="btn btn-outline-primary w-100 mt-3 py-2"
                >
                  下一步
                </router-link>
              </td>
            </tr>
            <!-- // cart.final_total 是整個購物車的總金額(折扣後) -->
          </tfoot>
        </table>
      </div>
    </div>
    <div v-else>
      <p class="fs-4 ls">您的購物車目前是空的唷！</p>
      <router-link
        to="/products"
        type="button"
        class="btn btn-outline-primary btn-lg rounded-0 mt-3"
      >
        去逛逛商店 <i class="bi bi-arrow-right" />
      </router-link>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
</template>
<script>
import SmallSidebar from '@/components/SmallSidebar.vue'
export default {
  data () {
    return {
      cart: {},
      // carts: [],
      coupon_code: '',
      shipping: 250,
      status: {
        loadingItem: '' // 對應品項 id
      }
    }
  },
  components: { // 區域註冊
    SmallSidebar
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
        // this.isLoading = false
        // console.log('this.cart', this.cart)
        console.log('this.carts', this.carts)
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
      this.isLoading = true // 開啟讀取效果
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除購物車品項')
        this.status.loadingItem = '' // 解除禁用按鈕
        this.getCart()
        this.isLoading = false // 關閉讀取效果
        console.log('removeCartItem', response)
      })
    },

    removeCartItemAll () {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/carts`
      this.$http.delete(url).then((response) => {
        this.$httpMessageState(response, '移除所有購物車品項')
        this.getCart()
        this.isLoading = false
      })
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
