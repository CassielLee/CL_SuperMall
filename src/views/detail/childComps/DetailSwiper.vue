<template>
  <swiper class="detail-swiper" ref="swiper" v-if="topImages.length">
    <swiper-item v-for="(image,index) in topImages" :key="index">
      <img :src="image" :alt="index" @load="swiperImageLoad" />
    </swiper-item>
  </swiper>
</template>
<script>
import { SwiperItem, Swiper } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  components: {
    SwiperItem,
    Swiper
  },
  props: {
    topImages: {
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