const newsScrapper = require('./scrapper/newsScrapper');
const showNewsScrapper = require('./scrapper/showNewsScrapper');

(async () => {
    await newsScrapper();
})();