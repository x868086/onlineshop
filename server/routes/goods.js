var express = require('express')
var router = express.Router()
var mongoose=require('mongoose')
var Goods=require('../models/goods.js') //加载goods实体model模块

mongoose.connect('mongodb://root:123456@127.0.0.1:27017/shop');

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
    //1.获取前端发起的查询参数
    let sortFlag=req.param('sortFlag');
    let pageNum=Number(req.param('pageNum'));
    let pageSize=Number(req.param('pageSize'));
    //1.1根据页数和每页的数量计算要跳过的条数
    let skips=(pageNum-1) * pageSize
    let conditions=req.param('condition')
    let minvalue=req.param("minvalue")
    let maxvalue=req.param("maxvalue")
    let obj={
        $lt:parseInt(maxvalue),
        $gte:parseInt(minvalue)
    }
    let queryParam={}
    if(conditions){
        queryParam={salePrice:obj}
    }

    console.log(req)
    console.log(queryParam)
    //1.2创建查询结果实例并在查询结果中分页
    let modelQuery=Goods.find(queryParam).skip(skips).limit(pageSize);
    modelQuery.sort({'salePrice':sortFlag})
    //1.3查询结果实例query使用exec方法调用回调函数
    modelQuery.exec((err,doc)=>{
        err? res.json({
            'status':0,
            'msg':err.message
        }): res.json({
            'status':1,
            'count':doc.length,
            'msg':'response done',
            'result':doc
        })
    })

})


module.exports= router
