const express = require('express');
const { getNewsList, showNews } = require('../controllers/newsController');
const router = express.Router();


router.route('/newsList').get(getNewsList);
router.route('/showNews').get(showNews);

module.exports = router;