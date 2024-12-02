<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container flex-column">
      <div class="logo">
        <a class="navbar-brand" href="#">logo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
      <div
        class="collapse navbar-collapse"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav">
          <router-link to="/aboutGuanTony" class="nav-link text-white border-underline"
            >關於GuanTony</router-link
          >
          <router-link to="/products" class="nav-link text-white border-underline"
            >所有商品</router-link
          >
          <router-link to="/orderQ&A" class="nav-link text-white border-underline"
            >訂單Q&A</router-link
          >
          <router-link to="/UserOrderSearch" class="nav-link text-white border-underline"
            >訂單查詢</router-link
          >
          <router-link to="/storelist" class="nav-link text-white border-underline"
            >門市資訊</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
