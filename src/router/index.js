import Vue from 'vue'
import Router from 'vue-router'
import GoodList from '../views/GoodsList.vue';
import UserCart from '../views/UserCart.vue';
import Address from '../views/Address.vue';
import OrderConfirm from '../views/OrderConfirm.vue';
import OrderSuccess from '../views/OrderSuccess.vue'

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
    },

    {
      path: '/address',
      name: 'address',
      component: Address
    },

    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: OrderConfirm
    },

    {
      path: '/orderSuccess',
      name: 'orderSuccess',
      component: OrderSuccess
    }
  ]
})
