<template>
  <div class="bottom-menu">
    <check-button class="select-all" @checkBtnClick="clickToSelectAll" v-model="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计：￥{{totalPrice}}</span>
    <span class="buy-product" @click="goToCompute">去计算({{totalCount}})</span>
  </div>
</template>
<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      // const cartList = this.$store.getters.cartList;
      return this.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preVal, cur) => {
          return preVal + cur.count * cur.newPrice;
        }, 0)
        .toFixed(2);
    },
    totalCount() {
      const checkedCartList = this.cartList.filter(item => item.checked);
      return checkedCartList ? checkedCartList.length : 0;
    },
    isSelectAll() {
      return this.cartList.every(item => item.checked);
    }
  },
  methods: {
    clickToSelectAll() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },
    goToCompute() {
      if (!this.totalCount) {
        this.$toast.showToast("请至少选择一个商品~", 1500);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-menu {
  width: 100%;
  height: 44px;
  background-color: #eee;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 35px;
  box-sizing: border-box;
  .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }
  .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
  .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
}
</style>