const puppeteer = require('puppeteer')

// launch an instace of Chromiun, go to url then apply a document.querySelectorAll on the page

async function scraper(url) {
    // launch chromiun
    const browser = await puppeteer.launch();
    // open a new page
    const page = await browser.newPage()
    // opening selected url
    await page.goto(url);
    
    // query here with $$eval
    const imgsUrl = await page.$$eval('img', imgs => imgs.map(img => img.getAttribute('src')));
    const imgsAlt = await page.$$eval('img', imgs => imgs.map(img => img.getAttribute('alt')));
 
    // creating the obj for the FE
    const imgObj = imgsUrl.map((img, index) => ({imageSrc: img, imageAlt: imgsAlt[index]}))

    // close chromiun
    await browser.close()
}

// test url
scraper('https://www.sciencemag.org/news/2019/11/here-s-better-way-convert-dog-years-human-years-scientists-say')