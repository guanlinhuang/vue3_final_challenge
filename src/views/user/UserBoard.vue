<template>
  <NavbarFront />
  <div class="HomeView">
    <RouterView />
    <ToastMessages />
    <SmallSidebar />
  </div>
  <FooterFront />
</template>

<script>
import emitter from '@/methods/emitter'
import ToastMessages from '@/components/ToastMessages.vue'
import NavbarFront from '@/components/NavbarFront.vue'
import FooterFront from '@/components/FooterFront.vue'
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
