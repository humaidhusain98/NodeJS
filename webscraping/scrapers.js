const puppeteer = require('puppeteer');

async function scrapeProduct(url)
{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    try{
    const data = await page.evaluate(() => document.querySelector('').outerHTML);
    console.log(data);
    }
    catch(e)
    {
        console.log("error occured");
    }
    
    // const [el]= await page.$x('/html');


    // if(el){
    // const src= await el.getProperty('textContent');
    // console.log(src.toString());
    // // const srcText = await src.jsonValue();
    // // console.log({srcText});

    // }
    // else
    // {
    //     console.log("Error Occured");
    // }
    // const [el2]= await page.$x('//*[@id="price"]');

    // const txt= await el2.getProperty('textContent');
    // const rawtxt = await txt.jsonValue();
    // console.log({rawtxt});

    browser.close();

}

scrapeProduct('http://localhost:4200/');
