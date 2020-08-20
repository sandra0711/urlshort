const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const app = express();

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', function (req, res) {
  // Отображает список коротких URL
  res.render('index', { title: 'Url shortener' });
});

app.post('/urls', function (req, res) {
  // Создать новый объект 'Url'
  // Автоматически создаются короткие  URL
  // Можно использовать presave в Mongoose
  // В конце надо вернуться обратно на домашнюю страницу
});

app.get('/:shortUrl', function (req, res, next) {
  // Перейти по короткому к соответствующему "длинному" URL
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
