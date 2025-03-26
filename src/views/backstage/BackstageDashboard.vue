<template>
  <NavbarBack />
    <div class="backstage">
        <ToastMessages />
        <RouterView />
    </div>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import NavbarBack from '@/components/NavbarBack.vue'

export default {
  components: {
    NavbarBack,
    ToastMessages
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = `${token}`

    const api = `${process.env.VUE_APP_API}api/user/check`
    this.$http.post(api, this.user)
      .then((res) => {
        if (!res.data.success) {
          this.$router.push('/login')
        }
      }).catch((error) => {
        this.$httpMessageState(error, '連線錯誤')
      })
  }
}
</script>
