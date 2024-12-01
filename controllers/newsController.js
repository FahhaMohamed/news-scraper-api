const newsScrapper = require("../scrapper/newsScrapper");
const showNewsScrapper = require("../scrapper/showNewsScrapper");
const ErrorHandler = require('../utils/errorHandler');

exports.getNewsList = async (req, res, next) => {


    const currentPageValue = parseInt(req.params.paginate, 10) || 0;

    const firstPageUrl = `${process.env.BASE_URL}/newsList`;
    const nextPageUrl = `${process.env.BASE_URL}/newsList/${currentPageValue + 30}`;
    var previousPageUrl;

    if (currentPageValue === 30) {
        previousPageUrl = `${process.env.BASE_URL}/newsList`;
    } else if (currentPageValue !== 0) {
        previousPageUrl = `${process.env.BASE_URL}/newsList/${currentPageValue - 30}`;
    } else {
        previousPageUrl = null;
    }
 

    try {
        const newses = await newsScrapper();
        res.status(200).json({
            success : true,
            message : "Successfully fetched the list of news.",
            newses : {
                count : newses.length,
                data : newses,
                previousPageUrl,
                nextPageUrl,
                firstPageUrl,
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