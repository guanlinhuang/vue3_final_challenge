<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center" style="width: 100%">
      <li
        class="page-item hidePrevButton"
        :class="{ disabled: !pages.has_pre }"
      >
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
        <a class="page-link" href="#" @click.prevent="updatePage(page)">
          {{ page }}
        </a>
      </li>
      <li
        class="page-item hideNextButton"
        :class="{ disabled: !pages.has_next }"
      >
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
export default {
  props: ["pages"],
  methods: {
    updatePage(page) {
      this.$emit("emit-pages", page);
    },
  },
};
</script>
