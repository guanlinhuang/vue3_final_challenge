<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center" style="width: 100%;">
      <li class="page-item hidePrevButton" :class="{ 'disabled': !pages.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="updatePage(pages.current_page - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item page_bottom"
        v-for="page in pages.total_pages"
        :key="page"
        :class="{ active: page === pages.current_page }"
      >
        <!--若當前頁碼與資料庫傳來的頁碼相同，則會顯示深藍色
        active 設定按鈕顯示深藍色樣式(bootstrap)，可知道當前頁面是哪一頁
        前者page是名稱自定義，後者pages是後端資料傳來 -->
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item hideNextButton" :class="{ 'disabled': !pages.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="updatePage(pages.current_page + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
  props: ['pages'],
  methods: {
    updatePage (page) {
      this.$emit('emit-pages', page)
    }
  }
}
</script>
