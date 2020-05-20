import { debounce } from "@/utils/utils.js";

export const backTopMixin = {
  data: function() {
    return {
      showBackTop: false,
    };
  },
  methods: {
    backTop: function() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
  },
};

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    };
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("imageLoad", () => {
      refresh();
    });
  },
};
