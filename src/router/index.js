import Vue from 'vue'
import Router from "vue-router";

import Movies from "../components/Movies.vue";
import Register from '../components/auth/Register.vue'
import Login from '../components/auth/Login.vue'

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: 'home',
    component: Movies
  },
  {
      path: '/register',
      name: 'register',
      component: Register
  },
  {
      path: '/login',
      name: 'login',
      component: Login
  }
];

export const router = new Router({
  routes,
  mode: "history"
});
