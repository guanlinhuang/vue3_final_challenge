<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7">
        <table class="mx-auto table align-middle">
          <thead>
            <tr>
              <th class="text-center" style="width: 150px">品名</th>
              <th style="width: 150px">數量</th>
              <th>單價</th>
              <th>總價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="text-center">{{ item.product.title }}</td>
              <td>{{ item.qty }} {{ item.product.unit }}</td>
              <td class="text-end">{{ item.product.price }}</td>
              <td class="text-end">{{ item.total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2"></td>
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
              <td colspan="3" class="text-end">運費</td>
              <td class="text-end">{{ $data.shipping }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-end">總金額</td>
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
            <!-- // cart.final_total 是整個購物車的總金額(折扣後) -->
          </tfoot>
        </table>
      </div>
      <Form class="col-5" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <br />
          <Field
            id="name"
            class="form-control"
            type="text"
            name="姓名"
            placeholder="請輸入姓名"
            v-model="form.user.name"
            rules="required"
            :class="{ 'is-invalid': errors['姓名'] }"
          />
          <ErrorMessage name="姓名" class="invalid-feedback"/>
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人手機號碼</label>
          <Field
            id="tel"
            name="手機號碼"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['手機號碼'] }"
            placeholder="請輸入手機號碼"
            :rules=" isPhoneNumber"
            v-model="form.user.tel"
          ></Field>
          <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">收件人Email</label>
          <Field
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          ></Field>

          <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <Field
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          ></Field>
          <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-end">
          <button class="btn btn-danger" @click="push">送出訂單</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cart: {},
      coupon_code: '',
      shipping: 250,
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        console.log('getCart', response)
        this.cart = response.data.data
      })
    },
    createOrder () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`
      const order = this.form
      this.$http.post(url, { data: order })
        .then((res) => {
          if (res.data.success) {
            const id = res.data.orderId
            this.$router.push(`/pay/${id}`) // 導到付款頁面
            // emitter.emit('updateCart')
            this.$httpMessageState(res, '建立訂單')
          }
        })
    },
    isPhoneNumber (value) { // 表單電話號碼驗證
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '手機號碼 為必填'
    }
  },

  created () {
    this.getCart()
  }
}
</script>

// VeeValidate 的驗證規則是以 | 來分隔的，也就是說如果你要使用多個驗證規則的話，就要使用 | 來分隔
// name 為必填，是錯誤驗證的回饋欄位，會與多個項目進行匹配（errors, errors-message…）
// :class 為 Vue 的內建指令
