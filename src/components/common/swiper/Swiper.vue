<template>
  <div id="my-swiper">
    <div class="swiper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <!-- 插槽，插入任意个数的SwiperItem子组件 -->
      <slot></slot>
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div
          v-for="(item,index) in slideCount"
          :key="index"
          class="indi-item"
          :class="{active:index===currentIndex-1}"
        ></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animDuration: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25 // 滚动比例，页面滑动多少比例时翻页
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      slideCount: 0,
      totalWidth: 0, // swiper的宽度
      swiperStyle: {}, // swiper的样式
      currentIndex: 1, // 当前的index
      scrolling: false // 是否正在滚动
    };
  },
  //   生命周期函数
  mounted() {
    // 1、添加slide
    setTimeout(() => {
      this.handleDom();
      // 2、开启定时器
      this.startTimer();
    }, 3000);
  },
  methods: {
    /**拖动事件处理 */
    touchstart(e) {
      // 1.如果正在滚动则禁止拖动
      if (this.scrolling) return;
      // 2.停止定时器(停止自动播放F)
      this.stopTimer();
      // 3.保存滚动的位置，方便后续计算
      this.startX = e.touches[0].pageX;
    },
    touchmove(e) {
      // 1.计算用户拖动的位置
      this.currentX = e.touches[0].pageX;
      //  拖动的距离等于move的距离减去刚开始的位置
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;
      // 设置当前的位置
      this.setTransform(moveDistance);
    },
    touchend(e) {
      // 计算移动的距离
      let currentMove = Math.abs(this.distance);
      // 判断最终距离情况
      if (this.distance === 0) {
        return;
      } else if (
        this.distance > 0 &&
        currentMove > this.totalWidth * this.moveRatio
      ) {
        this.currentIndex--;
      } else if (
        this.distance < 0 &&
        currentMove > this.currentIndex * this.moveRatio
      ) {
        this.currentIndex++;
      }
      // 移动到正确位置
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 重新开起定时器
      this.startTimer();
    },
    /**控制上一个和下一个 */
    previous() {
      this.changeItemIndex(-1);
    },
    next() {
      this.changeItemIndex(1);
    },
    changeItemIndex(num) {
      // 移除定时器
      this.stopTimer();
      // 修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);
      // 添加定时器
      this.startTimer();
    },
    /**定时器操作 */
    startTimer() {
      this.playTimer = window.setInterval(() => {
        // 开启定时器之后，轮播图自动播放
        this.currentIndex++;
        // 图片列表左滑一个窗口的距离
        this.scrollContent(-this.currentIndex * this.totalWidth);
      }, this.interval);
    },
    stopTimer() {
      window.clearInterval(this.playTimer);
    },
    /**操作Dom，在Dom后面添加Slide */
    handleDom() {
      // 1.获取要操作的元素
      let swiperEl = document.querySelector(".swiper");
      let slideEls = swiperEl.getElementsByClassName("slide");

      // 2.保存个数
      this.slideCount = slideEls.length;

      //   3. 如果轮播图个数大于1个，前后分别添加一个slide(用于循环滚动)
      if (this.slideCount > 1) {
        let cloneFirst = slideEls[0].cloneNode(true);
        let cloneLast = slideEls[this.slideCount - 1].cloneNode(true);
        swiperEl.insertBefore(cloneLast, slideEls[0]);
        swiperEl.appendChild(cloneFirst);
        this.totalWidth = swiperEl.offsetWidth;
        this.swiperStyle = swiperEl.style;
      }
      //   4.让swiper元素显示第一个轮播图(添加的最后一个轮播图)
      this.setTransform(-this.totalWidth);
    },
    /**滚动到正确位置 */
    scrollContent(currentPosition) {
      // 0.设置开始滚动
      this.scrolling = true;
      //   1. 开始滚动动画
      this.swiperStyle.transition = `transform ${this.animDuration}ms`;
      //   this.swiperStyle.transition = "transform " + this.animDuration + "ms";
      this.setTransform(currentPosition);
      //   2.判断滚动到的位置
      this.checkPosition();
      //   3.滚动完成
      this.scrolling = false;
    },
    /**校验正确的位置 */
    checkPosition() {
      window.setTimeout(() => {
        // 1.校验正确位置
        this.swiperStyle.transition = "0ms";
        if (this.currentIndex >= this.slideCount + 1) {
          // 如果滚动到最后一张图片，那么从头开始滚动
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          // 在第一张图片的时候继续向前滚动
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }
        // 2.移动结束
        this.$emit("transitionEnd", this.currentIndex - 1);
      }, this.animDuration);
    },
    /**设置滚动的位置 */
    setTransform(positon) {
      this.swiperStyle.transform = `translate3d(${positon}px, 0, 0)`;
      this.swiperStyle["-webkit-transform"] = `translate3d(${positon}px, 0, 0)`;
      this.swiperStyle["-ms-transfrom"] = `translate3d(${positon}px, 0, 0)`;
    }
  }
};
</script>

<style lang="less" scoped>
#my-swiper {
  overflow: hidden;
  position: relative;
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
    .indi-item {
      box-sizing: border-box;
      width: 8px;
      height: 8px;
      border-radius: 4px;
      background-color: #fff;
      line-height: 8px;
      text-align: center;
      font-size: 12px;
      margin: 0 5px;
      &.active {
        background-color: deepskyblue;
      }
    }
  }
}
</style>