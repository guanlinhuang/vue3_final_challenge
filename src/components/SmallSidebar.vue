<template>
  <div
    class="Smallsidebar d-none d-lg-block d-flex flex-column align-items-center"
  >
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a
        href="#"
        class="text-white d-block position-absolute start-50 translate-middle"
        style="top: 27px"
        ><i class="bi bi-facebook"></i
      ></a>
    </div>
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a
        href="#"
        class="text-white d-block position-absolute start-50 translate-middle"
        style="top: 27px"
        ><i class="bi bi-instagram"></i
      ></a>
    </div>
    <div class="followUs mb-2 me-2 position-relative rounded-circle">
      <a
        href="https://line.me/ti/p/OwNL1F9kBd"
        class="text-white d-block position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-line"></i
      ></a>
    </div>
    <div class="addCart mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/cart"
        class="nav-link text-white position-relative position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-cart3"></i
        ><span
          v-if="carts.length !== 0"
          class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 5px"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <div class="addFavorite mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/favorite"
        class="text-white position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-suit-heart-fill"></i
      ></router-link>
    </div>
  </div>
  <div class="Smallsidebar d-lg-none">
    <div class="addCart mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/cart"
        class="nav-link text-white position-relative position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-cart3"></i
        ><span
          v-if="carts.length !== 0"
          class="position-absolute start-100 translate-middle badge rounded-pill bg-danger"
          style="font-size: 13px; top: 5px"
          >{{ totalQty }}
          <span class="visually-hidden">unread messages</span>
        </span></router-link
      >
    </div>
    <div class="addFavorite mb-2 me-2 position-relative rounded-circle">
      <router-link
        to="/favorite"
        class="text-white position-absolute start-50 translate-middle"
        style="top: 28px"
        ><i class="bi bi-suit-heart-fill"></i
      ></router-link>
    </div>
  </div>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      carts: [],
    };
  },
  inject: ["emitter"],
  methods: {
    getCart() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http
        .get(url)
        .then((response) => {
          this.carts = response.data.data.carts;
        })
        .catch((error) => {
          this.$httpMessageState(error, "連線錯誤");
        });
    },
  },
  computed: {
    totalQty() {
      let total = 0;
      if (Array.isArray(this.carts)) {
        this.carts.forEach((item) => {
          total += item.qty;
        });
      }
      return total;
    },
  },

  mounted() {
    this.emitter.on("update-cart", (msg) => {
      this.carts = msg;
    });
  },
  created() {
    this.getCart();
  },
};
</script>
