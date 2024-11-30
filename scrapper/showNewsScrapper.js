const puppeteer = require("puppeteer");

const showNewsScrapper = async (webUrl) => {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(webUrl, { timeout: 120000 });

    const newsDetails = await page.evaluate(() => {
        const news = {};
        const titleElement = document.querySelector('.inner_header.mmfpmf');
        const contentElement = document.querySelectorAll('.a-content.mmfpmf p');
        const imageElement = document.querySelector('.a-content.mmfpmf img');
        const videoUrlElement = document.querySelector('.a-content.mmfpmf .fluidvids-item');
        const postedAtElement = document.querySelector('.d-flex.justify-content-between .text-decoration-none.me-3');

        if (titleElement) {
            news.title = titleElement.innerHTML; 
        }

        if (postedAtElement) {
            //<p> <a>content</a> content </p>
            const content = Array.from(postedAtElement.childNodes)
                .filter((node) => node.nodeType === Node.TEXT_NODE) 
                .map((node) => node.textContent.trim())
                .join(" ")
                .trim();
        
            news.postedAt = content;
        }

        //<p> <p><div>...</div></p> <p>content</p> <p></p> </p> ==> <p> another tags, with content, empty tag </p>
        news.content = Array.from(contentElement).map((p) => {
       
            let textContent = p.textContent;

            if (!textContent) {
                return null;
            }
        
            return textContent;
            

        }).filter((content) => content !== null); 

        if(imageElement) {
            news.imageUrl = imageElement.getAttribute('src');
        }

        if(videoUrlElement) {
            news.videoUrl = videoUrlElement.getAttribute('src');
        }
        
        return news;
    });

    console.log(newsDetails);
    

    await browser.close();
}

module.exports = showNewsScrapper;