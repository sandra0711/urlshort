const express = require('express');
const app = express();

const mongoose = require('mongoose');

const Url = require('./models/url.js');

app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

const dbName = 'urlShorter';
const dbPath = `mongodb://localhost:27017/${dbName}`;

mongoose.connect(dbPath, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log('Mongoose connected to %s name database', dbName) })
  .catch((err) => { console.log('Database connection error', err.message) });

app.get('/', async function (req, res) {
  // Отображает список коротких URL
  const urls = await Url.find();
  console.log(urls);
  res.render('index', { title: 'Url shortener', urls });
});

app.post('/urls', async function (req, res) {
  console.log('пришла');
  const urlNew = new Url({ urlLong: req.body.longerUrl, urlShort: req.body.longerUrl.slice(0, 10), count: 0 });
  await urlNew.save();
  console.log('ну вроде создала');
  res.redirect('/');
  // Создать новый объект 'Url'
  // Автоматически создаются короткие  URL
  // Можно использовать presave в Mongoose
  // В конце надо вернуться обратно на домашнюю
});

app.get('/:urlRed', async function (req, res) {
  console.log('это регпарамс', req.params.urlRed);
  const search = req.params.urlRed;
  const urlSearch = await Url.findOne({ urlShort: search });
  console.log(urlSearch);
  let countD = urlSearch.count + 1;
  await Url.updateOne({ urlShort: search }, { count: countD });
  res.redirect(`http://${urlSearch.urlLong}`)

  // Перейти по короткому к соответствующему "длинному" URL
});

const port = process.env.PORT || 3000;



app.listen(port, () => {
  console.log("Server started at http://localhost:%s/", port);
});
