<template>
  <div class="back-top">
    <img src="~assets/img/common/back_top.png" alt="back-top" />
  </div>
</template>
<script>
export default {
  name: "BackTop"
};
</script>
<style lang="less" scoped>
.back-top {
  z-index: 10;
  position: fixed;
  right: 8px;
  bottom: 80px;
  img {
    background-color: #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  }
}
</style>