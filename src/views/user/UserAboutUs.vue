<template>
  <!-- <div class="about_banner"></div> -->
  <div class="about">
    <div class="container py-4 py-lg-5">
      <h3 class="text-center">關於我們</h3>
      <div class="row row-cols-1 flex-row-reverse justify-content-center mt-3 mt-lg-5">
        <div class="col col-lg-5">
          <div class="about_img_1"></div>
        </div>
        <div class="col col-lg-5 px-4 px-lg-2 mt-2 mt-lg-0">
          <h4>12345</h4>
          <p class="text-break">
            123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345
          </p>
        </div>
      </div>
      <div class="row row-cols-1 justify-content-center mt-4">
        <div class="col col-lg-5">
          <div class="about_img_2"></div>
        </div>
        <div class="col col-lg-5 px-4 px-lg-2 mt-2 mt-lg-0">
          <h4>12345</h4>
          <p class="text-break">
            123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345
          </p>
        </div>
      </div>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
</template>

<script>

import SmallSidebar from '@/components/SmallSidebar.vue'
export default {
  data () {
    return {
      carts: []
    }
  },
  components: { // 區域註冊
    SmallSidebar
  },
  methods: {
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        console.log('getCart', response)
        this.carts = response.data.data.carts
        console.log('this.carts', this.carts)
      })
    }
  },
  created () {
    this.getCart()
  }
}
</script>
