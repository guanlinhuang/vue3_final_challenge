<template>
  <div class="container-fluid fixed-top">
    <div class="coupon d-flex justify-content-center align-items-center">
      <p class="mb-0">輸入優惠碼 Guan2025，結帳享8折</p>
    </div>
    <nav class="navbar navbar-light navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand d-lg-none text-white mx-3" href="#">GuanTony</a>
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
                  to="/aboutus"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >關於我們</router-link
                >
              </li>
              <li class="nav-item my-2 my-lg-0">
                <router-link
                  to="/productsall"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >所有商品</router-link
                >
              </li>
              <li class="nav-item d-none d-lg-block">
                <router-link to="/" class="nav-link text-white mx-4"
                  >GuanTony</router-link
                >
              </li>
              <li class="nav-item my-2 my-lg-0">
                <router-link
                  to="/UserOrderSearch"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >訂單查詢</router-link
                >
              </li>
              <li class="nav-item my-2 my-lg-0">
                <router-link
                  to="/storelist"
                  class="nav-link text-white border-underline"
                  @click.prevent="closeOffcanvas"
                  >門市資訊</router-link
                >
              </li>
            </ul>
          </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    closeOffcanvas () { // 關閉 offcanvas
      document.getElementById('closeOffcanvas').click() // getElementById :選取元素 // 選取close按鈕並觸發點擊事件
    }
  }
}</script>
