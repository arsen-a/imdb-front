import Vue from "vue";
import Router from "vue-router";
import { store } from "../store";

import Movies from "../components/Movies.vue";
import Register from "../components/auth/Register.vue";
import Login from "../components/auth/Login.vue";
import SingleMovie from "../components/SingleMovie.vue";
import CreateMovie from "../components/CreateMovie.vue";

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
  },
  {
    path: "/movies/:id",
    name: "single-movie",
    component: SingleMovie,
    meta: {
      guest: false
    }
  },
  {
    path: "/new-movie",
    name: "create-movie",
    component: CreateMovie,
    meta: {
      guest: false
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

  if (
    (to.name === "login" && isUserLoggedIn) ||
    (to.name === "register" && isUserLoggedIn)
  ) {
    return next({
      name: "home"
    });
  }

  return next();
});

export default router;
