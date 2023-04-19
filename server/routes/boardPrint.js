const express = require('express');
const router = express.Router();

const { getArticles, writeArticle } = require('../controller/boardController');
const { checkLoggedIn } = require('../controller/userController');

router.post('/', checkLoggedIn, getArticles);
router.post('/write', checkLoggedIn, writeArticle);

module.exports = router;
