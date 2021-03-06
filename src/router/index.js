import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";

const Categroy = () => import("../views/categroy/Categroy.vue");
const Cart = () => import("../views/cart/Cart.vue");
const Person = () => import("../views/person/Person");
const Detail = () => import("../views/detail/Detail");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/detail/:iid",
    name: "Detail",
    component: Detail,
    meta: {
      title: "Detail",
    },
  },
  {
    path: "/categroy",
    name: "Categroy",
    component: Categroy,
    meta: {
      title: "Categroy",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta: {
      title: "Cart",
    },
  },
  {
    path: "/person",
    name: "Person",
    component: Person,
    meta: {
      title: "Person",
    },
  },
];

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject)
//     return originalPush.call(this, location, onResolve, onReject);
//   return originalPush.call(this, location).catch((err) => err);
// };

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  // console.log("router")
  document.title = to.meta.title;
  next();
});

export default router;
