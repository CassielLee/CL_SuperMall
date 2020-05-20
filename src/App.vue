<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <tab-bar v-show="$route.path.indexOf('detail')===-1">
      <tab-bar-item
        v-for="tabInfo in tabsInfo"
        :tabInfo="tabInfo"
        :key="tabInfo.tabId"
        activeColor="#1296db"
      >
        <img slot="item-icon" :src="tabInfo.icon" :alt="tabInfo.txt" class="tab-item-icon" />
        <img
          slot="item-icon-active"
          :src="tabInfo.iconActive"
          :alt="tabInfo.txt"
          class="tab-item-icon"
        />
        <span slot="item-txt" class="tab-item-txt">{{tabInfo.txt}}</span>
      </tab-bar-item>
    </tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<style lang="less">
@import url("./assets/css/base");
</style>
<script>
// @ is an alias to /src
import TabBar from "@/components/common/tabbar/TabBar.vue";
import TabBarItem from "@/components/common/tabbar/TabBarItem.vue";
import Icon from "components/content/Icon/Icon.vue";
import SvgIcon from "components/content/Icon/svg.vue";
import tabsInfo from "common/tabbar.js";

export default {
  name: "Home",
  components: {
    TabBar,
    TabBarItem,
    Icon,
    SvgIcon
  },
  data() {
    return {
      tabsInfo
    };
  }
};
</script>