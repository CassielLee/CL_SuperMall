<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div @click="addToCollect">
        <i class="icon select" :class="{active:isCollect}"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy" @click="goToBuy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {
      isCollect: false
    };
  },
  methods: {
    addToCart() {
      this.$emit("addToCart");
    },
    addToCollect() {
      this.isCollect = !this.isCollect;
    },
    goToBuy() {
      this.$emit("goToBuy");
    }
  }
};
</script>
<style lang="less" scoped>
.bottom-bar {
  height: 58px;
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  text-align: center;
  .bar-item {
    flex: 1;
    display: flex;
    div {
      flex: 1;
    }
    &.bar-left {
      .text {
        font-size: 14px;
      }
      .icon {
        display: block;
        width: 22px;
        height: 22px;
        margin: 10px auto 3px;
        background-image: url("~assets/img/detail/detail_bottom.png");
        background-position: center;
        background-size: 100%;
        &.service {
          background-position: 0 -53px;
        }
        &.shop {
          background-position: 0 -98px;
        }
        &.select {
          background-position: 0 0;
          &.active {
            background-position: 0 -27px;
          }
        }
      }
    }
    &.bar-right {
      font-size: 16px;
      color: #fff;
      line-height: 58px;
      .cart {
        background-color: orchid;
        color: #333;
      }
      .buy {
        background-color: #1296db;
      }
    }
  }
}
</style>