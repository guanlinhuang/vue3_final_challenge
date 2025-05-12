<template>
  <div v-if="isLoading" class="loading-overlay">
    <section>
      <span class="loader-18"></span>
    </section>
  </div>
  <RouterView />
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  mounted() {
    window.addEventListener("start-loading", this.startLoading);
    window.addEventListener("stop-loading", this.stopLoading);
  },
  unmounted() {
    window.removeEventListener("start-loading", this.startLoading);
    window.removeEventListener("stop-loading", this.stopLoading);
  },
  methods: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/all.scss";
</style>
