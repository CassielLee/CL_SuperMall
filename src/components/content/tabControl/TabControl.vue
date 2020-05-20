<template>
  <div class="tab-control">
    <div
      v-for="(title,index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active:currentIndex===index}"
      @click="handleTabClick(index,title)"
    >
      <span>{{title.txt}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    handleTabClick(index, title) {
      this.currentIndex = index;
      this.$emit("tabItemChange", title.type);
    }
  }
};
</script>
<style lang="less" scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  z-index: 10;
  background-color: #fff;
  .tab-control-item {
    flex: 1;
    span {
      padding: 3px 5px;
    }
    &.active {
      color: rgb(18, 150, 219);
      span {
        border-bottom: 3px solid rgb(18, 150, 219);
      }
    }
  }
}
</style>