<template>
  <div class="recommend-info" v-if="recommendList.length">
    <div class="info-header">热门推荐</div>
    <grid-view :vMargin="3" :hMargin="3">
      <goods-list-item v-for="(good,index) in recommendList" :key="index" :good="good"></goods-list-item>
    </grid-view>
  </div>
</template>
<script>
import GridView from "components/common/gridView/GridView";
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "DetailRecommendInfo",
  components: {
    GridView,
    GoodsListItem
  },
  props: {
    recommendList: {
      type: Array
    }
  }
};
</script>
<style lang="less" scoped>
.recommend-info {
  padding: 5px;
  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 16px;
    color: #333;
  }
}
</style>