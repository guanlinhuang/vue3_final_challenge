<template>
  <NavbarBack />
  <div class="backstage">
    <ToastMessages />
    <RouterView />
  </div>
</template>

<script>
import emitter from "@/methods/emitter";
import ToastMessages from "@/components/ToastMessages.vue";
import NavbarBack from "@/components/NavbarBack.vue";

export default {
  components: {
    NavbarBack,
    ToastMessages,
  },
  provide() {
    return {
      emitter,
    };
  },
};
</script>
