import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '../views/GoodsList.vue';
import UserCart from '../views/UserCart.vue';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goodlist',
      component: GoodList
    },
        {
      path: '/userCart',
      name: 'cart',
      component: UserCart
    }
  ]
})
