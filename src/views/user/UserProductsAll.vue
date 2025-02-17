<template>
  <Loading :active="isLoading"><section><span class="loader-18"></span></section></Loading>
  <div class="container products_all mainContainer">
    <div class="row justify-content-center">
       <div class="d-lg-none w-100 menu fixed-top px-0">
        <ul
          class="d-flex mb-0 menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4 text-center ps-0"
          >
          <li class="border-bottom p-2" :class="{ active: isActive === 1 }">
            <a href="#"
               data-text="全部商品"
              @click.prevent="
                (categoryName = ''), updateCategory(''), changeClass(1)
              "
              :class="{ active: isActive === 1 }"
            >
              全部商品
          </a>
          </li>
          <li class="border-bottom p-2" :class="{ active: isActive === 2 }">
            <a href="#" data-text="咖啡"
              @click.prevent="
                (categoryName = '咖啡'), updateCategory('咖啡'), changeClass(2)
              "
              :class="{ active: isActive === 2 }"
            >
            咖啡
          </a>
          </li>
          <li class="border-bottom p-2" :class="{ active: isActive === 3 }">
            <a href="#" data-text="果汁"
              @click.prevent="
                (categoryName = '果汁'),
                  updateCategory('果汁'),
                  changeClass(3)
              "
              :class="{ active: isActive === 3 }"
            >
            果汁
          </a>
          </li>
          <li class="border-bottom p-2" :class="{ active: isActive === 4 }">
            <a href="#" data-text="冰沙"
              @click.prevent="
                (categoryName = '冰沙'),
                  updateCategory('冰沙'),
                  changeClass(4)
              "
              :class="{ active: isActive === 4 }"
            >
            冰沙
          </a>
          </li>
          <li class="border-bottom p-2" :class="{ active: isActive === 5 }">
            <a href="#" data-text="甜點"
              @click.prevent="
                (categoryName = '甜點'),
                  updateCategory('甜點'),
                  changeClass(5)
              "
              :class="{ active: isActive === 5 }"
            >
            甜點
          </a>
          </li>
          <li class="border-bottom p-2" :class="{ active: isActive === 6 }">
            <a href="#" data-text="組合餐"
              @click.prevent="
                (categoryName = '組合餐'), updateCategory('組合餐'), changeClass(6)
              "
              :class="{ active: isActive === 6 }"
            >組合餐
          </a>
          </li>
        </ul>
      </div>
      <div class="d-none d-lg-block col-2 mt-5 pe-5 d-flex flex-row-reverse">
        <ul
          class="menu-hover-fill flex flex-col items-start leading-none text-2xl uppercase space-y-4"
        >
          <li class="mb-2">
            <a href="#"
               data-text="全部商品"
              @click.prevent="
                (categoryName = ''), updateCategory(''), changeClass(1)
              "
              :class="{ active: isActive === 1 }"
            >
              全部商品
          </a>
          </li>
          <li class="mb-2">
            <a href="#" data-text="咖啡"
              @click.prevent="
                (categoryName = '咖啡'), updateCategory('咖啡'), changeClass(2)
              "
              :class="{ active: isActive === 2 }"
            >
            咖啡
          </a>
          </li>
          <li class="mb-2">
            <a href="#" data-text="果汁"
              @click.prevent="
                (categoryName = '果汁'),
                  updateCategory('果汁'),
                  changeClass(3)
              "
              :class="{ active: isActive === 3 }"
            >
            果汁
          </a>
          </li>
          <li class="mb-2">
            <a href="#" data-text="冰沙"
              @click.prevent="
                (categoryName = '冰沙'),
                  updateCategory('冰沙'),
                  changeClass(4)
              "
              :class="{ active: isActive === 4 }"
            >
            冰沙
          </a>
          </li>
          <li class="mb-2">
            <a href="#" data-text="甜點"
              @click.prevent="
                (categoryName = '甜點'),
                  updateCategory('甜點'),
                  changeClass(5)
              "
              :class="{ active: isActive === 5 }"
            >
            甜點
          </a>
          </li>
          <li class="mb-2">
            <a href="#" data-text="組合餐"
              @click.prevent="
                (categoryName = '組合餐'), updateCategory('組合餐'), changeClass(6)
              "
              :class="{ active: isActive === 6 }"
            >組合餐
          </a>
          </li>
        </ul>
      </div>
      <div class="col col-lg-9 mt-lg-5" style="margin-top: 45px;">
        <div class="row row-cols-2 row-cols-lg-5 gx-2 gx-lg-4 p-1 p-lg-0">
          <div class="col mb-4" v-for="item in productsFilter" :key="item.id">
            <div class="position-relative text-center product h-100">
              <a @click="getProductPage(item.id)">
                <div
                  v-if="item.origin_price !== item.price"
                  class="onSale position-absolute text-white bg-danger py-1 px-3"
                  style="z-index: 5"
                >
                  特 價
                </div>
                <div class="product_img">
                  <img :src="`${item.imageUrl}`" class="object-fit-cover" />
                </div>
                <p class="my-1 fw-normal">{{ item.title }}</p>
                <div class="price text-center">
                  <div v-if="item.origin_price !== item.price">
                    <p class="mb-1 text-danger">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price === item.price">
                    <p class="mb-1">NT$ {{ item.price }}</p>
                  </div>
                  <div v-if="item.origin_price !== item.price">
                    <p
                      class="product_origin_price mb-1 text-decoration-line-through"
                      style="font-size: 13px"
                    >
                      NT$ {{ item.origin_price }}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center justify-content-lg-center">
          <!-- 前內後外 -->
          <Pagination :pages="pagination" @emit-pages="getProducts" />
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      products: [],
      categoryName: '', // 篩選名稱
      isActive: 1, // 篩選資料按鈕用
      pagination: {}, // 每個分頁的產品資料
      carts: [], // 用於側邊欄購物車標籤
      isLoading: false,
      currentPage: ''
    }
  },
  components: {
    // 區域註冊
    Pagination
    // SmallSidebar
  },
  methods: {
    getProducts (page = 1) {
      // 取得商品列表_all
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all` // *** api改${}
      this.$http.get(url).then((response) => {
        if (!response.data.success) {
          this.isLoading = false
          return
        }
        this.products = response.data.products
        const { categoryName } = this.$route.params // 取值分類名稱作為變數名稱
        if (categoryName) {
          this.categoryName = categoryName // 儲存於本地端this.categoryName
        }
        if (this.categoryName !== '') {
          // 跟前面的if一起執行，按到有類別名稱的按鈕，頁碼消失  // 不要輸入else if，頁碼不會消失
          this.pagination = {}
        } else { // 初始化(還沒篩選分類時)
          this.setPagination(page)
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
      } else {
        this.pagination.has_next = true // 當前頁碼小於總頁數，回傳true，下一頁按鈕可使用(顯示按鈕)
      }
      // 每頁呈現商品數的計算公式
      const minPage = this.pagination.current_page * perPage - perPage
      const maxPage = this.pagination.current_page * perPage
      this.products = this.products.slice(minPage, maxPage) // 從minPage起始位置開始往後刪除maxPage個商品(含起始位置)
    },
    updateCategory (category) { // 路由路徑增加 分類名稱 // 更換新的網址後可跳回瀏覽器頂部
      this.$router.push({
        name: '所有商品列表',
        params: { categoryName: category } // 值 可透過params加入到 index.js路由products後面的/:categoryName? 路由
      })
    },
    getCart () {
      // 取得購物車列表 // 用於側邊欄購物車標籤
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    getProductPage (id) {
      // 取得某一商品id，並導到該商品獨立頁面
      this.$router.push(`/products/${id}`)
    },
    changeClass (index) { // 改變isActive的值
      this.isActive = index
    }
  },

  watch: {
    categoryName (n, o) {
      // 監聽到categoryName有變化時，才會呼叫getProducts()函式
      // 沒設定監聽，永遠不會呼叫getProducts()函式，只有重新整理才會呼叫
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
      return this.products.filter((item) => {
        return item.category.match(this.categoryName) // 篩選到的類別儲存到本地端productsFilter
      })
    }
  },

  created () {
    this.getProducts()
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

<!-- overflow-x: scroll 強制顯示水平滾動條，無論內容是否超出容器寬度。這通常用於確保用戶能夠在內容過多時水平滾動來查看隱藏的部分 -->
