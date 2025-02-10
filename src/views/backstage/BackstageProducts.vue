<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <div class="container py-5 mx-auto">
    <h3 class="text-center">產品列表</h3>
    <div class="category_btn mt-5 mb-3 d-flex justify-content-center flex-wrap">
      <button
        type="button"
        class="mx-3 px-4 btnHover2"
        value="全部商品"
        data-text="全部商品"
        @click.prevent="(categoryName = ''), updateCategory(''), changeClass(1)"
        :class="{ active: categoryName === '' }"
      >
        全部商品<span></span><span></span><span></span><span></span>
      </button>
      <button
        type="button"
        class="mx-3 px-4 btnHover2"
        data-text="咖啡"
        @click.prevent="
          (categoryName = '咖啡'), updateCategory('咖啡'), changeClass(2)
        "
        :class="{ active: isActive === 2 }"
        value="咖啡"
      >
        咖啡<span></span><span></span><span></span><span></span>
      </button>
      <button
        type="button"
        class="mx-3 px-4 btnHover2"
        data-text="果汁"
        @click.prevent="
          (categoryName = '果汁'), updateCategory('果汁'), changeClass(3)
        "
        :class="{ active: isActive === 3 }"
        value="果汁"
      >
        果汁<span></span><span></span><span></span><span></span>
      </button>
      <button
        type="button"
        class="mx-3 px-4 btnHover2"
        data-text="冰沙"
        @click.prevent="
          (categoryName = '冰沙'), updateCategory('冰沙'), changeClass(4)
        "
        :class="{ active: isActive === 4 }"
        value="冰沙"
      >
        冰沙<span></span><span></span><span></span><span></span>
      </button>
      <button
        type="button"
        class="mx-3 px-4 btnHover2"
        data-text="甜點"
        @click.prevent="
          (categoryName = '甜點'), updateCategory('甜點'), changeClass(5)
        "
        :class="{ active: isActive === 5 }"
        value="甜點"
      >
        甜點<span></span><span></span><span></span><span></span>
      </button>
      <button
        type="button"
        class="mx-3 px-4 btnHover2"
        data-text="組合餐"
        @click.prevent="
          (categoryName = '組合餐'), updateCategory('組合餐'), changeClass(6)
        "
        :class="{ active: isActive === 6 }"
        value="組合餐"
      >
        組合餐<span></span><span></span><span></span><span></span>
      </button>
    </div>
    <div class="text-end mx-3 px-4">
      <button type="button" class="btnHover btnHover5" @click="openModal(true)">
        <div>
          <span>新增產品</span>
          <span>新增產品</span>
        </div>
      </button>
      <!-- (4)利用methods去觸發 -->
      <!-- 原 @click="$refs.productModal.showModal()" 改為 @click="openModal(true)"
      增加產品，$refs.productModal移到method裡 -->
    </div>
    <div class="row">
      <div class="col-9 mx-auto">
        <table class="table mt-4 align-middle">
          <thead>
            <tr class="text-center">
              <th></th>
              <th>分類</th>
              <th></th>
              <th class="text-start">產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否啟用</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-center"
              v-for="item in productsFilter"
              :key="item.id"
            >
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openDelProductModal(item)"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
              </td>
              <td>{{ item.category }}</td>
              <td style="width: 70px">
                <div style="width: 70px; height: 100px">
                  <img
                    :src="item.imageUrl"
                    alt=""
                    class="w-100 h-100 object-fit-cover"
                  />
                </div>
              </td>
              <td class="align-top text-start">{{ item.title }}</td>
              <!-- <td class="text-right">{{ item.origin_price }}</td>
        <td class="text-right">{{ item.price }}</td> -->
              <td class="text-right">
                ${{ $filters.currency(item.origin_price) }}
              </td>
              <td class="text-right">${{ $filters.currency(item.price) }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span class="text-muted" v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btnHover me-1"
                    @click="openModal(false, item)"
                  >
                    <div>
                      <span>編輯</span>
                      <span>編輯</span>
                    </div>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 前內後外 -->
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    <ProductModal
      ref="productModal"
      :product="tempProduct"
      @update-product="updateProduct"
    ></ProductModal>
    <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
  </div>
  <!-- 「新增按鈕」可以透過ref取得的DOM元素來觸發methods -->
</template>

<script>
import ProductModal from '@/components/ProductModal.vue' // 將ProductModal元件載進來，才能使用該元件的方法呼叫
import DelModal from '@/components/DelModal.vue' // 將DelModal元件載進來，才能使用該元件的方法呼叫
import Pagination from '@/components/Pagination.vue'

// 為什麼不在ProductModal.vue建空白的tempProduct？
// 因為除了新增用，還有編輯也會用到，所以在Products.vue建立空白的tempProduct
export default {
  data () {
    return {
      products: [], // 所有產品
      pagination: {}, // 每個產品資料(分頁資訊)
      tempProduct: {},
      isNew: false, // 判斷是否"新增"或"修改"狀態 // 一般來說，通常會將預設值設為 0、""、false、{}、[]，雖然在這個地方設 true 不影響
      isLoading: false, // 讀取狀態 // 預設還沒進入讀取狀態
      // current_page: ''
      categoryName: '', // 篩選名稱
      // currentPage: '',
      isActive: 1, // 篩選資料按鈕用
      currentPage: '',
      category: {}
    }
  },
  components: {
    // 區域註冊
    ProductModal,
    DelModal,
    Pagination
  },
  inject: ['emitter'], // 內層使用inject // 可使用外層元件Dashboard.vue的mitt套件功能
  methods: {
    // getProducts (page = 1) {
    //   // 從遠端資料庫撈資料 // 加入參數預設值page = 1，若沒有加入，也會直接載入第一頁
    //   const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all` // 透過這個api取得遠端資料
    //   // 原:api_path 改為個人api ${process.env.VUE_APP_PATH}
    //   // 因為連到 VUE_APP_PATH，即個人api，所以需要登入自己的帳密，才能取得個人資料庫res.tata

    //   this.isLoading = true // 取得遠端資料時，進入讀取狀態
    //   this.$http
    //     .get(api) // 因為改成get，即只取得資料，所以後面不需加入任何this.user
    //     .then((res) => {
    //       if (res.data.success) {
    //         this.isLoading = false // 遠端資料已取得完畢，關閉讀取效果
    //         console.log(res.data)
    //         this.products = res.data.products
    //         // this.pagination = res.data.pagination // 將遠端資料data儲存到本地端的data，並將本地端data選染到頁面，也可看開發人員工具的vue
    //         console.log('this.products', this.products)
    //         console.log('this.products.id', this.products.category)
    //       }
    //       console.log(res.data)
    //       this.productsFilter2()
    //     })
    // },
    getProducts (page = 1) {
      // 取得商品列表_all
      this.isLoading = true // 取得遠端資料時，進入讀取狀態
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all` // *** api改${}
      // 原:api_path 改為個人api ${process.env.VUE_APP_PATH}
      // 因為連到 VUE_APP_PATH，即個人api，所以需要登入自己的帳密，才能取得個人資料庫res.tata
      this.$http
        .get(url)
        .then((response) => {
          // 因為改成get，即只取得資料，所以後面不需加入任何this.user
          if (!response.data.success) {
            this.isLoading = false // 遠端資料已取得完畢，關閉讀取效果
            return
          }
          // this.products = response.data.products
          // console.log('this.products', this.products)
          this.products = Object.values(response.data.products) // 須先將物件轉為陣列，才能使用filter功能(物件無法使用filter)
          // this.pagination = response.data.pagination
          // console.log('this.products', this.products)
          this.isLoading = false
          // this.productsFilter2()
          // this.setPagination(page)
          // console.log('getProducts789', this.pagination)
          // this.updateCategory()
          const { categoryName } = this.$route.params // 取值分類名稱作為變數名稱
          if (categoryName) {
            this.categoryName = categoryName // 儲存於本地端this.categoryName
            // console.log('getProducts123', this.pagination)
          }
          if (this.categoryName !== '') {
            // 跟前面的if一起執行，按到有類別名稱的按鈕，頁碼消失  // 不要輸入else if，頁碼不會消失
            this.pagination = {}
            // console.log('getProducts456', this.pagination)
          } else {
            // 初始化(還沒篩選分類時)
            this.setPagination(page)
            // console.log('getProducts789', this.pagination)
            this.updateCategory() // 按下上下一頁按鈕，不用加入參數，也可跳回瀏覽器頂部（即使updateCategory與頁碼無相關）
          }
          this.isLoading = false
        })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次')
          this.isLoading = false
        })
    },
    setPagination (page = 1) {
      // 設定每頁呈現 N個商品 跟 頁數
      const perPage = 10 // 每頁有10個商品
      this.pagination = {
        total_pages: Math.ceil(this.products.length / perPage), // 總頁數 // 12個商品/10= 1.2，回傳 2 // Math.ceil() 函式會回傳大於等於所給數字的最小整數
        current_page: page, // 當前頁碼
        has_pre: page !== 1, // 上一頁按鈕 // 預設 如不等於1，則回傳false
        has_next: false, // 下一頁按鈕 // 預設無法使用
        category: null // 有無分類
      }
      if (this.pagination.current_page >= this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages
        this.pagination.has_next = false // 當前頁碼大於或等於總頁數，回傳false，下一頁按鈕無法使用(隱藏按鈕）
        // console.log('setPagination123', this.pagination.has_next)
      } else {
        this.pagination.has_next = true // 當前頁碼小於總頁數，回傳true，下一頁按鈕可使用(顯示按鈕)
        // console.log('setPagination456', this.pagination.has_next)
      }
      // 每頁呈現商品數的計算公式
      const minPage = this.pagination.current_page * perPage - perPage
      const maxPage = this.pagination.current_page * perPage
      this.products = this.products.slice(minPage, maxPage) // 從minPage起始位置開始往後刪除maxPage個商品(含起始位置)
      // console.log('計算公式', this.products)
    },
    // updateCategory (category) { // 路由路徑增加 分類名稱 // 更換新的網址後可跳回瀏覽器頂部
    //   this.$router.push({
    //     name: '所有商品列表',
    //     params: { categoryName: category } // 值 可透過params加入到 index.js路由products後面的/:categoryName? 路由
    //   })
    // },
    updateCategory (category) {
      // 路由路徑增加 分類名稱 // 更換新的網址後可跳回瀏覽器頂部
      this.$router.push({
        name: '新增產品',
        params: { categoryName: category } // 值 可透過params加入到 index.js路由products後面的/:categoryName? 路由
      })
    },
    changeClass (index) {
      // 改變篩選名稱active
      this.isActive = index
      // console.log('changeClass')
    },

    // 加入openModal，點擊「增加產品」或「編輯」按鈕，會打開Modal
    openModal (isNew, item) {
      // console.log(isNew, item)
      if (isNew) {
        // 新增按鈕專用，傳入true，會執行
        this.tempProduct = {} // 清空tempProduct
      } else {
        // 編輯按鈕專用 // 如果參數傳入false，則執行else
        this.tempProduct = { ...item } // 把資料帶出來 // ... = 用來展開形式把資料給取出來
      }
      this.isNew = isNew // 傳入的參數 傳到 本地端this.isNew

      // 透過ref取得的DOM元素打開modal
      const productComponent = this.$refs.productModal
      productComponent.showModal()
    },

    // 儲存內層傳進來的資料
    updateProduct (item) {
      // 1.以this.updateProduct把內層ProductModal傳進來的資料儲存起來
      this.tempProduct = item
      // updateProduct 透過 isNew 去判斷目前是新增還是編輯，來決定要打新增的 API 或是編輯的 API

      // 新增的 API // 不做if判斷 // 原const改let宣告，以利後面的變數蓋過前面
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`
      let httpMethod = 'post'

      // 編輯的 API // 增加if判斷式 // 不是新增產品的狀態下，重新調整api路徑(增加item.id)
      // this.isNew 為 false 時，返回 true，進而決定編輯的API
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`
        httpMethod = 'put'
      }
      // 之所以「!this.isNew」為true時，條件成立，進入執行區塊，是因為這個「true」就是if判斷條件成立不成立的依據，跟新增編輯狀態沒什麼關係

      const productComponent = this.$refs.productModal

      // 2.將本地端儲存起來的資料(this.tempProduct)發送到遠端
      // 中括號[]可載入方法post或put // 原this.$http.post/put 改為this.$http[httpMethod]
      this.$http[httpMethod](api, { data: this.tempProduct }).then(
        (response) => {
          // console.log(response)
          // 3.確認（儲存）資料後，關閉modal
          productComponent.hideModal()
          // 4.觸發getProducts()來重新渲染畫面（重新取得列表資料）
          // this.getProducts()
          // 更新產品時，會判斷是成功還是失敗
          if (response.data.success) {
            // this.getProducts()
            // this.$router.go(0)
            this.emitter.emit('push-message', {
              // 成功時，觸發emitter
              style: 'success',
              title: '更新成功'
            })
            this.getProducts()
          } else {
            this.emitter.emit('push-message', {
              // 失敗時，觸發emitter
              style: 'danger',
              title: '更新失敗',
              content: response.data.message.join('、') // 訊息內容是從後端傳進來，使用join方式把陣列一一取出來，中間以頓號區隔，並傳到content
            })
          }
        }
      )
    },
    // 開啟刪除 Modal
    openDelProductModal (item) {
      this.tempProduct = { ...item } // ... 以展開方式把要刪除的當前的產品資料取出來
      // const delProduct = this.tempProduct
      // console.log(delProduct) // 測試有沒有成功取出產品資料
      const delComponent = this.$refs.delModal // 打開刪除modal
      delComponent.showModal()
    },
    delProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`
      this.$http.delete(url).then((response) => {
        // console.log(response.data)
        const delComponent = this.$refs.delModal
        delComponent.hideModal() // 確認(刪除)資料後，關閉modal
        this.getProducts() // 觸發getProducts來重新渲染畫面
      })
    }
  },
  watch: {
    categoryName (n, o) {
      // 監聽到categoryName有變化時，才會呼叫getProducts()函式
      // 沒設定監聽，永遠不會呼叫getProducts()函式，只有重新整理才會呼叫
      // console.log(n, o)
      if (n === '' || o === '') {
        // || 或 、 && 且
        this.getProducts()
      }
    }
    // 若沒設定監聽，將只執行computed，getProducts()、setPagination()不會被執行
    // 有設定監聽，computed、getProducts()、setPagination()都會執行
    // 此函式邏輯是初始化後第一次按有類別名稱按鈕，console.log會顯示（ 新參數 ,    )，會執行if判斷式
    // 再次按下一個有類別名稱的按鈕，就不會再執行if判斷式，因爲新參數n、舊參數o都非空值，但是不影響，因為早在第一次就已將this.pagination設定為空值了
  },
  computed: {
    // 類別篩選 // productsFilter沒有定義在data裡，直接用Computed來運算出來
    productsFilter () {
      // console.log('productsFilter123')
      return this.products.filter((item) => {
        return item.category.match(this.categoryName) // 篩選到的類別儲存到本地端productsFilter
      })
    }
  },
  created () {
    this.getProducts() // 觸發methods
  }
}
</script>
