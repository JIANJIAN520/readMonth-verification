import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import "amfe-flexible";
import { Loading, Toast } from "vant";

Vue.use(Loading);
Vue.use(Toast);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
