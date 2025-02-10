<!-- <template>
  <Loading :active="isLoading"
  ><section><span class="loader-18"></span></section
></Loading>
  <div class="position-relative bg-cover">
    <div class="favoritebanner">
      <h2 class="position-absolute h2 fw-bold favoritebanner-text">喜愛清單</h2>
    </div>
  </div>
  <div class="container mt-4 h100" v-if="favoriteProduct.length">
    <table class="table table-striped table-hover align-middle table-layout">
      <thead>
        <tr class="text-center align-middle bgcolor">
          <th scope="col" class="d-none d-md-block border-bottom-0"></th>
          <th scope="col">名稱</th>
          <th scope="col">金額</th>
          <th scope="col">加入購物車</th>
          <th scope="col">刪除</th>
        </tr>
      </thead>
      <tbody class="align-middle text-center">
        <tr class="align-middle" v-for="item in favoriteProduct" :key="item.id">
          <td class="align-middle d-none d-md-block">
            <img class="productImg" :src="item.imageUrl" :alt="item.title" :title="item.title" />
          </td>
          <td class="align-middle h4 fw-bold textover">{{ item.title }}</td>
          <td class="align-middle">
            <p v-if="item.price == item.origin_price" class="fs-5 m-0 fw-bold">${{ $filters.currency(item.origin_price) }}</p>
            <p v-if="!(item.price == item.origin_price)" class="text-danger fw-bold m-0 fs-5">
              ${{ $filters.currency(item.price) }}
            </p>
            <p v-if="!(item.price == item.origin_price)" class="text-decoration-line-through m-0 text-muted fs-6">
              ${{ $filters.currency(item.origin_price) }}
            </p>
          </td>
          <td class="align-middle">
            <button type="button" class="btn d-md-block mx-auto btnShop" @click="addToCart(item.id, 1)">
              <i class="bi bi-cart-plus-fill h4" />
            </button>
          </td>
          <td class="align-middle">
            <button type="button" class="btn d-md-block mx-auto btnShop" @click="removeFavorite(item)">
              <i class="bi bi-trash h4" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="container-fluid d-flex justify-content-center align-items-center h100" v-else>
    <div class="text-center">
      <i class="bi bi-bag-heart display-1 fw-bold text-dark" />
      <h3 class="p-3">目前喜愛清單還沒有商品唷</h3>
      <router-link to="/product" class="btn btn-outline-dark btn-lg mb-5">來去逛逛</router-link>
    </div>
  </div>
  <SmallSidebar ref="smallSidebar" :cartss="carts"></SmallSidebar>
</template> -->
