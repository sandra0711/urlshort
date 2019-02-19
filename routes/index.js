var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // Позволяет создавать короткие  URL
    // Отображает список коротких URL
    res.render('index', { title: 'Url shortener' });
});

router.post('/urls', function(req, res) {
    // Создать новый объект 'Url'
    // И вернуться обратно на домашнюю страницу
});

router.get('/:shortUrl', function(req, res, next) {
    // Перейти по короткому к соответствующему "длинному" URL
});

module.exports = router;
