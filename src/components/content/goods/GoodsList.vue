<template>
  <div class="goods" v-if="goodsList.length">
    <goods-list-item v-for="good in goodsList" :key="good.iid" :good="good" class="goods-item"></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
import GoodsList from "components/content/goods/GoodsList";
export default {
  name: "GoodsList",
  props: {
    goodsList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  }
};
</script>
<style lang="less" scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}
</style>