<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <div class="container py-5 mx-auto">
    <h3 class="text-center">訂單列表</h3>
    <div class="d-none d-lg-block">
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
        <tbody v-for="(item, key) in orders" :key="key">
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
            <td class="align-middle">{{ $filters.date(item.create_at) }}</td>
            <td class="align-middle">{{ item.id }}</td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} - {{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-center">
              ${{ $filters.currency(Math.round(item.total)) }}
            </td>
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
        </tbody>
      </table>
    </div>
    <div class="d-lg-none">
      <div
        class="mx-2 my-3 px-2 border rounded-3"
        v-for="(item, key) in orders" :key="key"
      >
        <div class="row mt-3">
          <div class="col-3">
            <h6 class="mb-0">建立日期</h6>
            <p class="mb-0">{{ $filters.date(item.create_at) }}</p>
          </div>
          <div class="col-7">
            <h6 class="mb-0">訂單編號</h6>
            <p class="mb-0">{{ item.id }}</p>
          </div>
          <div class="col-2 d-flex justify-content-end align-items-start">
          <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openDelOrderModal(item)"
              >
                <i class="bi bi-x-lg"></i>
              </button></div>
        </div>
        <div class="py-3 border-top border-bottom mt-3">
          <h6 class="mb-0">商品明細</h6>
          <ul class="list-unstyled mb-0">
            <li v-for="product in item.products" :key="product.id">
              - {{ product.product.title }} - {{ product.qty }}
              {{ product.product.unit }}
            </li>
          </ul>
        </div>
        <div class="row mt-3 mb-3">
          <div class="col-5 d-flex align-items-center">
            <h6 class="mb-0">總金額</h6>
            <p class="mb-0 ms-3">
              ${{ $filters.currency(Math.round(item.total)) }}
            </p>
          </div>
          <div class="col-7 d-flex justify-content-end align-items-center">
            <button
              class="btn btn-outline-success btn-sm me-3"
              type="button"
              @click.prevent="openModal(false, item)"
            >
              檢視
            </button>
            <div class="form-check form-switch ps-0">
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
          </div>
        </div>
      </div>
    </div>
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
import Pagination from '@/components/PagePagination.vue'
export default {
  data () {
    return {
      orders: [],
      isNew: false,
      pagination: {},
      isLoading: false,
      tempOrder: {},
      currentPage: 1
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
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/orders?page=${currentPage}`
      this.isLoading = true
      this.$http.get(url, this.tempProduct).then((response) => {
        this.orders = response.data.orders
        this.pagination = response.data.pagination
        this.isLoading = false
        this.scrollTop()
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    openModal (isNew, item) {
      this.tempOrder = { ...item }
      this.isNew = false
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      const delComponent = this.$refs.delModal
      delComponent.showModal()
    },
    updatePaid (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${item.id}`
      const paid = {
        is_paid: item.is_paid
      }
      this.$http.put(api, { data: paid }).then((response) => {
        this.isLoading = false
        this.$httpMessageState(response, '更新付款狀態')
        this.getOrders(this.currentPage)
        this.$refs.orderModal.hideModal()
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    delOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/order/${this.tempOrder.id}`
      this.isLoading = true
      this.$http.delete(url).then((response) => {
        const delComponent = this.$refs.delModal
        delComponent.hideModal()
        this.getOrders(this.currentPage)
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    scrollTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>
