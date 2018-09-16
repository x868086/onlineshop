var express = require('express');
var router = express.Router();

/* GET home page. */


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//1.1路由黑名单，所有黑名单必须判断是否取到用户cookie
let blackRouterList=['/goods/addcart']

router.use((req,res,next)=>{
    let userCookie=req.cookies.userId,
        queryPath=req.path;
    let isBlack=blackRouterList.some((item)=>{
      return item===queryPath
    })
    //1.2 如果不到cookie则终止中间件，直接返回信息，如果取到cookie则继续执行中间件
    if(isBlack && (userCookie===void 0)){
      console.log(queryPath)
      res.json({
        'statusCode':0,'msg':'请登录','result':null
      })
    }else{
      next()
    }
})



module.exports = router;
