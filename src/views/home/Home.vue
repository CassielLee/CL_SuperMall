<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center" class="nav-center">购物街</div>
    </nav-bar>
    <tab-control
      v-show="isTabFixed"
      class="isFixed"
      :titles="titles"
      ref="tabControlTop"
      @tabItemChange="tabItemChange"
    ></tab-control>
    <scroll
      class="scroll"
      ref="scroll"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :data="showGoodsList"
      :probe-type="3"
      :pull-up-load="true"
    >
      <div>
        <home-swiper :bannerList="bannerList" ref="homeSwiper" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <home-recommend-view :recommendList="recommendList"></home-recommend-view>
        <home-feature-view class="home-feature"></home-feature-view>
        <tab-control
          :titles="titles"
          class="home-tab-control"
          @tabItemChange="tabItemChange"
          ref="tabControl"
        ></tab-control>
        <goods-list :goodsList="showGoodsList"></goods-list>
      </div>
    </scroll>
    <back-top @click.native="backTop" v-if="showBackTop" />
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import HomeFeatureView from "./childComps/HomeFeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import { getHomeMultidata, getHomeGoods } from "@/serve/api.js";
import { POP, NEW, SELL, BACKTOP_DISTANCE } from "common/const.js";
import { itemListenerMixin } from "common/mixin.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    Scroll,
    GoodsList,
    BackTop
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      bannerList: [],
      dKeywordList: [],
      keywordsList: [],
      recommendList: [],
      titles: [
        { txt: "流行", type: POP },
        { txt: "新款", type: NEW },
        { txt: "精选", type: SELL }
      ],
      goodsList: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentType: POP,
      isTabFixed: false,
      tabOffsetTop: 0,
      showBackTop: false,
      saveY: 0
    };
  },
  created() {
    this.getHomeMultiData();
    this.getMoreProducts(POP);
    this.getMoreProducts(NEW);
    this.getMoreProducts(SELL);
  },
  mounted() {
    // 监听图片加载事件总线
    // 事件防抖
  },
  activated() {
    this.$refs.homeSwiper.startTimer();
    // this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // this.$refs.scroll.refresh();
  },
  deactivated() {
    this.$refs.homeSwiper.stopTimer();
    // this.saveY = this.$refs.scroll.getScrollY();
    this.$bus.$off("imageLoad", this.itemImgListener);
  },
  computed: {
    showGoodsList() {
      return this.goodsList[this.currentType].list;
    }
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
    getMoreProducts(type) {
      getHomeGoods(type, this.goodsList[type].page).then(res => {
        const { list: goodsList } = res.data;
        this.goodsList[type].list.push(...goodsList);
        this.goodsList[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },
    tabItemChange(type) {
      // console.log("tabChange", type);
      this.currentType = type;
    },
    contentScroll(position) {
      // 1.决定tabFixed是否显示
      this.isTabFixed = position.y < -this.tabOffsetTop;

      // 2.决定backTop是否显示
      this.showBackTop = position.y < -BACKTOP_DISTANCE;
    },
    loadMore() {
      this.getMoreProducts(this.currentType);
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      // console.log(this.tabOffsetTop);
    }
  },
  watch: {
    currentType() {
      let index = 0;
      switch (this.currentType) {
        case POP:
          index = 0;
          break;
        case NEW:
          index = 1;
          break;
        case SELL:
          index = 2;
          break;
      }
      this.$refs.tabControl.currentIndex = index;
      this.$refs.tabControlTop.currentIndex = index;
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  padding: 44px 0 49px;
  height: 100vh;
  .home-nav {
    background-color: #1296db;
    .nav-center {
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .home-swiper {
    width: 100%;
  }
  .home-feature {
    border-bottom: 8px solid #eee;
  }
  .isFixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    // position: relative;
    z-index: 9;
  }
}
</style>


