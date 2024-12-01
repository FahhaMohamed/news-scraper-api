const newsScrapper = require('./scrapper/newsScrapper');
const showNewsScrapper = require('./scrapper/showNewsScrapper');
const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, "config/config.env")});

app.listen(process.env.PORT, () => {
    console.log(`Server listening to the port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

(async () => {
    // await newsScrapper();
})();