const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');

puppeteer.use(stealth());

async function scrapHarga() {
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox'
            ],
            headless: true
        });
        const page = await browser.newPage();
        await page.goto('https://moogold.com/product/mobile-legends-indonesia/');

        // Tunggu hingga elemen <select> muncul
        await page.waitForSelector('select.aelia_cs_currencies');

        // Pilih elemen <select> dan ubah nilai menjadi MYR
        await page.select('select.aelia_cs_currencies', 'MYR');

        // Tunggu hingga elemen <ul> muncul
        await page.waitForSelector('ul.variable-items-wrapper.button-variable-items-wrapper');

        // Ambil semua elemen <li> di dalam elemen <ul>
        const liElements = await page.$$('ul.variable-items-wrapper.button-variable-items-wrapper li');

        const productList = [];

        // Loop melalui setiap elemen <li>
        for (let i = 0; i < liElements.length; i++) {
            // Ambil nama produk dari setiap elemen <li>
            const productNameElement = await liElements[i].$eval('div > span', span => span.textContent.trim());
            const productName = productNameElement.trim();

            // Klik pada elemen <li>
            await liElements[i].click();

            try {
                // Ambil data harga dari elemen yang muncul setelah mengklik
                const priceElement = await page.$('div.woocommerce-variation.single_variation > div.woocommerce-variation-price > span > ins');
                const priceText = await page.evaluate(element => element.textContent.trim(), priceElement);
                const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // Menguraikan angka dari teks harga

                productList.push({ produk: productName, harga: price });
            } catch (error) {
                // Jika elemen ins tidak ditemukan, ambil nilai dari elemen sebelumnya
                const previousPriceElement = await page.$('div.woocommerce-variation.single_variation > div.woocommerce-variation-price > span');
                const previousPriceText = await page.evaluate(element => element.textContent.trim(), previousPriceElement);
                const previousPrice = parseFloat(previousPriceText.replace(/[^\d.]/g, '')); // Menguraikan angka dari teks harga

                productList.push({ produk: productName, harga: previousPrice });
            }
        }

        await browser.close();

        fs.writeFileSync('./produk/mobile-legends.json', JSON.stringify(productList, null, 2));
        console.log("Data telah disimpan pada file direktori produk")
        return {
            status: 200,
            msg: "Data telah disimpan pada file direktori produk"
        };
    } catch (error) {
        console.error("error", error)
        return {
            status: 500,
            msg: error.message
        };
    }
}
module.exports = { scrapHarga };