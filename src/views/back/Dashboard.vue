<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <NavbarBack></NavbarBack>
    <div class="container-fluid mt-3 position-relative">
        <ToastMessages></ToastMessages>
        <router-view></router-view>
    </div>
</template>

<script>
import emitter from '@/methods/emitter' // mitt跨元件資料傳遞 // 在Dashboard.vue中僅需載入一次mitt，可讓所有元件都可以使用到mitt功能
import ToastMessages from '@/components/ToastMessages.vue' // 吐司訊息
import NavbarBack from '@/components/Navbar_back.vue' // 導覽列

export default {
  components: {
    NavbarBack,
    ToastMessages
  },
  provide () { // 本外層元件加入provide // 可讓內層元件(加入inject)可以使用本外層元件的mitt套件功能
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1') // 取出token
    // console.log(token)
    this.$http.defaults.headers.common.Authorization = `${token}` // 夾帶token到header

    const api = `${process.env.VUE_APP_API}api/user/check` // 確認是否維持登入狀態
    this.$http.post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login') // 若已登出狀態下，將跳轉到登入頁面
        //   console.log(res)
        }
      })
  }
}

</script>
