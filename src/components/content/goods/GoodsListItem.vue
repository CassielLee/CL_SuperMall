<template>
  <div class="good-item" @click="goodsItemClick(good.iid || good.item_id)">
    <img :src="getImg" :alt="good.iid" @load="imageLoad" :key="getImg" />
    <div class="good-info">
      <p>{{good.title}}</p>
      <span class="price">￥{{good.price}}</span>
      <span class="collect">{{good.cfav}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("imageLoad");
    },
    goodsItemClick(goodID) {
      console.log("点击good", goodID);
      this.$router.push(`/detail/${goodID}`);
    }
  },
  computed: {
    getImg() {
      return this.good.img || this.good.image || this.good.show.img;
    }
  }
};
</script>
<style lang="less" scoped>
.good-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  text-align: center;
  img {
    width: 100%;
    border-radius: 5px;
    height: 227px;
  }
  .good-info {
    font-size: 14px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: deepskyblue;
      margin-right: 23px;
    }
    .collect {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: -15px;
        top: 2px;
        width: 14px;
        height: 14px;
        background-image: url("~assets/img/common/collect.png");
        background-position: center;
        background-size: 14px 14px;
      }
    }
  }
}
</style>