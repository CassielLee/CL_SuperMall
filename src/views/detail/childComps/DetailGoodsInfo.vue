<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length!==0">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img
        v-for="(img,index) in detailInfo.detailImage[0].list"
        :key="index"
        v-lazy='img'
        alt="detailImg"
        @load="imageLoad"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object
    }
  },
  methods: {
    imageLoad() {
      this.$emit("detailImageLoad");
    }
  }
};
</script>
<style lang="less" scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
  .info-desc {
    padding: 0 15px;
    .start,
    .end {
      width: 90px;
      height: 1px;
      background-color: #a3a3a5;
      position: relative;
    }
    .start {
      float: left;
    }
    .end {
      float: right;
      &::after {
        right: 0;
      }
    }
    .start::before,
    .end::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: #333;
      bottom: 0;
    }
    .desc {
      padding: 15px 0;
      font-size: 14px;
    }
  }
  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 16px;
  }
  .info-list {
    img {
      width: 100%;
    }
  }
}
</style>