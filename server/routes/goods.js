var express = require('express')
var router = express.Router()
var mongoose=require('mongoose')
var Goods=require('../models/goods.js') //加载goods实体model模块
var Users=require('../models/user.js') //加载user实体model模块

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

//查询商品信息
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

    // console.log(req)
    // console.log(queryParam)
    //1.2创建查询结果实例并在查询结果中分页
    let modelQuery=Goods.find(queryParam).skip(skips).limit(pageSize);
    modelQuery.sort({'salePrice':sortFlag})
    //1.3查询结果实例query使用exec方法调用回调函数
    modelQuery.exec((err,doc)=>{
        err? res.json({
            'codeSet':0,
            'msg':err.message
        }): res.json({
            'codeSet':1,
            'count':doc.length,
            'msg':'response done',
            'result':doc
        })
    })

})


//2.1添加到购物车
router.post("/addcart",(req,res,next)=>{
    let productId=req.body.productId
    let userId='100000077'
    
//2.2 查询用户，匹配上之后继续查询前端POST的商品，然后在商品字段中增加
//productNum和checked字段，将修改后的商品信息保存到用户的cartList字段
        Users.findOne({userId:userId}).exec((err,data)=>{
            if(err){
                res.json({
                    'codeSet':0,
                    'msg':'query userId error'
                })
            }else{
                Goods.findOne({productId:productId}).exec((err1,doc)=>{
                    if(err1){
                        res.json({
                            'codeSet':0,
                            'msg':'query productId error'
                        })
                    }else{
                        //3.1前台提交的商品先遍历用户购物车数组，如果商品存在则数量++
                        let inItem=data.cartList.find((e,i,a)=>{
                            return e.productId===productId
                        })
                        if(inItem){
                            inItem.productNum++
                        //3.2如果商品不存在则push
                        }else{
                            doc.productNum=1;
                            doc.checked=1;
                            data.cartList.push(doc);
                        }

                        
                        //model的save方法，操作数据后必须将操作结果保存到数据库
                        data.save((err2,doc1)=>{
                            if(err2){
                                res.json({
                                    'codeSet':0,
                                    'msg':'query productId error'
                                })
                            }else{
                                res.json({
                                    'codeSet':1,
                                    'msg':'insert db complate',
                                    'resule':data
                                })
                            }
                        })
                    }
                })

            }
        })
})


module.exports= router
