<template>
  <nav-bar class="cart-nav-bar">
    <div slot="center" class="nav-center">购物车({{cartCount}})</div>
  </nav-bar>
</template>
<script>
import { mapGetters } from "vuex";
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(["cartCount"])
  }
};
</script>
<style lang="less" scoped>
.cart-nav-bar {
  background-color: #1296db;
  .nav-center {
    color: white;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>