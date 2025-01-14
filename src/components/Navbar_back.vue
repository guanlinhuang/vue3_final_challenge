<template>
  <nav class="navbar navbar-expand-lg navbar-color fixed-top">
    <div class="container-fluid">
      <div
        class="collapse navbar-collapse justify-content-center position-relative"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav">
          <router-link
            to="/dashboard/products"
            class="nav-link text-white border-underline"
            >產品列表</router-link
          >
          <router-link
            to="/dashboard/orders"
            class="nav-link text-white border-underline"
            >訂單列表</router-link
          >
          <router-link to="/dashboard/products" class="nav-link text-white mx-4"
            >logo</router-link
          >
          <router-link
            to="/dashboard/coupons"
            class="nav-link text-white border-underline"
            >優惠券列表</router-link
          >
          <router-link to="/" class="nav-link text-white border-underline"
            >用戶端</router-link
          >
        </div>
        <div class="position-absolute end-0 d-flex align-items-center">
          <p class="fs-4 text-danger border border-danger p-1 mb-0 me-3">
            管理員後台
          </p>
          <button
            type="button"
            @click.prevent="logout"
            class="btn btn-outline-light me-5"
          >
            &ensp;登出&ensp;
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      const api = `${process.env.VUE_APP_API}logout`
      this.$http.post(api, this.user).then((res) => {
        if (res.data.success) {
          this.$router.push('/login') // 登出後，跳轉到登入頁面
          // console.log(res)
        }
      })
    }
  }
}
</script>
