var express = require('express');
var router = express.Router();
var userModel=require('../models/user');

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
      resjson(res,0,err.message,null)
    }else{
      if(doc){
        res.cookie('userId',doc.userId,{'path':'/','maxAge':1000*60*60*24});
        res.cookie('userName',doc.userName,{'path':'/','maxAge':1000*60*60*24});
        resjson(res,1,'login auth...',doc.userName)
      }else{
        resjson(res,1,'user not find',null)
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
      userCookie? resjson(res,1,'已登录',userCookie): resjson(res,0,'请登录',null)  
  })

  router.get('/cartList',(req,res,next)=>{
      let userId=req.cookies.userId
      userModel.findOne({userId:userId},(err,doc)=>{
        err? resjson(res,0,'获取用户信息失败',null) : resjson(res,1,'获取用户信息成功',doc.cartList) 
      })
  })

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
          err? resjson(res,0,'删除数据失败',null) : resjson(res,1,'删除数据成功',doc)
        });

  })


module.exports = router;
