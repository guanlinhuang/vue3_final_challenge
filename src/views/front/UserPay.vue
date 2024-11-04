<template>
  <Loading :active="isLoading"></Loading>
  <div v-if="!order.is_paid" class="row justify-content-center">購物流程圖</div>
  <div v-else class="row justify-content-center">感謝您的訂購</div>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table align-middle">
        <thead>
          <tr>
            <th class="text-center" style="width: 150px">品名</th>
            <th style="width: 150px">數量</th>
            <th>單價</th>
            <th>總價</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td class="text-center">{{ item.product.title }}</td>
            <td>{{ item.qty }} {{ item.product.unit }}</td>
            <td class="text-end">
              {{ $filters.currency(Math.round(item.product.price)) }}
            </td>
            <td class="text-end">
              {{ $filters.currency(Math.round(item.total)) }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">商品總價</td>
            <td class="text-end">
              NT$ {{ $filters.currency(Math.round(order.total)) }}
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-end">運費</td>
            <td class="text-end">{{ $data.shipping }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end">總金額</td>
            <td>
              <p class="fs-3 mb-0 text-end text-success">
                NT$
                {{
                  $filters.currency(Math.round(order.total + $data.shipping))
                }}
              </p>
            </td>
          </tr>
        </tfoot>
      </table>

      <table class="table">
        <tbody>
          <tr>
            <th width="150">訂單編號</th>
            <td>{{ order.id }}</td>
          </tr>
          <tr>
            <th>收件人姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人手機號碼</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
            <!-- 因為要顯示文字-尚未付款，必須是true，所以要加上！，負負得正，!is_paid=true -->
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
        <!-- is_paid 從false轉為true，即付款成功，則不符合等於false條件，將不顯示「確認付款去」按鈕 -->
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      shipping: 250,
      orderId: '',
      isLoading: false
    }
  },
  methods: {
    getOrder () {
      // 需把某一訂單內容帶出來，才能渲染頁面，否則欄位會是空白
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.order = res.data.order
          console.log(this.order)
        }
      })
    },
    payOrder () {
      // 按下「確認付款去」按鈕，付款狀態欄位會變化，is_paid 從false轉為true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(url).then((res) => {
        console.log(res)
        if (res.data.success) {
          this.getOrder()
        }
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId // 第一步驟：先取得網址id
    console.log(this.orderId)
    this.getOrder()
  }
}
</script>
