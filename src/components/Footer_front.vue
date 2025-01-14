<template>
  <footer class="footer">
    <div class="container py-4">
      <div class="row d-block d-lg-flex justify-content-around ms-3 ms-lg-0">
        <div class="col col-lg-2 text-white mb-3">
          <router-link to="/aboutus" class="nav-link py-2"
            >關於GuanTony</router-link
          >
          <router-link to="/productsall" class="nav-link py-2"
            >所有商品</router-link
          >
          <router-link to="/UserOrderSearch" class="nav-link py-2"
            >訂單查詢</router-link
          >
          <router-link to="/storelist" class="nav-link py-2"
            >門市資訊</router-link
          >
        </div>
        <div class="contact_us col col-lg-4 text-white">
          <h2>聯絡我們</h2>
          <ul class="list-unstyled">
            <li>
              電話：<a href="tel:04-12345678" class="text-white text-decoration-none">04-1234-5678</a>
            </li>
            <li>
              電子信箱：<a href="mailto:123@gmail.com" class="text-white text-decoration-none">123@gmail.com</a>
            </li>
            <li>
              創始店：<a
                href="https://www.google.com/maps/@24.1960154,120.677505,13z?authuser=0&entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D" class="text-white text-decoration-none"
                >台中市北屯區昌平路二段45之8號</a
              >
            </li>
          </ul>
          <router-link to="/dashboard/products" class="text-white text-decoration-none"
            >管理員後台</router-link
          >
        </div>
      </div>
      <div class="footer_followUs d-flex ms-3 mt-3 d-lg-none">
        <div class="followBtn">
      <a href="#" class="p-2 ms-1 text-white d-block"
        ><i class="bi bi-facebook"></i
      ></a>
    </div>
    <div class="followBtn">
      <a href="#" class="p-2 ms-1 text-white d-block"
        ><i class="bi bi-instagram"></i
      ></a>
    </div>
    <div class="followBtn">
      <a href="#" class="p-2 ms-1 text-white d-block"
        ><i class="bi bi-line"></i
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
