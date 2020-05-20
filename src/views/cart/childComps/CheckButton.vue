<template>
  <div>
    <div class="icon-selector" :class="{active:checked}" @click="checkBtnClick">
      <img src="~/assets/img/cart/tick.svg" alt="选中按钮" />
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      checked: this.value
    };
  },
  methods: {
    checkBtnClick() {
      this.$emit("checkBtnClick");
    }
  },
  watch: {
    value: function(newValue) {
      this.checked = newValue;
    }
  }
};
</script>
<style lang="less" scoped>
.icon-selector {
  position: relative;
  margin: 0;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
  &.active {
    background-color: #1296db;
    border-color: #1296db;
  }
}
</style>