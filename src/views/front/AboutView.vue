<template>
  <img
    src=""
    alt=""
    style="width: 100%; height: 300px; background-color: antiquewhite"
  />
  <div class="about">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-5 my-5">
          <h4>12345</h4>
          <p class="text-break">
            123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345
          </p>
        </div>
        <div class="col-5 my-5">
          <div
            style="width: 400px; height: 400px; background-color: bisque"
          ></div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-5 mb-5">
          <div
            style="width: 400px; height: 400px; background-color: bisque"
          ></div>
        </div>
        <div class="col-5 mb-5">
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
