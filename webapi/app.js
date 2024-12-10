var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
var hbs = require('hbs');

// Yêu cầu các mô hình (model)
require('./mongo/category.model');
require('./mongo/product.model');
require('./mongo/user.model');  // Thêm mô hình người dùng

// Yêu cầu các routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var categoryRouter = require('./routes/category');
var accountRouter = require('./routes/account');  // Thêm router account

var app = express();

// Thiết lập view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views/partials')); // Đăng ký các partials

// Sử dụng các middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/fr1')
    .then(() => console.log('Kết nối thành công'))
    .catch(err => console.log('Kết nối thất bại', err));

// Sử dụng các router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);
app.use('/account', accountRouter);  // Sử dụng router account

// Bắt lỗi 404 và chuyển tiếp đến trình xử lý lỗi
app.use(function(req, res, next) {
    next(createError(404));
});

// Trình xử lý lỗi
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
