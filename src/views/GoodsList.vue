<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">商品</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序 :</span>
          <a href="javascript:void(0)" class="default cur">默认</a>
          <a href="javascript:void(0)" class="price" v-on:click="sortgoods">
            价格
            <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':sortup}">
              <use xlink:href="#icon-arrow-short" />
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">排序</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>售价</dt>
              <dd v-for="(list,index) in pricebetween" v-bind:key="index">
                <a
                  href="javascript:void(0)"
                  v-on:click="addcur(index)"
                  v-bind:class="{cur:index===curidx}"
                >{{list[0]}}-{{list[1]}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(img,index) in goodlist" v-bind:key="index">
                  <div class="pic">
                    <!-- <a href="#"><img v-bind:src="img.productImage" alt=""></a> -->
                    <a href="#">
                      <img v-lazy="'../static/'+img.productImage" alt />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name">{{img.productName}}</div>
                    <div class="price">{{img.salePrice}}</div>
                    <div class="btn-area">
                      <a
                        href="javascript:;"
                        class="btn btn--m"
                        v-on:click="addCartList(img.productId)"
                      >加入购物车</a>
                    </div>
                  </div>
                </li>
                <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
                  <span slot="no-more">没有更多数据了...</span>
                </infinite-loading>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <model v-bind:modelShow="modelShow" v-on:closeModel="modelDisplay">
      <p slot="modelTips">未登录用户，请先登录后购买商品</p>
      <a href="javascript:;" class="btn btn--m" slot="modelClose" v-on:click="modelDisplay">关闭</a>
    </model>
    <model v-bind:modelShow="modelShowLogin" v-on:closeModel="modelDisplay">
      <p slot="modelTips">成功添加商品!</p>
      <a href="javascript:;" class="btn btn--m" slot="modelClose" v-on:click="modelDisplay">继续购物</a>
      <router-link to="userCart" class="btn btn--m" slot="modelClose">查看购物车</router-link>
    </model>
    <nav-footer></nav-footer>
  </div>
</template>

<style>
.sort-up {
  transform: rotate(180deg);
  transition: all 0.3s ease-in;
}
</style>


<script>
import "../assets/css/base.css";
import "../assets/css/product.css";
import "../assets/css/login.css";
import getGoodsCount from "../utils/getCartCount";
import { mapActions, mapState } from "vuex";
import axios from "axios";

import NavHeader from "../components/NavHeader.vue";
import NavFooter from "../components/NavFooter.vue";
import NavBread from "../components/NavBread.vue";
import model from "../components/model.vue";
//2.分页，触底加载更多插件
import InfiniteLoading from "vue-infinite-loading";

export default {
  data() {
    return {
      goodlist: [],
      goodscount: null,
      pricebetween: [
        [0, 100],
        [100, 500],
        [500, 1000],
        [1000, 2000],
        [2000, 5000]
      ],
      curidx: 0,
      modelShow: false,
      modelShowLogin: false,
      getParam: {
        pageNum: 1,
        pageSize: 8,
        sortFlag: 1
      }
    };
  },

  computed: {
    sortup() {
      return this.getParam.sortFlag === 1 ? true : false;
    },
    ...mapState(["userGoodsCount"])
  },

  mounted: function() {
    this.getGoodsList(false);
  },

  methods: {
    ...mapActions(["setUserGoodsCount"]),
    getGoodsList(isPage) {
      // rap mock数据
      // axios.get("http://rap2api.taobao.org/app/mock/83412/goodList").then(res=>{
      //     this.goodlist=res.data.productList;
      //     this.pricebetween=res.data.priceBetween;
      // })
      // },
      axios.get("/goods", { params: this.getParam }).then(res => {
        if (res.data.codeSet === 1) {
          //3.3 如果是加载更多，商品数组拼接，如果不是加载更多直接赋值商品数组
          if (isPage) {
            this.goodlist = this.goodlist.concat(res.data.result);
          } else {
            this.goodlist = res.data.result;
          }

          this.goodscount = res.data.count;
          this.getParam.pageNum++;
        } else {
          this.goodlist = [];
        }
      });
    },

    addcur(index) {
      this.curidx = index;
      this.preceLever(index);
    },

    //1.点击排序按钮更改排序flag为1或-1,传到后台在mongodb中作为查询排序参数
    sortgoods() {
      this.getParam.sortFlag === 1
        ? (this.getParam.sortFlag = -1)
        : (this.getParam.sortFlag = 1);
      this.getParam.pageNum = 1;
      this.goodscount = null;
      this.goodlist = null;
      this.getGoodsList(false);
      //3.2当点击排序时，执行排序请求数组后再次触发滚动加载事件
      this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
      });
    },

    infiniteHandler($state) {
      setTimeout(() => {
        //3.如果后端获取的数据个数小于pageSize表示数据获取到最后一页了，滚动加载停止
        if (this.goodscount < this.getParam.pageSize) {
          $state.complete();
        } else {
          //3.1如果后端获取的数据个数等于8,则继续执行获取函数继续滚动加载
          $state.loaded();
          this.getGoodsList(true);
        }
      }, 1000);
    },

    preceLever(index) {
      this.goodlist = [];
      this.getParam = {
        pageNum: 1,
        pageSize: 8,
        sortFlag: 1
      };
      axios
        .get("/goods", {
          params: Object.assign(this.getParam, {
            condition: "salePrice",
            minvalue: this.pricebetween[index][0],
            maxvalue: this.pricebetween[index][1]
          })
        })
        .then(res => {
          if (res.data.codeSet === 1) {
            this.goodlist = res.data.result;
            this.goodscount = res.data.count;
            this.getParam.pageNum++;
          } else {
            this.goodlist = [];
          }
          this.$nextTick(() => {
            this.$refs.infiniteLoading.$emit("$InfiniteLoading:reset");
          });
        });
    },

    addCartList(productId) {
      axios
        .post("/goods/addcart", { productId: productId })
        .then(res => {
          if (res.data.codeSet === 1) {
            this.modelShowLogin = true;
            getGoodsCount(axios, this.setUserGoodsCount);
          } else {
            this.modelShow = true;
          }
        })
        .catch(err => console.log(err));
    },

    modelDisplay() {
      this.modelShow = false;
      this.modelShowLogin = false;
    }
  },

  components: {
    NavHeader,
    NavFooter,
    NavBread,
    InfiniteLoading,
    model
  }
};
</script>





