<template>
  <footer class="footer">
    <div class="container py-4">
      <div
        class="row mt-lg-5 d-lg-flex justify-content-around"
      >
        <div class="col-3 col-lg-1"><img src="https://i.imgur.com/L5VIrdW.png" alt="logo" style="height: 100px;"></div>
        <div class="col-8 col-lg-6 row justify-content-end">
          <div class="col-lg-7 text-end text-white mb-5 mb-lg-0">
            <ul class="list-unstyled">
              <li class="py-2">
                <a
                  href="tel:04-12345678"
                  class="text-white text-decoration-none"
                  >04-1234-5678</a
                >
              </li>
              <li class="py-2">
                <a
                  href="mailto:guantony.service@gmail.com"
                  class="text-white text-decoration-none"
                  >guantony.service@gmail.com</a
                >
              </li>
              <li class="py-2">
                <a
                  href="https://www.google.com/maps/@24.1960154,120.677505,13z?authuser=0&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D"
                  class="text-white text-decoration-none"
                  >台中市北屯區昌平路二段45之8號</a
                >
              </li>
            </ul>
            <router-link
              to="/dashboard/products"
              class="text-white text-decoration-none"
              >管理員後台</router-link
            >
          </div>
          <div class="col-lg-3 text-white mb-3 text-end">
            <router-link to="/aboutus" class="nav-link py-2"
              >- 關於我們</router-link
            >
            <router-link to="/productsall" class="nav-link py-2"
              >- 所有商品</router-link
            >
            <router-link to="/UserOrderSearch" class="nav-link py-2"
              >- 訂單查詢</router-link
            >
            <router-link to="/storelist" class="nav-link py-2"
              >- 門市資訊</router-link
            >
          </div>
        </div>
      </div>
      <div class="footer_followUs d-flex ms-3 mt-lg-3 justify-content-end pe-4">
        <div class="followBtn">
          <a href="#" class="p-2 ms-1 text-white d-block"
            ><i class="bi bi-facebook fs-1"></i
          ></a>
        </div>
        <div class="followBtn">
          <a href="#" class="p-2 ms-1 text-white d-block"
            ><i class="bi bi-instagram fs-1"></i
          ></a>
        </div>
        <div class="followBtn">
          <a
            href="https://line.me/ti/p/OwNL1F9kBd"
            class="p-2 ms-1 text-white d-block"
            ><i class="bi bi-line fs-1"></i
          ></a>
        </div>
      </div>
      <div class="text-center text-white pt-4">
        <p class="mb-0">本網站由GuanTony工作室設計 © 2024版權所有</p>
        <p class="mb-0">【 本網站為個人練習作品用，非商業使用 】</p>
      </div>
    </div>
  </footer>
</template>
