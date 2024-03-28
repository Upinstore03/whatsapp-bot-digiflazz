const fs = require("fs");
const chalk = require("chalk");
const moment = require("moment-timezone");
const axios = require("axios");


// Mengatur zona waktu menjadi Asia/Makassar
moment.tz.setDefault('Asia/Makassar');

// Mengatur format tanggal dan waktu
global.tglserver = moment().locale('id').format('dddd, DD MMMM YYYY');
global.wktserver = moment().format('HH:mm:ss ([WITA])');

global.tanggalserver = moment().format('DD/MM/YY');
global.waktuserver = moment().format('HH:mm:ss');

// Website Api
global.APIs = {
  zenz: "https://api.zahwazein.xyz",
  lol: "https://api.lolhuman.xyz",
};

// Apikey Website Api
global.APIKeys = {
  "https://api.zahwazein.xyz": "zenzkey_cc2253831982",
  "https://api.lolhuman.xyz": "aea6f0ce59590d481b4a636b",
};
// Zenzkey & Lolkey
global.zenzkey = "zenzkey_cc2253831982";
global.lolkey = "aea6f0ce59590d481b4a636b";

// Buyer_Sku_Code PASCABAYAR
global.skucodepln = "Your Sku Code";
global.skucodebpjs = "Your Sku Code";
global.skucodepdam = "Your Sku Code";

let http = require('http')
            http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
            resp.on('data', function(ip) {
                (global.ipserver = ip);
            })
          })
// Berfungsi Untuk Hit Api & Mengirim Data Headers
const fetchJson = async (url, options = {}) => {
  try {
      const res = await axios({
          method: 'GET',
          url: url,
          headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
          },
          ...options
      })
      return res.data
  } catch (err) {
      return err
  }
}

(async () => {
  let fetch = await fetchJson(`https://www.tohastore09.com/index.json`)
  global.versionscript = fetch.version
  global.pesannya = fetch.message
})();

// Setting Limit
global.limitrate = "1"; // Pengurangan Satu Limit Setiap Trx
global.hargalimit = "200"; // Harga 1 Limit Rp
global.profit = `${global.hargalimit} / ${global.limitrate}`;   
// End Setting Limit 

// Set Minimal
global.minimaldepo = "10000";
global.minimallimit = "100";
// End Minimal

global.nomorKu = "6282264748013@s.whatsapp.net"
global.packname = "Upin_Store";
global.author = "Farhat-Dayan";
global.session = "farhat-session";
global.mess = {
  wait: "Posabara...",
  owner: "Fitur Khusus Owner Bot",
  waitdata: "Melihat Data Terkini...",
  admin: "Fitur Khusus Admin Group!",
  group: "Fitur Digunakan Hanya Untuk Group!",
  private: 'Fitur Digunakan Hanya Untuk Private Chat!',
  botAdmin: "Bot Harus Menjadi Admin Terlebih Dahulu!",
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
