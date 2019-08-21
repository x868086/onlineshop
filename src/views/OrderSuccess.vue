<template>
  <div>
    <nav-header></nav-header>
    <div class="container">
      <div class="page-title-normal">
        <h2 class="page-title-h2">
          <span>订单完成</span>
        </h2>
      </div>
      <!-- 进度条 -->
      <div class="check-step">
        <ul>
          <li class="cur">
            <span></span> 收货地址
          </li>
          <li class="cur">
            <span></span> 订单预览
          </li>
          <li class="cur">
            <span></span> 订单支付
          </li>
          <li class="cur">
            <span></span> 订单确认
          </li>
        </ul>
      </div>

      <div class="order-create">
        <div class="order-create-pic">
          <img src="/static/ok.png" alt />
        </div>
        <div class="order-create-main">
          <h3>
            恭喜您,生成订单成功!
            <br />供货平台会尽快处理您的订单, 请耐心等待!
          </h3>
          <p>
            <span>订单编号：{{orderId}}</span>
            <span>订单金额：{{orderTotal|currency('￥')}}</span>
          </p>
          <div class="order-create-btn-wrap">
            <div class="btn-l-wrap">
              <router-link class="btn btn--m" to="/userCart">购物车</router-link>
            </div>
            <div class="btn-r-wrap">
              <router-link class="btn btn--m" to="/">首页</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
import NavBread from "../components/NavBread";
import { currency } from "../utils/currency";
import getGoodsCount from "../utils/getCartCount";
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      orderId: "",
      orderTotal: 0
    };
  },
  computed: {
    ...mapState(["userGoodsCount"])
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  filters: {
    currency: currency
  },
  methods: {
    ...mapActions(["setUserGoodsCount"])
  },
  async mounted() {
    let orderId = this.$route.query.orderId;
    console.log("orderId:" + orderId);
    if (!orderId) {
      return;
    }
    try {
      let {
        data: { result }
      } = await axios.get("/users/orderDetail", {
        params: {
          orderId: orderId
        }
      });
      this.orderId = result[0].orderId;
      this.orderTotal = result[0].orderTotal;
      getGoodsCount(axios, this.setUserGoodsCount);
    } catch (err) {
      console.log(err);
    }
  }
};
</script>