<template>
  <nav class="navbar navbar-light navbar-expand-lg fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand d-lg-none text-white mx-3" href="#">GuanTony</a>
      <p class="fs-4 text-danger border border-danger p-1 mb-0 d-lg-none">
              管理員後台
            </p>
      <button
        class="navbar-toggler d-lg-none p-0 pe-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <i class="bi bi-filter-right"></i>
      </button>
      <div
        class="offcanvas offcanvas-end justify-content-center"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            id="closeOffcanvas"
          ></button>
        </div>
        <div class="offcanvas-body justify-content-center">
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center">
              <li class="nav-item my-2 my-lg-0">
                <router-link
                  to="/dashboard/products"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >產品列表</router-link
                >
              </li>
              <li class="nav-item my-2 my-lg-0">
                <router-link
                  to="/dashboard/orders"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >訂單列表</router-link
                >
              </li>
              <li class="nav-item d-none d-lg-block">
                <router-link to="/" class="nav-link text-white mx-4"
                  >GuanTony</router-link
                >
              </li>
              <li class="nav-item my-2 my-lg-0">
                <router-link
                  to="/dashboard/coupons"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >優惠券列表</router-link
                >
              </li>
              <li class="nav-item my-2 my-lg-0">
                <router-link
                  to="/"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >用戶端</router-link
                >
              </li>
              <li class="nav-item d-lg-none">
                <router-link
                  to="/storelist"
                  class="nav-link text-white border-underline"
                  @click.prevent="logout"
                  >登出</router-link
                >
              </li>
            </ul>
          </div>
        </div>
        <div
          class="position-absolute end-0 d-flex align-items-center d-none d-lg-block"
        >
          <div class="d-flex">
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
        }
      })
    },
    closeOffcanvas () {
      // 關閉 offcanvas
      document.getElementById('closeOffcanvas').click() // getElementById :選取元素 // 選取close按鈕並觸發點擊事件
    }
  }
}
</script>
