<template>
    <div v-show="modelShow">
        <div class="md-modal modal-msg md-modal-transition md-show">
            <div class="md-modal-inner" v-show="modelShow">
            <div class="md-top">
                <button class="md-close" v-on:click="closeModel">Close</button>
            </div>
            <div class="md-content">
                <div class="confirm-tips">
                    <slot name="modelTips"></slot>
                </div>
                <div class="login-wrap">
                    <slot name="modelClose"></slot>
                </div>
            </div>
            </div>
        </div>
        <div class="md-overlay" v-show="modelShow"></div>
    </div>
</template>

<style>
    .login-wrap{
        text-align:center;
    }

    .login-wrap>.btn.btn--m{
        padding-left:45px;
        padding-right:45px;
    }
</style>


<script>
export default {
    props:['modelShow'],
    methods:{
        closeModel(){
            this.$emit("closeModel")
        }
    }
}
</script>


