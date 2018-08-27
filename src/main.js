// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'


Vue.config.productionTip = false

/* eslint-disable no-new */

import lazyload from 'vue-lazy-load';
Vue.use(lazyload,{
    loading: '../static/loading/loading-bars.svg',
    try:3
    // error: '加载错误图片'
    }
)

new Vue({
  el: '#app',
  router,
})
