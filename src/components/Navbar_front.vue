<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
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
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/aboutGuanTony" class="nav-link text-danger"
            >關於GuanTony</router-link
          >
          <router-link to="/orderQ&A" class="nav-link text-danger"
            >訂單Q&A</router-link
          >
          <router-link to="/products" class="nav-link text-danger"
            >所有商品</router-link
          >
          <router-link to="/UserOrderSearch" class="nav-link text-danger"
            >訂單查詢</router-link
          >
          <router-link to="/storemap" class="nav-link text-danger"
            >門市資訊</router-link
          >
          <!-- <router-link to="/dashboard/coupons" class="nav-link"
            >優惠券</router-link
          > -->
          <router-link to="/cart" class="nav-link text-danger"><i class="bi bi-cart3"></i></router-link>
          <!-- <a href="#" @click.prevent="logout" class="nav-link">登出</a> -->
          <router-link to="#" class="nav-link text-danger"
            ><i class="bi bi-suit-heart"></i></router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
