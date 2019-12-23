const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
    // Отображает список коротких URL
    res.render('index', { title: 'Url shortener' });
});

router.post('/urls', function (req, res) {
    // Создать новый объект 'Url'
    // Автоматически создаются короткие  URL
    // Можно использовать presave в Mongoose
    // В конце надо вернуться обратно на домашнюю страницу
});

router.get('/:shortUrl', function (req, res, next) {
    // Перейти по короткому к соответствующему "длинному" URL
});

module.exports = router;
