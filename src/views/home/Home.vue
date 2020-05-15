<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" class="nav-center">购物街</div>
    </nav-bar>
    <home-swiper :bannerList="bannerList" ref="homeSwiper"></home-swiper>
    <home-recommend-view :recommendList="recommendList"></home-recommend-view>
    <home-feature-view class="home-feature"></home-feature-view>
    <tab-control :titles="titles" class="home-tab-control"></tab-control>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";
import TabControl from "components/content/tabControl/TabControl";
import { getHomeMultidata, getHomeGoods } from "@/serve/api.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl
  },
  data() {
    return {
      bannerList: [],
      dKeywordList: [],
      keywordsList: [],
      recommendList: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        choice: { page: 1, list: [] }
      }
    };
  },
  created() {
    // console.log("getHomeMultidata");
    // getHomeMultidata().then(res => (this.data = res));
    this.getHomeMultiData();
    this.getHomeGoods();
  },
  activated() {
    this.$refs.homeSwiper.startTimer();
  },
  deactivated() {
    this.$refs.homeSwiper.stopTimer();
  },
  methods: {
    getHomeMultiData() {
      getHomeMultidata().then(res => {
        const {
          banner: { list: bannerList },
          dKeyword: { list: dKeywordList },
          keywords: { list: keywordsList },
          recommend: { list: recommendList }
        } = res.data;
        this.bannerList = bannerList;
        this.recommendList = recommendList;
      });
    },
    getHomeGoods() {
      getHomeGoods().then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  padding: 44px 0 49px;
  .home-nav {
    background-color: #1296db;
    .nav-center {
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .home-swiper {
    width: 100%;
  }
  .home-feature {
    border-bottom: 8px solid #eee;
  }
  .home-tab-control {
    position: sticky;
    top: 44px;
  }
}
</style>


