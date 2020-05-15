<template>
  <div class="recommend">
    <div v-for="(recommend,index) in recommendList" :key="index" class="recommend-item">
      <a :href="recommend.link">
        <img :src="recommend.image" :alt="index" class="recommend-item-img" />
        <div class="recommend-item-txt">{{recommend.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommendView",
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style lang="less" scoped>
.recommend {
  display: flex;
  flex-direction: row;
  padding: 8px 0 10px;
  border-bottom: 8px solid #eee;
  .recommend-item {
    flex: 1;
    text-align: center;
    a {
      text-decoration: none;
    }
    .recommend-item-img {
      width: 65px;
      height: 65px;
    }
    .recommend-item-txt {
      font-size: 14px;
      color: #555;
      margin-top: 3px;
    }
  }
}
</style>