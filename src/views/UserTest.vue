<template>
<nav class="navbar navbar-expand-lg navbar-color">
      <div class="container-fluid">
        <a class="navbar-brand d-lg-none text-white mx-3" href="#">Logo</a>
        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link
                  to="/aboutus"
                  class="nav-link text-white border-underline"
                  >關於GuanTony</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/productsall"
                  class="nav-link text-white border-underline"
                  >所有商品</router-link
                >
              </li>
              <li class="nav-item d-none d-lg-block">
                <router-link to="/" class="nav-link text-white mx-4"
                  >logo</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/UserOrderSearch"
                  class="nav-link text-white border-underline"
                  >訂單查詢</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  to="/storelist"
                  class="nav-link text-white border-underline"
                  >門市資訊</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
</template>
