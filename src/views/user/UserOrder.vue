<template>
  <div class="container mainContainer userOrder">
    <div class="pt-3 process d-flex justify-content-center align-items-center">
      <div class="text-center mx-3">
        <i class="bi bi-cart-check fs-3"></i>
        <div class="row row-cols-1 row-cols-lg-2">
          <div class="col px-0"><p class="mb-0">商品</p></div>
          <div class="col px-0"><p class="mb-0">確認</p></div>
        </div>
      </div>
      <span class="process_dark_line"></span>
      <div class="process_dark text-center mx-3">
        <i class="bi bi-pen fs-3"></i>
        <div class="row row-cols-1 row-cols-lg-2">
          <div class="col px-0"><p class="mb-0">資料</p></div>
          <div class="col px-0"><p class="mb-0">填寫</p></div>
        </div>
      </div>
      <div class="process_gray_line"></div>
      <div class="process_gray text-center mx-3">
        <i class="bi bi-cash-coin fs-3"></i>
        <div class="row row-cols-1 row-cols-lg-2">
          <div class="col px-0"><p class="mb-0">資料</p></div>
          <div class="col px-0"><p class="mb-0">確認</p></div>
        </div>
      </div>
      <div class="process_gray_line"></div>
      <div class="process_gray text-center mx-3">
        <i class="bi bi-cart-check-fill fs-3"></i>
        <div class="row row-cols-1 row-cols-lg-2">
          <div class="col px-0"><p class="mb-0">訂單</p></div>
          <div class="col px-0"><p class="mb-0">完成</p></div>
        </div>
      </div>
    </div>
    <div class="my-lg-5 row justify-content-center">
      <div class="col col-lg-6 me-4 d-none d-lg-block">
        <table class="mx-auto table align-middle">
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
            <tr v-for="item in cart.carts" :key="item.id">
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
              <td></td>
              <td colspan="3">
                <div style="padding-right: 5px">
                  <p class="mb-0 text-end">
                    商品總價&nbsp;&nbsp;&nbsp;&nbsp;NT$
                    {{ $filters.currency(Math.round(cart.total)) }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="2"></td>
              <td colspan="3">
                <div style="padding-right: 5px">
                  <p class="mb-0 text-end">
                    總金額&emsp;
                    <span class="fs-3 text-success">
                      NT$
                      {{
                        $filters.currency(Math.round(cart.final_total))
                      }}</span
                    >
                  </p>
                </div>
                <div
                  v-if="cart.final_total !== cart.total"
                  style="padding-right: 5px"
                >
                  <p class="mb-0 text-end text-danger">(已套用優惠券)</p>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
        <div class="d-flex justify-content-end">
          <router-link
            to="/productsall"
            type="button"
            class="mt-3 py-2 me-3 btnHover d-block"
          >
            <div>
              <span>繼續選購</span>
              <span>繼續選購</span>
            </div>
          </router-link>
          <button class="mt-3 py-2 btnHover" @click="backToPage()">
            <div>
              <span>返回購物車</span>
              <span>返回購物車</span>
            </div>
          </button>
        </div>
      </div>
      <div class="col-lg-4 d-none d-lg-block">
        <Form class="border p-3" v-slot="{ errors }" @submit="createOrder">
          <h2 class="text-center">顧客資訊</h2>
          <div class="mb-3">
            <label for="name" class="form-label"
              >姓名<span class="text-danger">*</span></label
            >
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
            <ErrorMessage name="姓名" class="invalid-feedback" />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label"
              >手機號碼<span class="text-danger">*</span></label
            >
            <Field
              id="tel"
              name="手機號碼"
              type="tel"
              class="form-control"
              :class="{ 'is-invalid': errors['手機號碼'] }"
              placeholder="請輸入手機號碼"
              :rules="isPhoneNumber"
              v-model="form.user.tel"
            ></Field>
            <ErrorMessage
              name="手機號碼"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"
              >Email<span class="text-danger">*</span></label
            >
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
            <label for="address" class="form-label"
              >地址<span class="text-danger">*</span></label
            >
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
          <button class="mt-3 py-2 btnHover btnHover5 w-100" @click="push">
            <div>
              <span>送出訂單</span>
              <span>送出訂單</span>
            </div>
          </button>
        </Form>
      </div>
    </div>
    <div class="d-lg-none mt-3">
      <Form class="p-2" v-slot="{ errors }" @submit="createOrder">
        <h2 class="text-center">顧客資訊</h2>
        <div class="mb-3">
          <label for="name" class="form-label ms-1"
            >姓名<span class="text-danger">*</span></label
          >
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
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label ms-1"
            >手機號碼<span class="text-danger">*</span></label
          >
          <Field
            id="tel"
            name="手機號碼"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['手機號碼'] }"
            placeholder="請輸入手機號碼"
            :rules="isPhoneNumber"
            v-model="form.user.tel"
          ></Field>
          <ErrorMessage name="手機號碼" class="invalid-feedback"></ErrorMessage>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label ms-1"
            >Email<span class="text-danger">*</span></label
          >
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
          <label for="address" class="form-label ms-1"
            >地址<span class="text-danger">*</span></label
          >
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
          <label for="message" class="form-label ms-1">留言</label>
          <textarea
            name=""
            id="message"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <button class="mt-3 py-2 btnHover btnHover5 w-100" @click="push">
          <div>
            <span>送出訂單</span>
            <span>送出訂單</span>
          </div>
        </button>
      </Form>
    </div>
    <div class="d-lg-none mt-3 gx-0 m-1">
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
              <div class="accordion-body"></div>
              <table class="table">
                <tbody>
                  <tr
                    v-for="item in cart.carts"
                    :key="item.id"
                    class="border-top border-bottom"
                  >
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
                      <div class="d-flex mt-3 justify-content-between">
                        <div>
                          <a
                            class="productName text-decoration-none text-dark"
                            @click="getProductPage(item.product.id)"
                            >{{ item.product.title }}</a
                          >
                        </div>
                        <div class="me-2">
                          <p class="mb-0 mb-3">數量：{{ item.qty }}</p>
                          <p class="mb-0">總價：${{ item.total }}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td>
                      <div class="me-2">
                        <p class="mb-0 text-end">
                          商品總價&nbsp;&nbsp;&nbsp;&nbsp;NT$
                          {{ $filters.currency(Math.round(cart.total)) }}
                        </p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>
                      <div class="me-2">
                        <p class="mb-0 text-end">
                          總金額&emsp;
                          <span class="fs-3 text-success">
                            NT$
                            {{
                              $filters.currency(Math.round(cart.final_total))
                            }}</span
                          >
                        </p>
                      </div>
                      <div
                        v-if="cart.final_total !== cart.total"
                        style="padding-right: 5px"
                      >
                        <!-- <p class="mb-0 text-end">
                    總金額&emsp;
                    <span class="fs-3 text-success">
                      NT$
                      {{
                        $filters.currency(Math.round(cart.final_total))
                      }}</span
                    >
                    <br />
                    <span class="text-end text-danger">(已套用優惠券)</span>
                  </p> -->
                        <p class="mb-0 text-end text-danger">(已套用優惠券)</p>
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div class="row px-2 gx-2 mb-2">
                <div class="col">
                  <router-link
                    to="/productsall"
                    type="button"
                    class="mt-3 py-2 btnHover w-100 d-block"
                  >
                    <div>
                      <span>繼續選購</span>
                      <span>繼續選購</span>
                    </div>
                  </router-link>
                </div>
                <div class="col">
                  <button
                    class="mt-3 py-2 btnHover w-100"
                    @click="backToPage()"
                  >
                    <div>
                      <span>返回購物車</span>
                      <span>返回購物車</span>
                    </div>
                  </button>
                </div>
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
  data() {
    return {
      cart: {},
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
      carts: [],
    };
  },
  inject: ["emitter"],
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((response) => {
          this.cart = response.data.data;
          this.carts = response.data.data.carts;
          this.emitter.emit("update-cart", this.carts);
        })
        .catch((error) => {
          this.$httpMessageState(error, "連線錯誤");
        });
    },
    createOrder() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order`;
      const order = this.form;
      this.$http
        .post(url, { data: order })
        .then((res) => {
          if (res.data.success) {
            const id = res.data.orderId;
            this.$router.push(`/pay/${id}`);
            this.$httpMessageState(res, "建立訂單");
            this.getCart();
          }
        })
        .catch((error) => {
          this.$httpMessageState(error, "連線錯誤");
        });
    },
    isPhoneNumber(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "手機號碼 為必填";
    },
    backToPage() {
      this.$router.go(-1);
    },
    getProductPage(id) {
      this.$router.push(`/products/${id}`);
    },
  },

  created() {
    this.getCart();
  },
};
</script>
