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
              class="btnHover btn btn-outline-dark"
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // signIn () {
    //   console.log('login')
    //   // 串接api之前，先把路徑組起來，加入環境變數
    //   const api = `${process.env.VUE_APP_API}admin/signin` // api路經 // env環境變數站點的位置＋登入的實際API
    //   this.$http.post(api, this.user) // 使用this.$http來取得他的方法 //（api路經 , 夾帶的資料）
    //     .then((res) => { // 串接
    //       const { token, expired } = res.data // 先建立變數跟值
    //       console.log(token, expired)
    //       document.cookie = `hexToken=${token};expires=${new Date(expired)}` // hexToken名稱自定義 // new Date 可轉換為日期
    //       console.log(res)
    //     })
    // },
    signIn () {
      const api = `${process.env.VUE_APP_API}admin/signin` // 登入頁面api
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          const { token, expired } = res.data // 建立變數跟值
          // console.log(token, expired)
          document.cookie = `hexToken=${token};expires=${new Date(expired)}` // hexToken、expires名稱自定義，new Date可把毫秒轉換為日期
          this.$router.push('/dashboard/products') // 登入成功後，跳轉到指定頁面
          // console.log(res.data)
        }
      })
    }
  }
}
</script>

// <!-- 務必先安裝好axios套件，並將下載好的套件加入在main.js -->
// <span class="border border-dark">&ensp;kuanlin830410@gmail.com&ensp;</span>
// <span class="border border-dark">&ensp;test12345&ensp;</span>
