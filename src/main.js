// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Vuex from "vuex";
import VueButton from "./components/VueButton.vue";

Vue.use(Vuex);
Vue.config.productionTip = false;

Vue.component("vuebutton", VueButton);

/* eslint-disable no-new */
const app = new Vue({
  el: "#app"
});
