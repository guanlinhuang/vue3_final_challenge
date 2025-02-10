<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <div class="container py-5 mx-auto">
    <h3 class="text-center">訂單列表</h3>
    <table class="table mt-5">
      <thead>
        <tr>
          <th></th>
          <th>建立日期</th>
          <th>訂單編號</th>
          <th>商品明細</th>
          <th class="text-center">金額</th>
          <th class="text-center">付款狀態</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, key) in orders" :key="key">
          <tr>
            <td class="text-center align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelOrderModal(item)"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </td>
            <td>{{ $filters.date(item.create_at) }}</td>
            <td>{{ item.id }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} - {{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-center">${{ $filters.currency(Math.round(item.total)) }}</td>
            <td>
              <div class="form-check form-switch">
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid" class="text-success">付款完成</span>
                  <span v-else class="text-danger">尚未付款</span>
                </label>
                <br />
                <input
                  class="form-check-input mx-auto"
                  type="checkbox"
                  :id="`paidSwitch${item.id}`"
                  v-model="item.is_paid"
                  @change="updatePaid(item)"
                />
              </div>
            </td>
            <td class="align-middle">
              <div class="btn-group">
                <button
                  class="btn btn-outline-success btn-sm"
                  @click="openModal(false, item)"
                >
                  檢視
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <OrderModal
      :order="tempOrder"
      ref="orderModal"
      @update-paid="updatePaid"
    ></OrderModal>
    <DelModal :item="tempOrder" ref="delModal" @del-item="delOrder"></DelModal>
    <Pagination :pages="pagination" @emit-pages="getOrders"></Pagination>
  </div>
</template>

<script>
import DelModal from '@/components/DelModal.vue'
import OrderModal from '@/components/OrderModal.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      orders: [], // 所有訂單列表
      isNew: false, // 判斷是否"新增"或"修改"狀態 // 一般來說，通常會將預設值設為 0、""、false、{}、[]，雖然在這個地方設 true 不影響
      pagination: {}, // 每個產品資料(分頁資訊)
      isLoading: false, // 讀取狀態 // 預設還沒進入讀取狀態
      tempOrder: {}, // 單一訂單資料
      currentPage: 1 // 預設第一頁,
    }
  },
  components: {
    Pagination,
    DelModal,
    OrderModal
  },
  methods: {
    getOrders (currentPage = 1) {
      this.currentPage = currentPage
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}` // 取得訂單列表API
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders
        this.pagination = response.data.pagination
        this.isLoading = false
        // console.log('this.orders', this.orders)
      })
    },
    openModal (isNew, item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
      // console.log('this.tempOrder', this.tempOrder)
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}` // 修改訂單API
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '更新付款狀態')
        this.getOrders(this.currentPage)
        this.$refs.orderModal.hideModal()
      })
    },
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}` // 刪除訂單API
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        // console.log(response)
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getOrders(this.currentPage)
      })
    }
  },
  created () {
    this.getOrders()
    // console.log(process.env.VUE_APP_API)
  }
}
</script>
