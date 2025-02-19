<template>
  <SwiperBanner></SwiperBanner>
  <SwiperProducts></SwiperProducts>
  <div class="about homeView_about">
    <div class="container-fluid about_box position-relative">
      <div class="about_text position-absolute">
        <h3 class="text-center my-4">關於我們</h3>
        <p class="text-break mx-5">
          &emsp;&emsp;GuanTony，這個品牌名稱源自創辦人名字「冠」的羅馬拼音及英文名「Tony」，合併成一個活招牌，象徵著創辦人對於健康飲品的堅持與初心。這個初衷，就是捧著一杯新鮮榨製的健康果汁，為那些渴望天然、無負擔飲品的人們提供一個健康選擇，讓每一位顧客都能品嚐到純粹與自然的美味。
          1994年，創辦人從一條繁忙的城市街道上的小店舖起步，在10多年間持續獲得周邊鄰居的好評，更是吸引各地遊客前來品嚐。
          </p>
          <div class="d-flex justify-content-center pt-4">
          <router-link to="/aboutUs" class="btnHover"
            ><div>
              <span>more</span>
              <span>more</span>
            </div></router-link
          >
        </div>
      </div>
    </div>
  </div>
  <div class="line_news py-5">
    <div class="container">
      <div class="row d-block d-lg-flex justify-content-center">
        <div class="addLine col col-lg-4">
          <h4 class="text-center mb-3">加入LINE</h4>
          <div class="line mx-auto"></div>
        </div>
        <div class="addNews col col-lg-5 mt-5 mt-lg-0">
          <h4 class="mb-3 text-center">訂閱電子報</h4>
            <div class="input-group w-100 mx-1">
              <input
                type="email"
                class="form-control"
                placeholder="請輸入 Email"
                aria-label="請輸入 Email"
              />
              <button class="btnHover me-2" type="button"
            ><div>
              <span>訂閱</span>
              <span>訂閱</span>
            </div></button>
</div>
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

export default {
  components: {
    // 註冊元件
    SwiperBanner,
    SwiperProducts
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
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
      })
        .catch((error) => {
          this.$httpMessageState(error, '連線錯誤')
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<!-- // swiper 必須設定顯示區域尺寸 -->
