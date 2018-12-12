// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import {currency} from './utils/currency'


Vue.config.productionTip = false

/* eslint-disable no-new */

//1.图片懒加载插件
import VueLazyload from 'vue-lazyload';



Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/loading/loading-bars.svg',
  loading: '../static/loading/loading-bars.svg',
  attempt: 1
})

Vue.filter("currency",currency)

new Vue({
  el: '#app',
  router,
})
