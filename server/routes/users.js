var express = require('express');
var router = express.Router();
var userModel=require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



let loginMethod=(req,res,next)=>{
  let param={
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
  
  userModel.findOne(param,(err,doc)=>{
    if(err){
      res.json({'statusCode':0,'msg':err.message});
    }else{
      if(doc){
        res.cookie('userId',doc.userId,{path:'/'})
        res.json({'statusCode':1,'msg':'login auth...','result':doc.userName});
      }else{
        res.json({'statusCode':1,'msg':'user not find','result':null});
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
});





module.exports = router;
