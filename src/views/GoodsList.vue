<template>
    <div>
        <nav-header></nav-header>
        <nav-bread>
            <span slot="bread">Goods</span>
        </nav-bread>
        <div class="accessory-result-page accessory-page">
            <div class="container">
                <div class="filter-nav">
                <span class="sortby">Sort by:</span>
                <a href="javascript:void(0)" class="default cur">Default</a>
                <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
                <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
                </div>
                <div class="accessory-result">
                <!-- filter -->
                <div class="filter stopPop" id="filter">
                    <dl class="filter-price">
                    <dt>Price:</dt>
                    <dd v-for="(list,index) in pricebetween"
                    v-bind:key="index">
                    <a href="javascript:void(0)"
                    v-on:click="addcur(index)"
                    v-bind:class="{cur:index===curidx}">{{list}}</a>
                    </dd>
                    <!-- <dd>
                        <a href="javascript:void(0)">0 - 100</a>
                    </dd> -->
                    </dl>
                </div>

                <!-- search result accessories list -->
                <div class="accessory-list-wrap">
                    <div class="accessory-list col-4">
                    <ul>
                        <li v-for="(img,index) in goodlist"
                        v-bind:key="index">
                        <div class="pic">
                            <!-- <a href="#"><img v-bind:src="img.productImage" alt=""></a> -->
                            <a href="#"><img v-lazy="img.productImage" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">{{img.productName}}</div>
                            <div class="price">{{img.productPrice}}</div>
                            <div class="btn-area">
                            <a href="javascript:;" class="btn btn--m">加入购物车</a>
                            </div>
                        </div>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import '../assets/css/base.css';
import '../assets/css/product.css';
import '../assets/css/login.css';
import axios from 'axios';



import NavHeader from '../components/NavHeader.vue';
import NavFooter from '../components/NavFooter.vue';
import NavBread from '../components/NavBread.vue';



export default {
    data(){
        return {
            goodlist:null,
            pricebetween:null,
            curidx:0
        }
    },

    created:function(){
        this.getGoodsList()
    },

    methods:{
        getGoodsList(){
        // rap mock数据
        // axios.get("http://rap2api.taobao.org/app/mock/83412/goodList").then(res=>{
        //     this.goodlist=res.data.productList;
        //     this.pricebetween=res.data.priceBetween;
        // })
        // },
            axios.get("/goods").then(res=>{
                console.log(res.data)
                this.goodlist=res.data.result
                this.pricebetween=['500-1000','1000-2000','2000-3000','3000-5000']
            })
        },

        addcur(index){
            this.curidx=index
        }
    },

    components:{
        NavHeader,
        NavFooter,
        NavBread
    }
}
</script>





