import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/JournalAccount/index.vue"),
  },
  {
    path: "/categories",
    name: "Categories",
    component: () => import("../views/CategoryList/index.vue"),
  },
  {
    path: "/stats",
    name: "Stats",
    component: () => import("../views/Stats/index.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
