<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BS from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      default: () => []
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 通过ducument.querySelect()方式获取的元素不准确
    setTimeout(this._initScroll, 20);
  },
  methods: {
    _initScroll() {
      // 1.初始化BS对象
      if (!this.$refs.wrapper) return;
      this.scroll = new BS(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      });
      // 2.监听事件回调
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", pos => {
          this.$emit("scroll", pos);
        });
      }
      // 3.监听上拉到底部
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          this.$emit("pullingUp");
        });
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    }
  }
};
</script>
<style lang="less" scoped>
</style>