const puppeteer = require('puppeteer');

const newsScrapper = async (newPage) => {
    let webUrl = "https://www.dailymirror.lk/breaking_news/108";

    if(newPage) {
        webUrl = `https://www.dailymirror.lk/breaking_news/108/${newPage}`
    }

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(webUrl, { timeout: 120000 });

    // await page.screenshot({path: 'breaking_news.png'});

    const brakingNewses = await page.evaluate(()=> {
        const brakingNewsElements = document.querySelectorAll('.lineg.mb-4');
        
        const brakingNewsArray = [];
        
        for (const brakingNewsElement of brakingNewsElements) {
            
            const data = {};
            const titleElement = brakingNewsElement.querySelector('.cat_title');
            const postedTimeElement = brakingNewsElement.querySelector('.timesss .text-secondary');
            const descriptionElement = brakingNewsElement.querySelector('.text-dark');
            const imageElement = brakingNewsElement.querySelector('.img-fluid.rounded.mb-3.mb-md-0');
            const linkElement = brakingNewsElement.querySelector('a[href][style]:nth-of-type(2)');

            if (titleElement) {
                const title = titleElement.innerText;
                data.title = title;
            }
            if (postedTimeElement) {
      
                const postedAt = postedTimeElement.innerText;

                data.postedAt = postedAt;

            }
            if (descriptionElement) {

                const description = descriptionElement.innerText;

                data.description = description;
            }

            if (imageElement) {
                
                const imageUrl = imageElement.getAttribute('src');
            
                data.imageUrl = imageUrl;

            }

            if (linkElement) {
                
                const link = linkElement.getAttribute('href');

                data.link = link;

            }

            if (Object.keys(data).length > 0) { 
                brakingNewsArray.push(data);
            }
        }
        
        return brakingNewsArray;
    });

    // console.log(brakingNewses);
    
    await browser.close();
    return brakingNewses;

}

module.exports = newsScrapper;