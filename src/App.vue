<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button type="button" class="btn btn-primary">Primary</button>
  </nav> -->
  <router-view/>
</template>

<style lang="scss">

// @import '../node_modules/bootstrap/'; //先在終端npm i bootstrap@5.3.3，如安裝失敗可加「 --legacy-peer-deps 」，再import bootstrap

@import "./assets/all.scss";

// nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }

</style>
