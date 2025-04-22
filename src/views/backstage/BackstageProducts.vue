<template>
  <Loading :active="isLoading"
    ><section><span class="loader-18"></span></section
  ></Loading>
  <div class="container py-5 mx-auto">
    <h3 class="text-center">產品列表</h3>
    <div
      class="category_btn my-4 my-lg-5 row row-cols-2 row-cols-lg-6 gx-1 gx-lg-3 mx-1 mx-lg-0"
    >
      <div class="col">
        <button
          type="button"
          class="btnHover2 w-100 mb-1 mb-lg-0"
          value="全部商品"
          data-text="全部商品"
          @click.prevent="
            (categoryName = ''), updateCategory(''), changeClass(1)
          "
          :class="{ active: categoryName === '' }"
        >
          全部商品<span></span><span></span><span></span><span></span>
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          class="btnHover2 w-100 mb-1 mb-lg-0"
          data-text="咖啡"
          @click.prevent="
            (categoryName = '咖啡'), updateCategory('咖啡'), changeClass(2)
          "
          :class="{ active: isActive === 2 }"
          value="咖啡"
        >
          咖啡<span></span><span></span><span></span><span></span>
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          class="btnHover2 w-100 mb-1 mb-lg-0"
          data-text="果汁"
          @click.prevent="
            (categoryName = '果汁'), updateCategory('果汁'), changeClass(3)
          "
          :class="{ active: isActive === 3 }"
          value="果汁"
        >
          果汁<span></span><span></span><span></span><span></span>
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          class="btnHover2 w-100 mb-1 mb-lg-0"
          data-text="冰沙"
          @click.prevent="
            (categoryName = '冰沙'), updateCategory('冰沙'), changeClass(4)
          "
          :class="{ active: isActive === 4 }"
          value="冰沙"
        >
          冰沙<span></span><span></span><span></span><span></span>
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          class="btnHover2 w-100 mb-1 mb-lg-0"
          data-text="甜點"
          @click.prevent="
            (categoryName = '甜點'), updateCategory('甜點'), changeClass(5)
          "
          :class="{ active: isActive === 5 }"
          value="甜點"
        >
          甜點<span></span><span></span><span></span><span></span>
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          class="btnHover2 w-100 mb-1 mb-lg-0"
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
    </div>
    <div class="text-end mx-2 mx-lg-3 px-lg-4">
      <button type="button" class="btnHover btnHover5" @click="openModal(true)">
        <div>
          <span>新增產品</span>
          <span>新增產品</span>
        </div>
      </button>
    </div>
    <div class="row">
      <div class="col-lg-9 mx-auto d-none d-lg-block">
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
                    :alt="item.title"
                    class="w-100 h-100 object-fit-cover"
                  />
                </div>
              </td>
              <td class="align-top text-start">{{ item.title }}</td>
              <td class="text-right">
                ${{ $filters.currency(item.origin_price) }}
              </td>
              <td class="text-right">${{ $filters.currency(item.price) }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span class="text-danger" v-else>未啟用</span>
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
      <div class="col d-lg-none">
        <div
          class="row mx-2 my-3 p-2 border rounded-3 d-flex"
          v-for="item in productsFilter"
          :key="item.id"
        >
          <div class="col-3 p-0 pe-1">
            <div style="width: 100%; height: 140px">
              <img
                :src="item.imageUrl"
                :alt="item.title"
                class="w-100 h-100 object-fit-cover rounded-start"
              />
            </div>
          </div>
          <div class="col-9 p-0 ps-1">
            <div class="d-flex align-items-center mb-2">
              <p class="border border-dark p-1 mb-0">
                {{ item.category }}
              </p>
              <p class="mb-0 mx-2">{{ item.title }}</p>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm ms-auto"
                @click="openDelProductModal(item)"
              >
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <p class="mb-0">
              原價 ${{ $filters.currency(item.origin_price)
              }}<span class="ms-4"
                >售價 ${{ $filters.currency(item.price) }}</span
              >
            </p>
            <div class="d-flex mt-4">
              <p>
                <span class="text-success" v-if="item.is_enabled">啟用</span>
                <span class="text-danger" v-else>未啟用</span>
              </p>
              <button
                type="button"
                class="btnHover p-0 ms-auto"
                style="min-width: 100px"
                @click="openModal(false, item)"
              >
                <div>
                  <span>編輯</span>
                  <span>編輯</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    <ProductModal
      ref="productModal"
      :product="tempProduct"
      @update-product="updateProduct"
    ></ProductModal>
    <DelModal :item="tempProduct" ref="delModal" @del-item="delProduct" />
  </div>
</template>

<script>
import ProductModal from "@/components/ProductModal.vue";
import DelModal from "@/components/DelModal.vue";
import Pagination from "@/components/PagePagination.vue";

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      categoryName: "",
      isActive: 1,
      currentPage: "",
      category: {},
    };
  },
  components: {
    ProductModal,
    DelModal,
    Pagination,
  },
  inject: ["emitter"],
  methods: {
    getProducts(page = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products/all`;
      this.$http
        .get(url)
        .then((response) => {
          if (!response.data.success) {
            this.isLoading = false;
            return;
          }
          this.products = Object.values(response.data.products);
          this.isLoading = false;
          const { categoryName } = this.$route.params;
          if (categoryName) {
            this.categoryName = categoryName;
          }
          if (this.categoryName !== "") {
            this.pagination = {};
          } else {
            this.setPagination(page);
            this.updateCategory();
          }
          this.isLoading = false;
        })
        .catch((err) => {
          this.$httpMessageState(err, "連線錯誤，請再試一次");
          this.isLoading = false;
        });
    },
    setPagination(page = 1) {
      const perPage = 10;
      this.pagination = {
        total_pages: Math.ceil(this.products.length / perPage),
        current_page: page,
        has_pre: page !== 1,
        has_next: false,
        category: null,
      };
      if (this.pagination.current_page >= this.pagination.total_pages) {
        this.pagination.current_page = this.pagination.total_pages;
        this.pagination.has_next = false;
      } else {
        this.pagination.has_next = true;
      }
      const minPage = this.pagination.current_page * perPage - perPage;
      const maxPage = this.pagination.current_page * perPage;
      this.products = this.products.slice(minPage, maxPage);
    },
    updateCategory(category) {
      this.$router.push({
        name: "產品列表",
        params: { categoryName: category },
      });
    },
    changeClass(index) {
      this.isActive = index;
    },

    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = JSON.parse(JSON.stringify(item));
      }
      this.isNew = isNew;

      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },

    updateProduct(item) {
      this.tempProduct = item;
      // 新增狀態
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = "post";

      // 編輯狀態
      if (!this.isNew) {
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = "put";
      }

      // 依據新增或編輯狀態執行相對應的方法
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct })
        .then((response) => {
          productComponent.hideModal();
          if (response.data.success) {
            this.emitter.emit("push-message", {
              style: "success",
              title: "更新成功",
            });
            this.getProducts();
          } else {
            this.emitter.emit("push-message", {
              style: "danger",
              title: "更新失敗",
              content: response.data.message.join("、"),
            });
          }
        })
        .catch((error) => {
          this.$httpMessageState(error, "連線錯誤");
        });
    },
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    delProduct() {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http
        .delete(url)
        .then((response) => {
          const delComponent = this.$refs.delModal;
          delComponent.hideModal();
          this.getProducts();
        })
        .catch((error) => {
          this.$httpMessageState(error, "連線錯誤");
        });
    },
  },
  watch: {
    categoryName(n, o) {
      if (n === "" || o === "") {
        this.getProducts();
      }
    },
  },
  computed: {
    productsFilter() {
      return this.products.filter((item) => {
        return item.category.match(this.categoryName);
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
