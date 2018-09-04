var express = require('express')
var router = express.Router()
var mongoose=require('mongoose')
var Goods=require('../models/goods.js') //加载goods实体model模块

mongoose.connect('mongodb://127.0.0.1:27017/shop');

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected")
})

mongoose.connection.on("error",()=>{
    console.log("mongodb connected error")
})

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb connected offline")
})


router.get("/",(req,res,next)=>{
    res.send("goods list")
})


module.exports= router
