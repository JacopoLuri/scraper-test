const puppeteer = require('puppeteer')

// launch an instace of Chromiun, go to url then apply a document.queryselector
async function scraper(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage()
    await page.goto(url);
    

    


    //  this thing work
    const imgsUrl = await page.$$eval('img', imgs => imgs.map(img => img.getAttribute('src')));
    const imgsAlt = await page.$$eval('img', imgs => imgs.map(img => img.getAttribute('alt')));
 

    const imgObj = imgsUrl.map((img, index) => ({imageSrc: img, imageAlt: imgsAlt[index]}))

    console.log(imgObj)

    await browser.close()
}

scraper('https://www.sciencemag.org/news/2019/11/here-s-better-way-convert-dog-years-human-years-scientists-say')