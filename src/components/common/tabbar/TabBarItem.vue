<template>
  <div class="tab-item" @click="handleTabClick">
    <!-- <img :src="tabInfo.icon" :alt="tabInfo.txt" class="tab-item-icon"> -->
    <!-- <span class="tab-item-txt">{{tabInfo.txt}}</span> -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-txt"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    tabInfo: {
      tabId: Number,
      link: String,
      icon: String,
      iconActive: String,
      txt: String
    },
    activeColor: {
      type: String,
      default: "skyblue"
    }
  },
  methods: {
    handleTabClick() {
      if (!this.isActive) {
        this.$router.push(this.tabInfo.link);
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.tabInfo.link === this.$route.path;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  }
};
</script>

<style lang="less" scoped>
.tab-item {
  flex: 1;
  text-align: center;
  height: 49px;
  // line-height: 49px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  .tab-item-icon {
    height: 25px;
    width: 25px;
  }
  // .active {
  //   color: #1296db;
  // }
  .tab-item-txt {
    display: inline-block;
  }
}
</style>