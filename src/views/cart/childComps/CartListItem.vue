<template>
  <div id="cart-item">
    <div class="item-selector">
      <check-button v-model="itemInfo.checked" @checkBtnClick="checkBtnClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="itemInfo.imgUrl" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥ {{itemInfo.newPrice}}</div>
        <div class="item-count right">x {{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import CheckButton from "./CheckButton";
export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkBtnClick() {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
};
</script>
<style lang="less" scoped>
#cart-item {
  width: 100%;
  display: flex;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  .item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item-info {
    font-size: 18px;
    color: #333333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
    .item-desc {
      font-size: 14px;
      color: #666;
      margin-top: 15px;
    }
    .item-title,
    .item-desc {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .item-img {
    padding: 5px;
    img {
      width: 80px;
      height: 100px;
      display: block;
      border-radius: 5px;
    }
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
    display: flex;
    justify-content: space-between;
    .item-price {
      color: orangered;
      display: inline-block;
    }
    .item-count {
      display: inline-block;
      margin-right: 15px;
    }
  }
}
</style>