// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import GodButton from "./components/GodButton.vue";

Vue.use(Vuex);
Vue.config.productionTip = false;

Vue.component("GodButton", GodButton);

/* eslint-disable no-new */
const app = new Vue({
  el: "#app"
});
