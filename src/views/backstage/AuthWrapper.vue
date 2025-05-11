<template>
  <Loading :active="isChecking">
    <section><span class="loader-18"></span></section>
  </Loading>
  <component v-if="!isChecking" :is="component" />
</template>

<script>
import axios from "axios";

export default {
  props: {
    component: Object,
  },
  data() {
    return {
      isChecking: true,
    };
  },
  async created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      this.$router.replace("/login");
      return;
    }

    axios.defaults.headers.common.Authorization = token;

    try {
      const api = `${process.env.VUE_APP_API}api/user/check`;
      const res = await axios.post(api);

      if (!res.data.success) {
        this.$router.replace("/login");
      } else {
        this.isChecking = false;
      }
    } catch (error) {
      console.error("驗證失敗", error);
      this.$router.replace("/login");
    }
  },
};
</script>
