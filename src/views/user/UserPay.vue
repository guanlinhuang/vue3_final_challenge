<template>
  <div class="container mainContainer userPay">
    <div v-if="!order.is_paid" class="row justify-content-center pt-3">
      <div class="process d-flex justify-content-center align-items-center">
        <span class="text-center mx-3"
          ><i class="bi bi-cart-check fs-3"></i>
          <p>商品確認</p></span
        >
        <span class="process_dark_line"></span>
        <span class="process_dark text-center mx-3"
          ><i class="bi bi-pen fs-3"></i>
          <p>資料填寫</p></span
        >
        <span class="process_dark_line"></span>
        <span class="process_dark text-center mx-3"
          ><i class="bi bi-cash-coin fs-3"></i>
          <p>訂單確認</p></span
        >
        <span class="process_gray_line"></span>
        <span class="process_gray text-center mx-3"
          ><i class="bi bi-cart-check-fill fs-3"></i>
          <p>訂單完成</p></span
        >
      </div>
    </div>
    <div v-else class="row justify-content-center pt-3">
      <div class="process d-flex justify-content-center align-items-center">
        <span class="text-center mx-3"
          ><i class="bi bi-cart-check fs-3"></i>
          <p>商品確認</p></span
        >
        <span class="process_dark_line"></span>
        <span class="process_dark text-center mx-3"
          ><i class="bi bi-pen fs-3"></i>
          <p>資料填寫</p></span
        >
        <span class="process_dark_line"></span>
        <span class="process_dark text-center mx-3"
          ><i class="bi bi-cash-coin fs-3"></i>
          <p>訂單確認</p></span
        >
        <span class="process_dark_line"></span>
        <span class="process_dark text-center mx-3"
          ><i class="bi bi-cart-check-fill fs-3"></i>
          <p>訂單完成</p></span
        >
      </div>
      <h5 class="text-center my-5">感謝您的訂購</h5>
    </div>
    <div class="mt-3 mt-lg-5 row justify-content-center">
      <div class="col col-lg-7">
        <form class="border m-1 m-lg-0 p-2 p-lg-3" @submit.prevent="payOrder">
          <h2 class="text-center mt-3 mb-5">訂單資訊</h2>
          <table class="table">
            <tbody>
              <tr>
                <th>訂單編號</th>
                <td>{{ order.id }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>手機號碼</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>留言</th>
                <td v-if="order.message">{{ order.message }}</td>
                <td v-else>無</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid" class="text-danger"
                    >尚未付款</span
                  >
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="order.is_paid === false" class="row gx-2">
            <div class="col-4">
              <router-link
                to="/"
                type="button"
                class="btnHover w-100 d-block" style="min-width: 0px;"
              >
                <div>
                  <span>延後付款</span>
                  <span>延後付款</span>
                </div>
              </router-link>
            </div>
            <div class="col-8">
              <button class="btnHover btnHover5 w-100" type="submit">
                <div>
                  <span>立即付款</span>
                  <span>立即付款</span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-2 mb-5 row justify-content-center gx-0 m-1">
      <div class="col col-lg-7">
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                商品明細
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-body">
                <table class="table align-middle">
                  <thead>
                    <tr class="text-center">
                      <th></th>
                      <th class="text-start">商品</th>
                      <th>數量</th>
                      <th>單價</th>
                      <th>總價</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                      <td style="width: 70px">
                        <div style="width: 70px; height: 100px">
                          <img
                            :src="item.product.imageUrl"
                            :alt="item.product.title"
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
                      <td class="text-center">{{ item.qty }}</td>
                      <td class="text-center">${{ item.product.price }}</td>
                      <td class="text-center">${{ item.total }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td colspan="4" class="text-end">
                        <p class="mb-0 text-end" style="padding-right: 10px">
                          總金額
                          <span class="fs-3 text-success">
                            NT$
                            {{
                              $filters.currency(Math.round(order.total))
                            }}</span
                          >
                        </p>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      order: {
        user: {}
      },
      orderId: '',
      isLoading: false,
      carts: []
    }
  },
  methods: {
    getOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${this.orderId}`
      this.$http.get(url).then((res) => {
        if (res.data.success) {
          this.order = res.data.order
        }
      })
    },
    payOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${this.orderId}`
      this.$http.post(url).then((res) => {
        if (res.data.success) {
          this.getOrder()
          this.scrollTop()
        }
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    getProductPage (id) {
      this.$router.push(`/products/${id}`)
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
        this.carts = response.data.data.carts
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
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
