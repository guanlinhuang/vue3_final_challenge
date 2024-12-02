<template>
  <SwiperBanner></SwiperBanner>
  <SwiperProducts></SwiperProducts>
  <div class="about py-5">
    <div class="container">
      <div class="text-center">
        <h3>關於</h3>
        <div class="d-flex justify-content-center">
          <!-- <img src="" alt="" style="width: 100px; > -->
          <div
            style="width: 400px; height: 400px; background-color: bisque"
          ></div>
          <div class="ms-4 text-start">
            <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
            <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
            <p>
              文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字......
            </p>
          </div>
        </div>
        <div class="d-flex justify-content-center py-5">
          <router-link to="/aboutGuanTony" class="btn btn-outline-primary"
            >more</router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div class="line_news py-5">
    <div class="container">
      <div class="row d-flex justify-content-around">
        <div class="addLine col-4">
          <h4 class="text-center">加入XX生活百貨LINE</h4>
          <!-- <img
            src="/images/products.jpg"
            alt=""
            style="width: 50px; height: 50px"
          /> -->
          <div
            class="mx-auto"
            style="width: 200px; height: 200px; background-color: rgba(15,45,60)"
          ></div>
        </div>
        <div class="addNews col-4">
          <h4>訂閱電子報</h4>
          <form>
            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                placeholder="請輸入 Email"
                aria-label="請輸入 Email"
              />
              <button
                class="btn btn-outline-0 btnEmail"
                type="submit"
                id="button-addon2"
              >
                <i class="bi bi-send-fill fs-4"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
</template>

<script>
// 引入 swiper vue元件
import SwiperBanner from '@/components/SwiperBanner.vue'
import SwiperProducts from '@/components/SwiperProducts.vue'
import SmallSidebar from '@/components/SmallSidebar'

export default {
  components: {
    // 註冊元件
    SwiperBanner,
    SwiperProducts,
    SmallSidebar
  },
  data () {
    return {
      carts: []
    }
  },
  methods: {
    // 取得購物車列表
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
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

<!-- s// swiper 必須設定顯示區域尺寸 -->
