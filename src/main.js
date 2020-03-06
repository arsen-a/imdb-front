import "bootstrap/dist/css/bootstrap.min.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import pusher from "pusher-js";

Vue.config.productionTip = false;

new Vue({
  router,
  pusher,
  store,
  render: h => h(App)
}).$mount("#app");
