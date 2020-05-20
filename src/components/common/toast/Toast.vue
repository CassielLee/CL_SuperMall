<template>
  <div class="toast" v-show="show">
    <div class="message">{{message}}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  //   data() {
  //     return { show: false };
  //   },
  //   props: {
  //     message: {
  //       type: String,
  //       default: ""
  //     },
  //     show: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },
  data() {
    return {
      message: "",
      show: false
    };
  },
  methods: {
    showToast(message = "message", delay = 3000) {
      this.show = true;
      this.message = message;
      setTimeout(() => {
        this.closeToast();
      }, delay);
    },
    closeToast() {
      this.show = false;
      this.message = "";
    }
  }
};
</script>
<style lang="less" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>