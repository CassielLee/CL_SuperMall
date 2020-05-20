<template>
  <nav-bar class="detail-nav-bar">
    <div slot="left" class="nav-left" @click="goBack">
      <img src="~assets/img/common/zuo.png" alt="left-arrow" />
    </div>
    <div slot="center" class="nav-center">
      <span
        v-for="(title,index) in titles"
        :key="index"
        class="title-item"
        :class="{active:currentIndex===index}"
        @click="titleClick(index)"
      >{{title}}</span>
    </div>
  </nav-bar>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
.detail-nav-bar {
  background: aliceblue;
  text-align: center;
  line-height: 44px;
  border-bottom: 1px solid gainsboro;
  .nav-left {
    // padding-top: 7px;
    img {
      width: 20px;
      height: 20px;
      margin-top: 12px;
    }
  }
  .nav-center {
    display: flex;
    .title-item {
      flex: 1;
      &.active {
        color: #1296db;
      }
    }
  }
}
</style>