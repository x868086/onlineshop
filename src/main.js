// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'


Vue.config.productionTip = false

/* eslint-disable no-new */

import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/loading/loading-bars.svg',
  loading: '../static/loading/loading-bars.svg',
  attempt: 1
})

new Vue({
  el: '#app',
  router,
})
