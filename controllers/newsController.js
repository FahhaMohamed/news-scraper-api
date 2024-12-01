const newsScrapper = require("../scrapper/newsScrapper");
const showNewsScrapper = require("../scrapper/showNewsScrapper");

exports.getNewsList = async (req, res, next) => {

    try {
        const newses = await newsScrapper();
        res.status(200).json({
            success : true,
            message : "Successfully fetched the list of news.",
            newses
        });
    } catch (error) {
        res.status(400).json({
            success : false,
            message : "Failed to fetch the list of news."
        });
    }
}

exports.showNews = async (req, res, next) => {
    const webUrl = req.query.url;

    try {
        const news = await showNewsScrapper(webUrl);
        res.status(200).json({
            status : true,
            message : "Successfully fetched the news details.",
            news,
        });
    } catch (error) {
        res.status(400).json({
            status : true,
            message : "Failed to fetch the news details.",
        });
    }

    
}