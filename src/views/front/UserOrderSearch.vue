<template>
  <Loading :active="isLoading"></Loading>
  <img
    src=""
    alt=""
    style="width: 100%; height: 300px; background-color: antiquewhite"
  />
  <div class="order_search">
    <div class="container my-5" style="height: 200px;">
      <div class="row">
        <Form
          class="d-flex justify-content-center"
          v-slot="{ errors }"
          @submit="searchOrder"
        >
          <div class="mb-3">
            <label for="orderId" class="form-label">Email：</label>
            <Field
              id="orderId"
              class="form-comtrol"
              name="Email"
              type="text"
              placeholder="請輸入Email"
              v-model="searchEmail"
              :class="{ 'is-invalid': errors['Email'] }"
              rules="email"
            ></Field>
            <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="text-end">
            <button class="btn btn-danger" @click="push">查詢</button>
          </div>
        </Form>
        <div v-if="searchState && filterOrder.length === 0">
          <div>
            <p>查無資料，請重新查詢。</p>
          </div>
        </div>
        <div v-else-if="searchState && filterOrder.length !== 0" class="mb-5">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>建立日期</th>
                <th>訂單編號</th>
                <th>商品項目</th>
                <th>金額</th>
                <th>付款狀態</th>
                <th></th>
              </tr>
            </thead>
            <tbody
              v-for="item in filterOrder"
              :key="item.id"
              class="searchTbody"
            >
              <tr class="align-middle">
                <td class="fw-bolder">
                  {{ $filters.date(item.create_at) }}
                </td>
                <td>{{ item.id }}</td>
                <td>
                  <ul class="list-unstyled">
                    <li v-for="product in item.products" :key="product.id">
                      {{ product.product.title }}<br />{{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td>{{ $filters.currency(Math.round(item.total)) }}</td>
                <td>
                  <span v-if="!item.is_paid" class="text-danger">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
                <td>
                  <button
                    v-if="item.is_paid"
                    class="btn btn-outline-success btn-sm"
                    @click.prevent="payOrder(item.id)"
                  >
                    檢視
                  </button>
                  <button
                    v-else
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    @click.prevent="payOrder(item.id)"
                  >
                    檢視、付款
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
      OrderList: [],
      pagination: {},
      searchEmail: '',
      filterOrder: {},
      searchState: false, // 預設v-if不顯示<thead>標題
      isLoading: false,
      email: '',
      carts: []
    }
  },
  components: { // 區域註冊
    SmallSidebar
  },
  //   inject: ['emitter'],
  methods: {
    getOrder (page = 1) {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/orders?page=${page}`
      this.$http.get(api).then((res) => {
        if (res.data.success) {
          this.OrderList = res.data.orders
          this.pagination = res.data.pagination
          console.log(res.data.orders, '222')
        }
      })
    },
    searchOrder () {
      this.isLoading = true
      this.searchState = true
      this.filterOrder = this.OrderList.filter(
        (item) => item.user.email === this.searchEmail
      )
      this.isLoading = false
      this.email = this.searchEmail
      console.log(this.filterOrder, '111')
      this.getOrder()
    },
    payOrder (id) {
      window.open(
        this.$router.resolve({
          path: `/pay/${id}`
        }).href,
        '_blank'
      )
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log('getCart', response)
        this.carts = response.data.data.carts
        console.log('this.carts', this.carts)
      })
    }
  },
  created () {
    console.log('test2')
    this.getOrder()
    this.getCart()
  }
  //   mounted () {
  //     this.emitter.emit('page-change', {
  //       data: 'orderSearch'
  //     })
  //   }
}
</script>

// this.$router.resolve 可開新視窗
// this.$router.push 不會開新視窗
