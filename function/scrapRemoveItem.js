const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');

puppeteer.use(stealth());

async function scrapRemoveItem() {
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox'
            ],
            headless: true
        });
        const page = await browser.newPage();

        const maxAttempts = 5;
        let attempts = 0;
        let loggedIn = false;

        // Lakukan percobaan login hingga berhasil
        while (attempts < maxAttempts && !loggedIn) {
            await page.goto('https://moogold.com/account/');

            // Tunggu hingga elemen form login muncul
            await page.waitForSelector('#username');

            // Isi formulir login
            await page.type('#username', 'upinstore.vialogin@gmail.com');
            await page.type('#password', '@Dayan221078');
            await page.click('#customer_login > div.u-column1.col-1 > form > p:nth-child(3) > button');

            loggedIn = await page.waitForSelector('#post-2858 > div > div > nav').then(() => true).catch(() => false);

            if (!loggedIn) {
                console.log('Gagal login, mencoba lagi...');
            }
            
            attempts++;
        }

        // Penanganan jika login gagal setelah sejumlah maksimum percobaan
        if (!loggedIn) {
            console.log('Gagal login setelah mencoba beberapa kali. Berhenti.');
            await browser.close();
            return { msg: 'Gagal login setelah mencoba beberapa kali.' };
        }

        // Lakukan tindakan setelah berhasil login
        await page.click('a.cart-contents');

        await page.waitForSelector('#page > div.storefront-breadcrumb > div > nav')
        // Lakukan perulangan sampai elemen .remove tidak tersedia
        let removeButtonExists = true;
        while (removeButtonExists) {
            try {
                await page.$('#post-2856 > div > div > form > table > tbody > tr:nth-child(1) > td.product-remove > a#post-2856 > div > div > form > table > tbody > tr:nth-child(1) > td.product-remove');
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.click('#post-2856 > div > div > form > table > tbody > tr:nth-child(1) > td.product-remove > a');
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (error) {
                console.log('Selector tidak ditemukan. Berhenti perulangan.');
                removeButtonExists = false;
            }
        }

        await browser.close();
        console.log('Berhasil remove card');
        return { msg: 'Berhasil Remove Card.' };

    } catch (error) {
        console.error("error", error);
        return { 
            msg: `Error: ${error}`
        };
    }
}

module.exports = { scrapRemoveItem };