const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(stealth());

async function scrapTopupMl(skuid, userid, zoneid) {
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox'
            ],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://moogold.com/product/mobile-legends-indonesia/');

        await page.waitForSelector('select.aelia_cs_currencies');
        await page.select('select.aelia_cs_currencies', 'MYR');

        await page.waitForSelector('ul.variable-items-wrapper.button-variable-items-wrapper');
        await page.click(`li[data-value="${skuid}"]`);

        await page.waitForSelector('#field_wcpa-text-5f6f144f8ffd7');
        await page.type('#field_wcpa-text-5f6f144f8ffd7', userid);

        await page.waitForSelector('#field_wcpa-text-1601115253775');
        await page.type('#field_wcpa-text-1601115253775', zoneid);

        await page.waitForSelector('#product-2362359 div.woocommerce-variation-add-to-cart > button');
        await page.click('#product-2362359 div.woocommerce-variation-add-to-cart > button');
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        await page.waitForSelector('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(1) > button');
        await page.click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div:nth-child(1) > button');

        await new Promise(resolve => setTimeout(resolve, 3000))
        await page.waitForSelector('#content > div > div.woocommerce > div > a');
        await page.click('#content > div > div.woocommerce > div > a')

        await page.waitForSelector('#post-2856 > div > div > div.cart-collaterals > div > div > a');
        await page.click('#post-2856 > div > div > div.cart-collaterals > div > div > a')

        await page.$('#post-7 > div > div > div.woocommerce-form-login-toggle > div > a.showlogin#post-7 > div > div > div.woocommerce-form-login-toggle > div')
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click('#post-7 > div > div > div.woocommerce-form-login-toggle > div > a.showlogin');
    
        await page.waitForSelector('#post-7 > div > div > form > p.form-row.form-row-first');
        await page.type('#username', 'upinstore.vialogin@gmail.com');
        await page.type('#password', '@Dayan221078');
        
        await page.click('#post-7 > div > div > form > p:nth-child(5) > button');

        await page.$('#terms#payment > ul > li.wc_payment_method.payment_method_moogold-wallet-payment-gateway')
        await new Promise(resolve => setTimeout(resolve, 1000));
        await page.click('#terms')

        await page.waitForSelector('#place_order');
        await page.click('#place_order')

        await page.waitForSelector('#post-7 > div > div > form.checkout.woocommerce-checkout > div.woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout > ul > li');
        const message = await page.$eval('#post-7 > div > div > form.checkout.woocommerce-checkout > div.woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout > ul > li', element => element.textContent.trim());
        console.log('Keterangan:', message);
        
        await browser.close();

        return {
            msg: message
        };
        

    } catch (error) {
        console.error("error", error);
        return {
            msg: `Error : ${error}`
        };
    }
}

module.exports = { scrapTopupMl };