<template>
  <SwiperBanner></SwiperBanner>
  <SwiperProducts></SwiperProducts>
  <div class="container">
    <div class="about py-5">
      <div class="text-center">
        <h3>關於</h3>
        <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
        <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
        <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
        <p>文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字</p>
        <div class="d-flex justify-content-center py-5">
          <a href="#" class="btn btn-outline-primary">探索更多</a>
        </div>
      </div>
    </div>
    <div class="line_news py-5">
      <div class="row d-flex justify-content-around">
        <div class="addLine col-4">
          <h4>加入XX生活百貨LINE</h4>
          <img
            src="/images/products.jpg"
            alt=""
            style="width: 50px; height: 50px"
          />
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
</template>

<script>
// 引入 swiper vue元件
import SwiperBanner from '@/components/SwiperBanner.vue'
import SwiperProducts from '@/components/SwiperProducts.vue'

export default {
  components: {
    // 註冊元件
    SwiperBanner,
    SwiperProducts
  }
}
</script>

<!-- s// swiper 必須設定顯示區域尺寸 -->
