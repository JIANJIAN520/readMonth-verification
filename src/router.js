import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: () => import("./views/index.vue")
  },
  {
    path: "/login",
    component: () => import("./views/login.vue")
  }
];

// add route path
routes.forEach(route => {
  route.path = route.path || "/" + (route.name || "");
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  // console.log("to:", to, "from:", from);
  next();
});

export { router };
