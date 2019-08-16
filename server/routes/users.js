var express = require('express');
var router = express.Router();
var userModel=require('../models/user');
var getOrderId = require('../utils/orderId')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

let resjson = (res,code,msg,result)=>{
    res.json({
      'statusCode':code,
      'msg':msg,
      'result':result
    })
}


let loginMethod=(req,res,next)=>{
  let param={
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  
  userModel.findOne(param,(err,doc)=>{
    if(err){
      resjson(res,0,err,null)
    }else{
      if(doc){
        res.cookie('userId',doc.userId,{'path':'/','maxAge':1000*60*60*24});
        res.cookie('userName',doc.userName,{'path':'/','maxAge':1000*60*60*24});
        // resjson(res,1,'login auth...',doc.userName)
        resjson(res,1,'login auth...',{userName:doc.userName,userId:doc.userId})
      }else{
        resjson(res,1,'user not find',err)
      }
    }
  })
}


//1.1处理/users/login路由
router.post('/login', function(req, res, next) {
  loginMethod(req, res, next)
});



router.post('/logout', function(req, res, next) {
    loginMethod(req,res,next)
    res.clearCookie('userId', { path: '/' });
    res.clearCookie('userName', { path: '/' });
});


router.get('/checkLogin',(req,res,next)=>{
      let userCookie=req.cookies.userName
      console.log(userCookie)
      userCookie? resjson(res,1,'已登录',userCookie): resjson(res,0,'请登录',err)  
  })

  router.get('/cartList',(req,res,next)=>{
      let userId=req.cookies.userId
      userModel.findOne({userId:userId},(err,doc)=>{
        err? resjson(res,0,'获取用户信息失败',err) : resjson(res,1,'获取用户信息成功',doc.cartList) 
      })
  })

  //修改购物车中的checked
  router.post('/updateCartList', (req, res, next) =>{
      let userId = req.cookies.userId,
          productId = req.body.productId,
          flag = req.body.flag
      userModel.updateOne({
        "userId": userId,
        "cartList.productId":productId
      },{
        $set:{
          "cartList.$.checked":flag
        }
      },(err, doc) => {
        if(err){
          return resjson(res,0,'修改数据失败',err)
        } else{
          return resjson(res,1,'修改数据成功',doc)
        }
      })
    })

    //删除购物车商品
  router.post('/delpd',(req,res,next)=>{
    let productId=req.body.productId,
        userId=req.cookies.userId
        userModel.update({
          userId:userId
        },{
          $pull:{
            'cartList':{'productId':productId}
          }
        },(err,doc)=>{
          err? resjson(res,0,'删除数据失败',err) : resjson(res,1,'删除数据成功',doc)
        });

  })

    //修改购物车中商品数量
  router.post('/setnum',(req,res,next)=>{
    let productId=req.body.productId,
        productNum=req.body.productNum,
        userId=req.cookies.userId
        userModel.update({
          "userId":userId,
          "cartList.productId":productId
        },{
          $set:{
            "cartList.$.productNum":productNum
          }
        },(err,doc)=>{
          err? resjson(res,0,'修改数据失败',err) : resjson(res,1,'修改数据成功',doc)
        });

  })

  //获取用户收获地址信息
  router.get('/address', (req, res, next) => {
    let userId = req.cookies.userId
    userModel.findOne({
      "userId":userId
    }, (err, doc) => {
      err? resjson(res,0,'获取地址数据失败',err) : resjson(res,1,'获取地址数据成功',doc)
    })
  })

  //设置默认收货地址
  router.post('/setdefault', (req, res, next) =>{
    let userId = req.cookies.userId,
        addressId = req.body.id
    userModel.findOne({
      "userId":userId
    }, (err, doc) => {
      if(err){
        resjson(res, 0, '设置默认地址数据失败', err)
      } else{
        let addressList = doc.addressList
        addressList.forEach((e, i, a) => {
          if(e.addressId === addressId){
            e.isDefault = true
            a.splice(i,1)
            a.unshift(e)
          } else {
            e.isDefault = false
          }
        })
        resjson(res, 1, '获取地址数据成功', doc)
      }
       doc.save()
    })
  })

  //删除地址
  router.post('/deletaddress', (req, res, next) => {
    let userId = req.cookies.userId,
        addressId = req.body.id
    userModel.update({
      "userId": userId
    },{
      "$pull":{
        "addressList":{
          "addressId":addressId
        }
      }
    }, ((err, doc) => {
      err? resjson(res,0,'删除地址信息失败',err) : resjson(res,1,'删除地址信息成功',doc)
    })
    )
  })

  //购物车确认
  router.get('/cartListConfirm', (req, res, next) => {
    let userId = req.cookies.userId
        userModel.findOne({
          "userId":userId
        },(err, doc) => {
          if(err){
            return resjson(res,0,'获取订单数据失败',err)
          }
          let cartListConfirm = []
          doc.cartList.forEach((e, i, a) =>{
            if(e.checked === true){
              cartListConfirm.push(e)
            }
          })
          return resjson(res,1,'获取订单数据成功',cartListConfirm)
        })
  })

  //支付
  router.post('/toPayment', (req, res, next) =>{
    let userId = req.cookies.userId,
        addressId = req.body.addressId,
        orderTotal = req.body.orderTotal
        userModel.update({
          "userId": userId
        },{
          "$push":{
            "orderList":{
              "orderId": addressId,
              "orderTotal": orderTotal,
              "orderStatus": 1,
              "createDate": new Date().toLocaleString()
            }
          }
        }, ((err, doc) => {
          err? resjson(res,0,'订单支付失败!',err) : resjson(res,1,'订单支付成功!',doc)
        })
        )
  })


module.exports = router;
