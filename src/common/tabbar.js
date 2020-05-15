const tabsInfo = [
  {
    txt: "首页",
    icon: require("@/assets/img/tabbar/home.png"),
    iconActive: require("@/assets/img/tabbar/home_active.png"),
    link: "/home",
    tabId: 1,
  },
  {
    txt: "分类",
    icon: require("@/assets/img/tabbar/categroy.png"),
    iconActive: require("@/assets/img/tabbar/categroy_active.png"),
    link: "/categroy",
    tabId: 2,
  },
  {
    txt: "购物车",
    icon: require("@/assets/img/tabbar/cart_empty.png"),
    iconActive: require("@/assets/img/tabbar/cart_active.png"),
    link: "/cart",
    tabId: 3,
  },
  {
    txt: "我的",
    icon: require("@/assets/img/tabbar/person.png"),
    iconActive: require("@/assets/img/tabbar/person_active.png"),
    link: "/person",
    tabId: 4,
  },
];

export default tabsInfo;
