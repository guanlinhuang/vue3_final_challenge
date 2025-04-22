<template>
  <div class="bg-white">
    <div class="container py-5 SwiperProducts">
      <h3 class="py-3 text-center">熱銷商品</h3>
      <Swiper
        class="product-swiper"
        :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
        :modules="modules"
        :loop="true"
        :spaceBetween="3"
        :slidesPerView="2"
        :breakpoints="{
          992: { slidesPerView: 5, spaceBetween: 30 },
          1400: { slidesPerView: 6, spaceBetween: 30 },
        }"
      >
        <SwiperSlide v-for="item in products" :key="item.id">
          <div class="position-relative text-center product h-100 mb-4 mb-lg-0">
            <a @click="getProductPage(item.id)">
              <div
                v-if="item.origin_price !== item.price"
                class="onSale position-absolute text-white bg-danger py-1 px-3 d-none d-lg-block"
                style="z-index: 5"
              >
                特 價
              </div>
              <div class="swiper_img">
                <img
                  :src="`${item.imageUrl}`"
                  :alt="item.title"
                  class="object-fit-cover"
                />
              </div>
              <div>
                <p class="my-1 fw-normal mx-2">{{ item.title }}</p>
                <div class="price text-center">
                  <div v-if="item.origin_price !== item.price">
                    <p class="mb-0 mb-lg-1 text-danger">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price === item.price">
                    <p class="mb-0 mb-lg-1">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price !== item.price">
                    <p
                      class="product_origin_price mb-0 mb-lg-3 text-decoration-line-through"
                      style="font-size: 13px"
                    >
                      NT$ {{ item.origin_price }}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </SwiperSlide>
        <button class="swiper-button-next btn btn-light"></button>
        <button class="swiper-button-prev btn btn-light"></button>
      </Swiper>
      <div class="d-flex justify-content-center">
        <router-link to="/productsall" class="btnHover"
          ><div>
            <span>看更多</span>
            <span>看更多</span>
          </div></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default {
  data() {
    return {
      modules: [Autoplay, Pagination, Navigation],
      products: [],
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`;
      this.$http
        .get(api)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products
              .filter((e) => e.id !== this.id)
              .sort(() => Math.random() - 0.5);
            this.isLoading = false;
          }
        })
        .catch((err) => {
          this.$httpMessageState(err, "連線錯誤，請再試一次");
          this.isLoading = false;
        });
    },
    getProductPage(id) {
      this.$router.push(`/products/${id}`);
      this.id = id;
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
