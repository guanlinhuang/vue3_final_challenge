<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <div class="order_search">
    <div class="container py-5">
      <h3 class="text-center">訂單查詢</h3>
      <div class="py-5">
        <Form
          class="d-flex justify-content-center align-items-center"
          @submit="searchOrder"
        >
          <div>
            <Field
              id="orderId"
              class="form-control" style="width: 250px;"
              name="search"
              type="text"
              placeholder="請輸入Email or 電話"
              v-model="search"
            ></Field>
          </div>
          <div style="height: 30px;">
            <button class="btnHover3 ms-3" @click="push">
              <span class="ps-1">查詢</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button></div>
        </Form>
        <div v-if="searchState && filterOrder.length === 0" class="text-center my-5">
          <div>
            <p>查無資料，請重新查詢。</p>
          </div>
        </div>
        <div v-else-if="searchState && filterOrder.length !== 0" class="my-5">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>建立日期</th>
                <th>訂單編號</th>
                <th>商品明細</th>
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
                      {{ product.product.title }} - {{ product.qty }}
                      {{ product.product.unit }}
                    </li>
                  </ul>
                </td>
                <td>${{ $filters.currency(Math.round(item.total)) }}</td>
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
      search: '',
      filterOrder: {},
      searchState: false, // 預設v-if不顯示<thead>標題
      isLoading: false,
      email: '',
      carts: []
    }
  },
  components: {
    // 區域註冊
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
        (item) => item.user.email === this.search || item.user.tel === this.search
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
