<template>
  <NavbarFront></NavbarFront>
  <div class="HomeView">
    <router-view></router-view>
    <ToastMessages></ToastMessages>
    <SmallSidebar></SmallSidebar>
  </div>
  <FooterFront></FooterFront>
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import NavbarFront from '@/components/Navbar_front.vue'
import FooterFront from '@/components/Footer_front.vue'
import SmallSidebar from '@/components/SmallSidebar'

export default {
  components: {
    ToastMessages,
    NavbarFront,
    FooterFront,
    SmallSidebar
  },
  provide () {
    return {
      emitter
    }
  },
  created () {
  }
}

</script>
