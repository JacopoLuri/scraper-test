const puppeteer = require('puppeteer')
// launch an instace of Chromiun, go to url then apply a document.querySelectorAll on the page
async function scraper(url) {
  // launch chromiun
  const browser = await puppeteer.launch();
  // open a new page
  const page = await browser.newPage()
  // opening selected url
  await page.goto(url);
  // get an object with all images with the src, alt and dimensions
  const images = await page.$$eval('img', imgs => imgs.map(img => ({
    imageSrc: img.getAttribute('src'),
    imageAlt: img.getAttribute('alt'),
    imageWidth: img.naturalWidth,
    imageHeight: img.naturalHeight
  })));
  console.log(images)
  // close chromiun
  await browser.close()
}
// test url
scraper('https://www.sciencemag.org/news/2019/11/here-s-better-way-convert-dog-years-human-years-scientists-say')