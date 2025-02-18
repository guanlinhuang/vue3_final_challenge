<template>
  <div class="bg-cambridge-blue vh-100 pt-5">
    <div class="container">
      <Form
        class="row justify-content-center"
        v-slot="{ errors }"
        @submit="signIn"
      >
        <div class="col-md-4">
          <h1 class="text-center my-5">管理員後台</h1>
          <div class="mb-3 mx-4 mx-sm-0">
            <label for="email" class="form-label">Email:&ensp;</label>
            <Field
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              placeholder="請輸入 Email"
              rules="email|required"
              v-model="user.username"
            ></Field>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>
          <div class="mb-3 mx-4 mx-sm-0">
            <label for="password" class="form-label">Password:&ensp;</label>
            <Field
              id="password"
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors['password'] }"
              placeholder="請輸入 Password"
              rules="required"
              v-model="user.password"
            ></Field>
            <ErrorMessage
              name="password"
              class="invalid-feedback"
            ></ErrorMessage>
          </div>
          <div class="text-center mt-4">
            <button
              class="btnHover btnHover6 btn btn-outline-dark"
              type="submit"
              @click="push"
            >
              <div>
                <span>登入 </span>
                <span>登入</span>
              </div>
            </button>
          </div>
        </div>
      </Form>
    </div>
    <ToastMessages></ToastMessages>
  </div>
</template>

<script>
import emitter from '@/methods/emitter' // mitt跨元件資料傳遞 // 在Dashboard.vue中僅需載入一次mitt，可讓所有元件都可以使用到mitt功能
import ToastMessages from '@/components/ToastMessages.vue' // 吐司訊息
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    ToastMessages
  },
  provide () { // 本外層元件加入provide // 可讓內層元件(加入inject)可以使用本外層元件的mitt套件功能
    return {
      emitter
    }
  },
  methods: {
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin` // 登入頁面api
      this.$http
        .post(api, this.user)
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data // 建立變數跟值
            document.cookie = `hexToken=${token};expires=${new Date(expired)}` // hexToken、expires名稱自定義 // token: 驗證碼 // new Date可把毫秒轉換為有效日期，過了這個日期驗證碼就會失效
            this.$httpMessageState(res, '登入')
            this.$router.push('/dashboard/products') // 登入成功後，跳轉到指定頁面
          } else {
            this.$httpMessageState(res, '登入')
          }
        })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    }
  }
}
</script>

// <!-- 務必先安裝好axios套件，並將下載好的套件加入在main.js -->
// <span class="border border-dark">&ensp;kuanlin830410@gmail.com&ensp;</span>
// <span class="border border-dark">&ensp;test12345&ensp;</span>
