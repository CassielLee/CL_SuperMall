<template>
  <swiper class="home-swiper" ref="swiper" v-if="bannerList.length">
    <swiper-item v-for="(banner,index) in bannerList" :key="index">
      <a :href="banner.link">
        <img :src="banner.image" :alt="index" @load="swiperImageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { SwiperItem, Swiper } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  components: {
    SwiperItem,
    Swiper
  },
  props: {
    bannerList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isLoad: false
    };
  },
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    },
    swiperImageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>