<template  >
  <div id="tab-bar" >
    <!-- <tab-item v-for="tabInfo in tabsInfo" :tabInfo="tabInfo" :key="tabInfo.tabId"></tab-item> -->
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "TabBar",
  props:['tabsInfo'],
  data() {
    return {
    //   tabInfo: { txt: "分类", icon: "@/assets/img/categroy.png" }
    };
  }
};
</script>

<style lang="less" scoped>
#title {
  text-align: center;
}

#tab-bar {
  display: flex;
  background-color: aliceblue;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0 -1px 1px rgba(240, 248, 255, 0.1);
  padding: 3px 0px;
}
</style>