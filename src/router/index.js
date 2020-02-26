import Vue from "vue";
import Router from "vue-router";
import { store } from '../store'

import Movies from "../components/Movies.vue";
import Register from "../components/auth/Register.vue";
import Login from "../components/auth/Login.vue";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Movies,
    meta: {
      guest: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      guest: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true
    }
  }
];

const router = new Router({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters.isUserLoggedIn;

  if (!to.meta.guest && !isUserLoggedIn) {
    return next({
      name: "login"
    });
  }

  if ((to.name === "login" && isUserLoggedIn) || (to.name === "register" && isUserLoggedIn)) {
    return next({
      name: "home"
    });
  }

  return next();
});

export default router;
