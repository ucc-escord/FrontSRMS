// =========================================================
// * Vue Material Kit - v1.2.2
// =========================================================
//
// * Product Page: https://www.creative-tim.com/product/vue-material-kit
// * Copyright 2019 Creative Tim (https://www.creative-tim.com)
// * Licensed under MIT (https://github.com/creativetimofficial/vue-material-kit/blob/master/LICENSE.md)
//
// * Coded by Creative Tim
//
// =========================================================
//
// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

import Vue from "vue";
import App from "./App.vue";
//import router from "./router";
import router from './route'
import VueRouter from 'vue-router'


import store from './store'
import axios from 'axios';

import MaterialKit from "./plugins/material-kit";

// Md-Vuelidate
import MdVuelidated from '@undecaf/vue-material-vuelidate'
import '@undecaf/vue-material-vuelidate/dist/components.css'

// Vue-Headful (for page title)
import vueHeadful from 'vue-headful';

/* eslint-disable no-new */

Vue.config.productionTip = false;

const token = localStorage.getItem('token');

//axios.defaults.baseURL = 'http://20.24.144.51/laravelbackend-main/public/'; //PROTOCOL ON LIVE SERVER
//axios.defaults.baseURL = 'http://127.0.0.1:8000'; //PROTOCOL LOCAL HOST
axios.defaults.baseURL = 'https://ucc-escord.online/' //SECURED PROTOCOL ON HOSTING
axios.defaults.withCredentials = true
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

Vue.use(MaterialKit);
Vue.use(VueRouter);

Vue.use(MdVuelidated)

Vue.component('vue-headful', vueHeadful)

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});




new Vue({
  router,store,
  render: h => h(App)
}).$mount("#app");
