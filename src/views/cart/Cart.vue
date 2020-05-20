<template>
  <div id="cart">
    <cart-nav-bar></cart-nav-bar>
    <cart-list :cartList="cartList" class="cart-list"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>
<script>
import CartNavBar from "./childComps/CartNavBar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";
import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList,
    BottomBar
  },
  computed: {
    ...mapGetters(["cartList"])
  }
};
</script>
<style lang="less" scoped>
#cart {
  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
}
</style>