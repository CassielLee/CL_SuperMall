import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LazyLoad from "vue-lazyload";

import toast from "components/common/toast";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

Vue.use(toast);
Vue.use(LazyLoad, {
  loading: require("./assets/img/common/placeholder.png"),
});
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
