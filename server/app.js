var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//1.引入自定义路由
var goodsRouter = require('./routes/goods');

var ejs = require('ejs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.engine('.html', ejs.__express)
app.set('view engine', 'html')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let blackRouterList = ['/goods/addcart','/users/address']

app.use((req, res, next) => {
  let userCookie = req.cookies.userId,
    queryPath = req.path;
  let isBlack = blackRouterList.some((item) => {
    return item === queryPath
  })
  //1.2 如果取到cookie则继续执行中间件，如果请求接口为黑名单则返回未登录信息
  if (userCookie) {
    next()
  } else {
    if (isBlack) {
      res.json({
        'statusCode': 0, 'msg': '请登录', 'result': null
      })
    } else {
      next()
    }
  }

})
app.use('/', indexRouter);
app.use('/users', usersRouter);
//1.1使用自定义路由
app.use('/goods', goodsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
