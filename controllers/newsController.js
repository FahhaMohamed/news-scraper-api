const newsScrapper = require("../scrapper/newsScrapper");
const showNewsScrapper = require("../scrapper/showNewsScrapper");
const ErrorHandler = require('../utils/errorHandler');

exports.getNewsList = async (req, res, next) => {

    try {
        const newses = await newsScrapper();
        res.status(200).json({
            success : true,
            message : "Successfully fetched the list of news.",
            newses : {
                count : newses.length,
                data : newses,
            }
        });
    } catch (error) {
        return next(new ErrorHandler('Failed to fetch news list.', 400));
    }
}

exports.showNews = async (req, res, next) => {
    const webUrl = req.query.url;

    if(!webUrl) {
        return next(new ErrorHandler('Url is required.', 400));
    }

    try {
        const news = await showNewsScrapper(webUrl);
        res.status(200).json({
            status : true,
            message : "Successfully fetched the news details.",
            news,
        });
    } catch (error) {
        return next(new ErrorHandler('Failed to fetch news details.', 404));
    }

    
}