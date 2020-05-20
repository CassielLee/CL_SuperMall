<template>
  <div id="detail">
    <detail-nav-bar ref="nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll
      class="scroll"
      ref="scroll"
      @scroll="contentScroll"
      :data="[topImages, goods, shop, detailInfo, paramInfo, commentInfo, recommendList]"
      :probe-type="3"
    >
      <div>
        <detail-swiper :topImages="topImages" class="detail-swiper" ref="base"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detail-info="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
        <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
        <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
        <detail-recommend-info :recommend-list="recommendList" ref="recommend"></detail-recommend-info>
      </div>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart" @goToBuy="goToBuy"></detail-bottom-bar>
    <back-top @click.native="backTop" class="back-top" v-show="showBackTop" @click="backTop"></back-top>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import { getProductDetail, getProductRecommend } from "@/serve/api.js";
import { Goods, Shop, GoodsParam } from "@/serve/class.js";
import { BACKTOP_DISTANCE } from "common/const.js";
import { backTopMixin, itemListenerMixin } from "common/mixin.js";
import { debounce } from "@/utils/utils.js";

export default {
  name: "Detail",
  components: {
    Scroll,
    BackTop,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      goods: {},
      topImages: [],
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTops: [],
      currentIndex: 0,
      newRefresh: null,
      getElementY: null
    };
  },
  created() {
    this._getDetailData();
    this._getRecommend();
    this.getElementY = debounce(() => {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
      // console.log(this.themeTops);
    }, 500);
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
  },
  distroyed() {
    this.$bus.$off("imageLoad", this.itemImgListener);
  },
  methods: {
    _getOffsetTops() {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.param.$el.offsetTop);
      this.themeTops.push(this.$refs.comment.$el.offsetTop);
      this.themeTops.push(this.$refs.recommend.$el.offsetTop);
      this.themeTops.push(Number.MAX_VALUE);
      console.log(this.themeTops);
    },
    _getDetailData() {
      const iid = this.$route.params.iid;
      this.iid = iid;
      getProductDetail(iid).then(res => {
        const topImages = res.result.itemInfo.topImages;
        this.topImages = topImages;
        const {
          itemInfo,
          columns,
          shopInfo,
          detailInfo,
          itemParams: { info, rule },
          rate: { list }
        } = res.result;
        this.goods = new Goods(itemInfo, columns, shopInfo.services);
        this.shop = new Shop(shopInfo);
        this.detailInfo = detailInfo;
        this.paramInfo = new GoodsParam(info, rule);
        if (list) {
          this.commentInfo = list[0];
        }
      });
    },
    _getRecommend() {
      getProductRecommend().then((res, err) => {
        if (err) return;
        this.recommendList = res.data.list;
      });
    },
    contentScroll(position) {
      this.showBackTop = position.y < -BACKTOP_DISTANCE;
      // 监听滚动主题
      this._listenScrollPart(-position.y);
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 100);
    },

    _listenScrollPart(position) {
      let length = this.themeTops.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.themeTops[i];
        if (position >= iPos && position < this.themeTops[i + 1]) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = i;
          }
          break;
        }
      }
    },
    detailImageLoad() {
      this.newRefresh();
      // this._getOffsetTops();
      this.getElementY();
    },
    addToCart() {
      console.log("点击加入购物车");
      // 将商品加入购物车
      // 1、创建商品对象
      let goodObj = {};
      // 2、添加对象信息
      goodObj.iid = this.iid;
      goodObj.checked = true;
      goodObj.imgUrl = this.topImages[0];
      goodObj.title = this.goods.title;
      goodObj.desc = this.goods.desc;
      goodObj.newPrice = this.goods.nowPrice;

      // 3、添加到Store中
      // this.$store.commit("addToCart", goodObj);
      this.$store.dispatch("addToCart", goodObj);
    },
    goToBuy() {
      this.$toast.showToast("敬请期待哦~", 1500);
      // console.log(this.$toast);
    }
  }
};
</script>
<style lang="less" scoped>
#detail {
  height: 100vh;
  position: relative;
  // z-index: 1;
  background-color: #fff;
  // overflow: hidden;

  .scroll {
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .detail-swiper {
    height: 350px;
    overflow: hidden;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
}
</style>