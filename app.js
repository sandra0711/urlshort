const { dbConnect } = require('./dbconnect.js');
dbConnect();

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const Url = require('./models/url.js');

const app = express();

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', async function (req, res) {
  // Отображает список коротких URL
  const urlsLong = await Url.find();
  res.render('index', { title: 'Url shortener', urlsLong });
});

app.post('/urls', async function (req, res) {
  const urlNew = new Url({ urlLong: req.body.longerUrl, urlShort: req.body.longerUrl.slice(0, 10), count: 0 });
  await urlNew.save();
  res.redirect('/');
  // Создать новый объект 'Url'
  // Автоматически создаются короткие  URL
  // Можно использовать presave в Mongoose
  // В конце надо вернуться обратно на домашнюю
});

app.get('/:urlRed', async function (req, res) {
  console.log('это регпарамс', req.params.urlRed);
  const search = req.params.urlRed;
  const refLong = await Url.findOne({ urlShort: search });
  console.log(refLong);
  let countD = refLong.count + 1;
  await Url.updateOne({ urlShort: search }, {count: countD});
  res.redirect(`http://${refLong.urlLong}`)

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
