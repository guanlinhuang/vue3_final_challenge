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
                  <img :src="`${item.imageUrl}`" :alt="item.title" class="object-fit-cover" />
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
      categoryName: '',
      isActive: 1,
      pagination: {},
      carts: [],
      isLoading: false,
      currentPage: ''
    }
  },
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products/all`
      this.$http.get(url).then((response) => {
        if (!response.data.success) {
          this.isLoading = false
          return
        }
        this.products = response.data.products
        const { categoryName } = this.$route.params
        if (categoryName) {
          this.categoryName = categoryName
        }
        if (this.categoryName !== '') {
          this.pagination = {}
        } else {
          this.setPagination(page)
          this.updateCategory()
        }
        this.isLoading = false
      })
        .catch((err) => {
          this.$httpMessageState(err, '連線錯誤，請再試一次')
          this.isLoading = false
        })
    },
    setPagination (page = 1) {
      const perPage = 10
      this.pagination = {
        total_pages: Math.ceil(this.products.length / perPage),
        current_page: page,
        has_pre: page !== 1,
        has_next: false,
        category: null
      }
      if (this.pagination.current_page >= this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages
        this.pagination.has_next = false
      } else {
        this.pagination.has_next = true
      }
      const minPage = this.pagination.current_page * perPage - perPage
      const maxPage = this.pagination.current_page * perPage
      this.products = this.products.slice(minPage, maxPage)
    },
    updateCategory (category) {
      this.$router.push({
        name: '所有商品列表',
        params: { categoryName: category }
      })
    },
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        this.carts = response.data.data.carts
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
    },
    getProductPage (id) {
      this.$router.push(`/products/${id}`)
    },
    changeClass (index) {
      this.isActive = index
    }
  },

  watch: {
    categoryName (n, o) {
      if (n === '' || o === '') {
        this.getProducts()
      }
    }
  },

  computed: {
    productsFilter () {
      return this.products.filter((item) => {
        return item.category.match(this.categoryName)
      })
    }
  },

  created () {
    this.getProducts()
  }
}
</script>
