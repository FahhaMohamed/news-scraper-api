const puppeteer = require('puppeteer');

const newsScrapper = async () => {
    const webUrl = "https://www.dailymirror.lk/breaking_news/108";

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(webUrl);

    // await page.screenshot({path: 'breaking_news.png'});

    const brakingNewses = await page.evaluate(()=> {
        const brakingNewsElements = document.querySelectorAll('.lineg.mb-4');
        
        const brakingNewsArray = [];

        for (const brakingNewsElement of brakingNewsElements) {
            
            const titleElement = brakingNewsElement.querySelector('.cat_title');
            const postedTimeElement = brakingNewsElement.querySelector('.timesss .text-secondary');
            const descriptionElement = brakingNewsElement.querySelector('.text-dark');
            const imageElement = brakingNewsElement.querySelector('.img-fluid.rounded.mb-3.mb-md-0');
            const linkElement = brakingNewsElement.querySelector('a[href][style]:nth-of-type(2)');

            if (titleElement && postedTimeElement && descriptionElement && imageElement && linkElement) {
                const title = titleElement.innerText;
                const postedAt = postedTimeElement.innerText;
                const description = descriptionElement.innerText;
                const imageUrl = imageElement.getAttribute('src');
                const link = linkElement.getAttribute('href');

                const data = {
                    title,
                    postedAt,
                    description,
                    imageUrl,
                    link
                };


                brakingNewsArray.push(data);
            }
        }
        
        return brakingNewsArray;
    });

    console.log(brakingNewses);
    

    await browser.close();
}

module.exports = newsScrapper;