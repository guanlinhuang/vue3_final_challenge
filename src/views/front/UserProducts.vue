<template>
  <Loading :active="isLoading"></Loading>
  <div class="container">
    <div class="row mt-4">
      <div class="col-4">
        <ul class="list-unstyled">
          <li><button type="button" class="btn btn-outline-danger" @click.prevent="categoryFilter = '', updateCategory('')">全部商品
          </button></li>
          <li><button type="button" class="btn btn-outline-danger" @click.prevent="categoryFilter = '背包', updateCategory('背包')">背包</button></li>
          <li><button type="button" class="btn btn-outline-danger" @click.prevent="categoryFilter = '鞋子', updateCategory('鞋子')">鞋子</button></li>
          <li><button type="button" class="btn btn-outline-danger" @click.prevent="categoryFilter = '行李箱', updateCategory('行李箱')">行李箱</button></li>
        </ul>
      </div>
      <div class="col-md-7">
        <table class="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filterProducts" :key="item.id">
              <td style="width: 200px">
                <div
                  style="
                    height: 100px;
                    background-size: cover;
                    background-position: center;
                  "
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
              </td>
              <td>
                <a href="#" class="text-dark">{{ item.title }}</a>
              </td>
              <td>
                <div class="h5" v-if="!item.price">
                  {{ item.origin_price }} 元
                </div>
                <del class="h6" v-if="item.price"
                  >原價 {{ item.origin_price }} 元</del
                >
                <div class="h5" v-if="item.price">
                  現在只要 {{ item.price }} 元
                </div>
              </td>
              <td>
                <div class="btn-group btn-group-sm">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click="getProduct(item.id)"
                  >
                    查看更多
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger"
                    :disabled="status.loadingItem === item.id"
                    @click="addCart(item.id)"
                  >
                    <div
                      v-if="this.status.loadingItem === item.id"
                      class="spinner-grow text-danger spinner-grow-sm"
                      role="status"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    加到購物車
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: ''
      },
      categoryFilter: '',
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
      coupon_code: ''
    }
  },
  methods: {
    getProducts () { // 取得商品列表_all
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all` // *** api改${}
      this.isLoading = true
      this.$http.get(url).then((response) => {
        this.products = response.data.products
        this.isLoading = false
        console.log('getproducts:', response)
        // // this.isLoading = false
        // const { categoryItem } = this.$route.params
        // if (categoryItem) {
        //   this.categoryItem = categoryItem
        //   console.log(this.categoryItem)
        // }
        // if (this.categoryItem !== '') {
        //   this.pagination = {}
        // }
      })
    },
    updateCategory (category) { // 路由路徑增加分類
      this.$router.push({
        name: 'products',
        params: { category } // 值 可透過params加入到 index.js路由products後面的/:category? 路由
      })
      console.log('updateCategory', this.categoryFilter)
      console.log('this.$route.params', this.$route.params.category)
    },

    getProduct (id) { // 取得某一商品id，並導到該商品獨立頁面
      this.$router.push(`/products/${id}`)
    },

    addCart (id) { // 商品加到購物車
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart` // 加入購物車api
      this.status.loadingItem = id
      const cart = {
        product_id: id,
        qty: 1
      }
      this.$http.post(url, { data: cart }).then((res) => { // 某一商品id加入到購物車
        this.status.loadingItem = ''
        // 回傳成功後清空，讓兩邊id不再相同，否則會一直處於disabled狀態
        console.log('addCart', res)
        // this.getCart()
      })
    }
  },
  // watch: {
  //   categoryItem (newValue, preValue) {
  //     if (newValue === '' || preValue === '') {
  //       this.getAllProducts()
  //     }
  //   }
  // },

  computed: {
    filterProducts () {
      return this.products.filter((item) => {
        return item.category.match(this.categoryFilter)
      })
    }
  },
  created () {
    this.getProducts()
    // console.log('getProducts2', this.$route.params.category)
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
categoryFilter = '背包' 的值 好像可以直截儲存在本地端this.categoryFilter？
categoryFilter = ''，可篩選出全部商品？ 不會因為是空值，而篩選不出 -->
