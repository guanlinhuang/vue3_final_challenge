<template>
  <Loading :active="isLoading"></Loading>
  <img
    src=""
    alt=""
    style="width: 100%; height: 300px; background-color: antiquewhite"
  />
  <div class="container products_all">
    <div class="row justify-content-center">
      <div class="col mt-5 me-5">
        <div class="button-group">
          <button
            type="button"
            class="allBtn btn btn-type border-dark border-2"
            @click.prevent="categoryFilter('all'), changeClass(1)"
            :class="{ active: isActive === 1 }"
          >
            全部商品
          </button>
          <button
            type="button"
            class="vegetablesBtn btn btn-type border-dark border-2"
            @click.prevent="categoryFilter('手套'), changeClass(2)"
            :class="{ active: isActive === 2 }"
          >
            手套
          </button>
          <button
            type="button"
            class="fruitsBtn btn btn-type border-dark border-2"
            @click.prevent="categoryFilter('手套22'), changeClass(3)"
            :class="{ active: isActive === 3 }"
          >
            手套22
          </button>
          <button
            type="button"
            class="flowersBtn btn btn-type border-dark border-2"
            @click.prevent="categoryFilter('測試分類'), changeClass(4)"
            :class="{ active: isActive === 4 }"
          >
            測試分類
          </button>
          <button
            type="button"
            class="flowersBtn btn btn-type border-dark border-2"
            @click.prevent="categoryFilter('保養品'), changeClass(5)"
            :class="{ active: isActive === 5 }"
          >
            保養品
          </button>
          <button
            type="button"
            class="flowersBtn btn btn-type border-dark border-2"
            @click.prevent="categoryFilter('包包'), changeClass(6)"
            :class="{ active: isActive === 6 }"
          >
            包包
          </button>
        </div>
      </div>
      <div class="col-10 mt-5">
        <div v-if="this.products !== this.filterProducts">
          <div class="row row-cols-5">
            <div class="col" v-for="item in filterProducts" :key="item.id">
              <div class="position-relative text-center mb-5 product">
                <a @click="getProduct(item.id)">
                  <div
                    v-if="item.origin_price !== item.price"
                    class="onSale position-absolute text-white bg-danger py-1 px-3"
                    style="z-index: 5"
                  >
                    特 價
                  </div>
                  <div class="product_img rounded-4">
                    <img :src="`${item.imageUrl}`" class="object-fit-cover" />
                  </div>
                  <h5 class="my-1 fw-normal">{{ item.title }}</h5>
                  <div class="d-flex justify-content-center align-items-center">
                    <div v-if="item.origin_price !== item.price">
                      <p class="mb-1 fs-4 text-danger">NT$ {{ item.price }}</p>
                    </div>
                    <div v-if="item.origin_price === item.price">
                      <p class="mb-1 fs-4">NT$ {{ item.price }}</p>
                    </div>
                    <div v-if="item.origin_price !== item.price">
                      <p
                        class="product_origin_price mb-1 text-decoration-line-through ms-2"
                      >
                        NT$ {{ item.origin_price }}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="row row-cols-5">
            <div class="col" v-for="item in products" :key="item.id">
              <div class="position-relative text-center mb-5 product">
                <a @click="getProduct(item.id)">
                  <div
                    v-if="item.origin_price !== item.price"
                    class="onSale position-absolute text-white bg-danger py-1 px-3"
                    style="z-index: 5"
                  >
                    特 價
                  </div>
                  <div class="product_img rounded-4">
                    <img :src="`${item.imageUrl}`" class="object-fit-cover" />
                  </div>
                  <h5 class="my-1 fw-normal">{{ item.title }}</h5>
                  <div class="d-flex justify-content-center align-items-center">
                    <div v-if="item.origin_price !== item.price">
                      <p class="mb-1 fs-4 text-danger">NT$ {{ item.price }}</p>
                    </div>
                    <div v-if="item.origin_price === item.price">
                      <p class="mb-1 fs-4">NT$ {{ item.price }}</p>
                    </div>
                    <div v-if="item.origin_price !== item.price">
                      <p
                        class="product_origin_price mb-1 text-decoration-line-through ms-2"
                      >
                        NT$ {{ item.origin_price }}
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <!-- 前內後外 -->
          <Pagination
            :pages="pagination"
            @emit-pages="getProducts"
          ></Pagination>
        </div>
      </div>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
</template>

<script>
import Pagination from '@/components/Pagination.vue'
import SmallSidebar from '@/components/SmallSidebar.vue'

export default {
  data () {
    return {
      products: [], // 用於選染分頁的產品資料
      products_2: [], // 用於產品資料一次渲染單一頁面，方便篩選
      product: {},
      status: {
        loadingItem: ''
      },
      filterProducts: [], // 用於選染分頁的產品資料
      filterProducts_2: [], // 用於產品資料一次渲染單一頁面，方便篩選
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      cart: {},
      coupon_code: '',
      isActive: 1, // 篩選資料按鈕用
      pagination: {}, // 每個分頁的產品資料
      carts: []
    }
  },
  components: { // 區域註冊
    Pagination,
    SmallSidebar
  },
  methods: {
    getProducts (page = 1) { // 用於選染分頁的產品資料
      // 取得商品列表_all
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/?page=${page}` // *** api改${}
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        this.filterProducts = response.data.products // 因應v-else，遠端所有資料儲存於本地端filterProducts，讓this.filterProducts 等同於 this.products，這樣才有辦法顯示跟隱藏
        this.pagination = response.data.pagination // 將遠端分頁的產品資料儲存到本地端
        // this.isLoading = false
        console.log('getproducts:', response)
        console.log('pagination', this.pagination)
        // // this.isLoading = false
        // const { categoryItem } = this.$route.params // 取得
        // if (categoryItem) {
        //   this.categoryItem = categoryItem
        //   console.log(this.categoryItem)
        // }
        // if (this.categoryItem !== '') {
        //   this.pagination = {}
        // }
        // this.categoryFilter(category)
      })
    },
    getProducts_2 () { // 用於產品資料一次渲染單一頁面，方便篩選
      // 取得商品列表_all
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all` // *** api改${}
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products_2 = response.data.products
        this.filterProducts_2 = response.data.products
        // updateCategory (category) { // 路由路徑增加分類名稱
        //   this.$router.push({
        //     name: 'products',
        //     params: { category } // 值 可透過params加入到 index.js路由products後面的/:category? 路由
        //   })
        //   console.log('updateCategory', this.categoryFilter)
        //   console.log('this.$route.params', this.$route.params.category)
        // },
      })
    },
    getCart () { // 取得購物車列表
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      // this.isLoading = true
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
        console.log('this.carts', this.carts)
      })
    },
    getProduct (id) {
      // 取得某一商品id，並導到該商品獨立頁面
      this.$router.push(`/products/${id}`)
    },

    push () {
      this.$router.push('/products/')
    },

    categoryFilter (category) {
      // const buttonGroup = document.querySelector('.button-group')
      // buttonGroup.addEventListener('click', function (e) {
      //   if (e.target.nodeName === 'BUTTON') { // 點擊到按鈕的HTML標籤位置，執行以下code
      //     // 加屬性active，可使按鈕背景常亮
      //     document.querySelectorAll('.btn').forEach(function (item, index) {
      //       item.classList.remove('active')
      //     })
      //     e.target.classList.add('active')
      //     // var btn = e.target.nodeName === 'BUTTON'
      //   }
      // if (e.target.dataset.type !== 'all') { // 點擊「全部」之外的按鈕，篩選出相對應的種類資料
      //   const type = e.target.dataset.type
      if (category !== 'all') {
        this.filterProducts = this.products.filter((item) => {
        // 篩選後的filterProducts將會蓋過初始化的filterProducts
          return item.category === category
        })
      } else {
        this.getProducts()
        // window.location.reload() // 重新整理
      }
      // console.log(e.target.dataset.type)
      // renderData(filterData)
      console.log(this.filterProducts_2, '123')

      // else { // 點擊「全部」按鈕，重新渲染全部資料
      //   console.log('全部種類')
      //   renderData(newData)
      // }

      // })
      // e.target.getAttribute("data-type") = e.target.dataset.type
      // }
      // addCart (id) { // 商品加到購物車
      //   const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart` // 加入購物車api
      //   this.status.loadingItem = id
      //   const cart = {
      //     product_id: id,
      //     qty: 1
      //   }
      //   this.$http.post(url, { data: cart }).then((res) => { // 某一商品id加入到購物車
      //     this.status.loadingItem = ''
      //     // 回傳成功後清空，讓兩邊id不再相同，否則會一直處於disabled狀態
      //     console.log('addCart', res)
      //     // this.getCart()
      //   })
      // }
    },

    changeClass (index) {
      this.isActive = index
      console.log('changeClass')
    }
  },

  // watch: {
  //   categoryItem (newValue, preValue) {
  //     if (newValue === '' || preValue === '') { // || 或 、 && 且
  //       this.getAllProducts()
  //     }
  //   }
  // },

  // computed: { // filterProducts沒有定義在data裡，直接用Computed來運算出來
  //   filterProducts () {
  //     return this.products.filter((item) => {
  //       return item.category.match(this.categoryFilter)
  //     })
  //   }
  // },

  created () {
    this.getProducts()
    this.getProducts_2()
    // console.log('getProducts2', this.$route.params.category)
    this.getCart()
  }
}
</script>

<!-- :disabled="this.status.loadingItem === item.id"
為避免用戶不知道自己已經加入了，但一直重複點擊按鈕，所以按鈕加入disabled狀態，無法再點擊，用意讓用戶知道已經點擊加入了
當this.status.loadingItem（addCart函式裡的id） 等於 item.id（點擊時的id） 時，進入disabled跟讀取效果狀態 -->

<!-- filterProducts沒有定義在data裡，直接用Computed來運算出來
filterProducts的用意就是輸入搜尋內容時，預計把搜尋的內容字串與data裡的products裡的產品的品項相符合時就會把資料給調用出來 -->

<!-- filter() 根據你指定的測試函數，從一個陣列中篩選出符合條件的元素
match() 當輸入的文字有部分相符，會把該產品列出來
button裡的
問：categoryFilter = '背包' 的值 好像可以直截儲存在本地端this.categoryFilter？
categoryFilter = ''，可篩選出全部商品？ 不會因為是空值，而篩選不出 -->

<!-- <div>
                  <button type="button" class="btn btn-outline-none p-0 px-1">
                    <i class="bi bi-suit-heart fs-3"></i>
                  </button>
                  <button type="button" class="btn btn-outline-secondary w-75 ms-1">
                    加入購物車
                  </button>
                </div> -->

                <!-- <button data-type="all" type="button" class="allBtn btn btn-type border-dark border-2 active" @click.prevent="categoryFilter(''), updateCategory('')">全部商品</button>
        <button data-type="N04" type="button" class="vegetablesBtn btn btn-type border-dark border-2" @click.prevent="categoryFilter('手套'), updateCategory('手套')">手套</button>
        <button data-type="N05" type="button" class="fruitsBtn btn btn-type border-dark border-2" @click.prevent="categoryFilter('手套22'), updateCategory('手套22')">手套22</button>
        <button data-type="N06" type="button" class="flowersBtn btn btn-type border-dark border-2" @click.prevent="categoryFilter('測試分類'), updateCategory('測試分類')">測試分類</button> -->
