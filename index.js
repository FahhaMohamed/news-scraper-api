const newsScrapper = require('./scrapper/newsScrapper');

(async () => {
    await newsScrapper();
})();