require("./config");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
// new module
const axios = require("axios");
const os = require("os");
const { exec } = require("child_process");
const speed = require("performance-now");
const { sizeFormatter } = require("human-readable");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const moment = require("moment-timezone");
const md5 = require("md5");
const crypto = require("crypto");
const { set } = require("lodash");
const jam = moment.tz("asia/jakarta").format("HH:mm:ss");
const tanggal = moment().tz("Asia/Jakarta").format("ll");
// end

//code by
let money = JSON.parse(fs.readFileSync("./src/balance.json"));
let limit = JSON.parse(fs.readFileSync("./src/limit.json"));
let signup = JSON.parse(fs.readFileSync("./src/user.json"));
const owner_database = JSON.parse(fs.readFileSync("./src/owner.json"));
const ban = JSON.parse(fs.readFileSync("./src/banned.json"));
const isBanned = JSON.parse(fs.readFileSync("./src/banned.json"));
const PathAuto = "./src/depo/";
const { farhatcekallid } = require("../function/cekallid");
const { scrapHarga } = require("../function/scrapHargaIndo");
const { scrapHargaPubg } = require("../function/scrapPricePubg");
const { scrapTopupMl } = require("../function/scrapTopupMl");
const { scrapRemoveItem } = require("../function/scrapRemoveItem");
const { list1000 } = require("../produk/mobile-legends.json");
const { listPubg } = require("../produk/pubg.json");
const { orderPaydisini } = require("../function/paydisini");
const { fetchDataAndUpdate } = require("../function/getDataDififlazz");
const { connectToMongo } = require("../function/mongodb");
const { orderDigiflazz } = require("../function/digiflazz");
const {
  getUsernamerMl,
  getUserFreeFire,
  getUserGenshin,
  getUserValo,
} = require("../function/usernameml");
const { getCallbackFromMongo } = require("../function/getCallback");
// end code

const db_respon_list = JSON.parse(fs.readFileSync("./src/db_list.json"));
const {
  addResponList,
  delResponList,
  isAlreadyResponList,
  isAlreadyResponListGroup,
  sendResponList,
  updateResponList,
  getDataResponList,
} = require("../src/function_list");

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
const day = currentDate.getDate().toString().padStart(2, "0");
const hours = currentDate.getHours().toString().padStart(2, "0");
const minutes = currentDate.getMinutes().toString().padStart(2, "0");
const seconds = currentDate.getSeconds().toString().padStart(2, "0");
global.serialNumber = `ORDER${seconds}${minutes}${hours}${day}${month}${year}`;

// is function
const formatp = sizeFormatter({
  std: "JEDEC", //'SI' = default | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const isUrl = (url) => {
  return url.match(
    new RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
      "gi"
    )
  );
};

const jsonformat = (string) => {
  return JSON.stringify(string, null, 2);
};

const getGroupAdmins = (participants) => {
  let admins = [];
  for (let i of participants) {
    i.admin === "superadmin"
      ? admins.push(i.id)
      : i.admin === "admin"
      ? admins.push(i.id)
      : "";
  }
  return admins || [];
};

// Berfungsi Untuk Hit Api & Mengirim Data Headers
const fetchJson = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
      },
      ...options,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const runtime = function (seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor((seconds % (3600 * 24)) / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
};

function formatmoney(n, opt = {}) {
  if (!opt.current) opt.current = "IDR";
  return n.toLocaleString("id", { style: "currency", currency: opt.current });
}

function generateRandomString(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
}

function acakindong(min, max = null) {
  if (max !== null) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return Math.floor(Math.random() * min) + 1;
  }
}

module.exports = Farhat = async (farhat, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId ||
          m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
          m.text
        : "";

    var budy = typeof m.text == "string" ? m.text : "";
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const chath =
      m.mtype === "conversation" && m.message.conversation
        ? m.message.conversation
        : m.mtype == "imageMessage" && m.message.imageMessage.caption
        ? m.message.imageMessage.caption
        : m.mtype == "documentMessage" && m.message.documentMessage.caption
        ? m.message.documentMessage.caption
        : m.mtype == "videoMessage" && m.message.videoMessage.caption
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage" && m.message.extendedTextMessage.text
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage" &&
          m.message.buttonsResponseMessage.selectedButtonId
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "templateButtonReplyMessage" &&
          m.message.templateButtonReplyMessage.selectedId
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "messageContextInfo"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : "";
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await farhat.decodeJid(farhat.user.id);
    const isCreator = [botNumber, ...owner_database]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const isBanned = ban.includes(m.sender);
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const fatkuns = m.quoted || m;
    const quoted =
      fatkuns.mtype == "buttonsMessage"
        ? fatkuns[Object.keys(fatkuns)[1]]
        : fatkuns.mtype == "templateMessage"
        ? fatkuns.hydratedTemplate[Object.keys(fatkuns.hydratedTemplate)[1]]
        : fatkuns.mtype == "product"
        ? fatkuns[Object.keys(fatkuns)[0]]
        : m.quoted
        ? m.quoted
        : m;
    const mime = (quoted.msg || quoted).mimetype || "";
    const qmsg = quoted.msg || quoted;
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];
    // Manggil Kunci Api
    const usernamekey = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .digiflazz.usernamekey;
    const productionkey = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .digiflazz.productionkey;
    const atlantickey = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .atlanticpedia.atlantickey;
    const reselerkey = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .vip_reseller.resellerkey;
    const reseleridkey = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .vip_reseller.reselleridkey;
    const merchantapigames = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .apigames.merchantapigames;
    const secretapigames = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .apigames.secretapigames;
    const signatureapigames = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .apigames.signatureapigames;
    const api_paydisini = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .paydisini.apikeypaydisini;
    const url_paydisini = JSON.parse(fs.readFileSync("./src/api_key.json"))
      .paydisini.url_paydisini;

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);

      farhat.groupParticipantsUpdate(m.chat, [m.sender], "remove");
    };

    // Group
    const groupMetadata = m.isGroup
      ? await farhat.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : "";
    const isGroup = m.isGroup;
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isUser = signup.includes(sender);

    // Start Money
    const addMonUser = (sender, amount) => {
      let position = false;
      Object.keys(money).forEach((i) => {
        if (money[i].id === sender) {
          position = i;
        }
      });
      if (position === false) {
        console.log(`Sender ID ${sender} not found in balance list`);
        return false;
      } else if (position !== false) {
        money[position].money += amount;
        fs.writeFileSync("./src/balance.json", JSON.stringify(money));
        return true;
      }
    };

    const moneyAdd = (sender, amount) => {
      let position = false;
      Object.keys(money).forEach((i) => {
        if (money[i].id == sender) {
          position = i;
        }
      });
      if (position !== false) {
        money[position].money -= amount;
        fs.writeFileSync("./src/balance.json", JSON.stringify(money));
      }
    };
    const getMonUser = (sender) => {
      let fiendh = false;
      for (let potonlmt of money) {
        if (potonlmt.id === sender) {
          global.userPoton = potonlmt.money;
          fiendh = true;
          return global.userPoton;
        }
      }
      //function adven
      if (fiendh === false) {
        let obj = { id: sender, money: 0 };
        money.push(obj);
        fs.writeFileSync("./src/balance.json", JSON.stringify(money));
      }
    };
    // End Money

    // Start Limt Trx
    const addLimUser = (sender, amount) => {
      let position = false;
      Object.keys(limit).forEach((i) => {
        if (limit[i].id === sender) {
          position = i;
        }
      });
      if (position === false) {
        console.log(`Sender ID ${sender} not found in limit list`);
        return false;
      } else if (position !== false) {
        limit[position].limit += amount;
        fs.writeFileSync("./src/limit.json", JSON.stringify(limit));
        return true;
      }
    };

    const limitAdd = (sender, amount) => {
      let position = false;
      Object.keys(limit).forEach((i) => {
        if (limit[i].id == sender) {
          position = i;
        }
      });
      if (position !== false) {
        limit[position].limit -= amount;
        fs.writeFileSync("./src/limit.json", JSON.stringify(limit));
      }
    };
    const getLimUser = (sender) => {
      let fiendh = false;
      for (let potonlmt of limit) {
        if (potonlmt.id === sender) {
          global.userPoton = potonlmt.limit;
          fiendh = true;
          return global.userPoton;
        }
      }
      //function adven
      if (fiendh === false) {
        let obj = { id: sender, limit: 0 };
        limit.push(obj);
        fs.writeFileSync("./src/limit.json", JSON.stringify(limit));
      }
    };
    // End Limit Trx

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    // Jika ada user
    if (isCmd2 && !isUser) {
      signup.push(sender);
      fs.writeFileSync("./src/user.json", JSON.stringify(signup, null, 2));
    }

    if (isCmd2 && !m.isGroup) {
      console.log(
        chalk.black(chalk.bgGreen("[ PESAN ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("Dari"),
        chalk.green(pushname),
        chalk.yellow(
          `[ ${m.sender.replace("@s.whatsapp.net", "@s.whatsapp.net")} ]`
        )
      );
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgGreen("[ PESAN ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("Dari"),
        chalk.green(pushname),
        chalk.yellow(
          `[ ${m.sender.replace("@s.whatsapp.net", "@s.whatsapp.net")} ]`
        ),
        chalk.blueBright("Group"),
        chalk.green(groupName)
      );
    }

    if (
      !isCmd2 &&
      m.isGroup &&
      isAlreadyResponList(from, chath, db_respon_list)
    ) {
      var get_data_respon = getDataResponList(from, chath, db_respon_list);
      if (get_data_respon.isImage === false) {
        farhat.sendMessage(
          from,
          { text: sendResponList(from, chath, db_respon_list) },
          { quoted: m }
        );
      } else {
        farhat.sendMessage(
          from,
          {
            image: await getBuffer(get_data_respon.image_url),
            caption: get_data_respon.response,
          },
          { quoted: m }
        );
      }
    }

    if (isCmd2) {
      switch (command) {
        case "getprice":
          {
            const getPrice = await fetchDataAndUpdate();
            m.reply(getPrice);
          }
          break;

        case "listml":
          {
            let dataml = JSON.parse(
              fs.readFileSync("./src/database/digiflazz.json")
            );
            let listProductml = "*「 LIST DIAMOND ML 」*\n";
            dataml.sort(function (a, b) {
              return a.price - b.price;
            });
            dataml.forEach(function (product) {
              if (product.brand === "MOBILE LEGENDS") {
                if (product.seller_product_status === true) {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (✅)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )}\n\n`;
                } else {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (❌)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )} \n\n`;
                }
              }
            });
            listProductml +=
              "\n\n*Example* :\n#FAG KD_Produk.UserId.ZoneId\n\n*Contoh* :\n#FAG ML86.58XXXXXXXX.8XXX\n\n*Keterangan*\n✅ = Produk Tersedia\n❌ = Produk Tidak Tersedia";
            reply(`${listProductml}`);
          }
          break;

        case "listff":
          {
            let dataml = JSON.parse(
              fs.readFileSync("./src/database/digiflazz.json")
            );
            let listProductml = "*「 LIST DIAMOND FF 」*\n";
            dataml.sort(function (a, b) {
              return a.price - b.price;
            });
            dataml.forEach(function (product) {
              if (product.brand === "FREE FIRE") {
                if (product.seller_product_status === true) {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (✅)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )}\n\n`;
                } else {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (❌)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )} \n\n`;
                }
              }
            });
            listProductml +=
              "\n\n*Example* :\n#FAG KD_Produk.UserId\n\n*Contoh* :\n#FAG FF70.58XXXXXXXX\n\n*Keterangan*\n✅ = Produk Tersedia\n❌ = Produk Tidak Tersedia";
            reply(`${listProductml}`);
          }
          break;

        case "listgenshin":
          {
            let dataml = JSON.parse(
              fs.readFileSync("./src/database/digiflazz.json")
            );
            let listProductml = "*「 LIST Genesis Crystal 」*\n";
            dataml.sort(function (a, b) {
              return a.price - b.price;
            });
            dataml.forEach(function (product) {
              if (product.brand === "Genshin Impact") {
                if (product.seller_product_status === true) {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (✅)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )}\n\n`;
                } else {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (❌)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )} \n\n`;
                }
              }
            });
            listProductml +=
              "\n\n*Example* :\n#FAG KD_Produk.UserId.Server\n\n*Contoh* :\n#FAG GI60.58XXXXXXXX.os_asia\n\n*Keterangan*\n✅ = Produk Tersedia\n❌ = Produk Tidak Tersedia";
            reply(`${listProductml}`);
          }
          break;

        case "listff":
          {
            let dataml = JSON.parse(
              fs.readFileSync("./src/database/digiflazz.json")
            );
            let listProductml = "*「 LIST DIAMOND FF 」*\n";
            dataml.sort(function (a, b) {
              return a.price - b.price;
            });
            dataml.forEach(function (product) {
              if (product.brand === "FREE FIRE") {
                if (product.seller_product_status === true) {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (✅)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )}\n\n`;
                } else {
                  listProductml += `*Nama* : ${
                    product.product_name
                  } (❌)\n*Harga* : ${
                    product.price
                  }\n*Kode Produk* : ${product.buyer_sku_code.replace(
                    "",
                    ""
                  )} \n\n`;
                }
              }
            });
            listProductml +=
              "\n\n*Example* :\n#FAG KD_Produk.UserId<TAG>\n\n*Contoh* :\n#FAG VALO300.USERNAME#XXXX\n\n*Keterangan*\n✅ = Produk Tersedia\n❌ = Produk Tidak Tersedia";
            reply(`${listProductml}`);
          }
          break;

        case "viewuser":
          {
            if (!isCreator) return m.reply(mess.owner);
            const sign = crypto
              .createHash("md5")
              .update(api_paydisini + "Profile")
              .digest("hex");
            const config = {
              method: "POST",
              url: url_paydisini,
              data: { key: api_paydisini, request: "profile", signature: sign },
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            };

            axios(config)
              .then(function (response) {
                const res = response.data;
                m.reply(
                  `*── 「 PROFILE USER 」 ──*\n\nNama Lengkap : ${res.data.full_name}\nMerchant : ${res.data.merchant}\nTelephone : ${res.data.telephone}\nEmail : ${res.data.email}\nSaldo : ${res.data.saldo}\nSaldo Tertahan : ${res.data.saldo_tertahan}`
                );
              })
              .catch(function (error) {
                console.log("Gagal:", error.message);
              });
          }
          break;

        case "fag":
          {
            if (!isCreator) return m.reply(mess.owner);
            let splitText = text.split(".");
            let sku_code = splitText[0].toUpperCase();
            let userid = splitText[1];
            let vzoneid = splitText[2].toLowerCase();

            // Memeriksa apakah sku_code dan userid ada
            if (!sku_code || !userid) {
              return reply(
                `*Example* :\n${
                  prefix + command
                } KD_Produk.Userid.Zoneid\n\n*Contoh* :\n${
                  prefix + command
                } ML5.583716368.8327\n`
              );
            }

            let currentDate = new Date();
            let code_unique = `ORDER${currentDate.getSeconds()}${currentDate.getMinutes()}${currentDate.getHours()}${currentDate
              .getDate()
              .toString()
              .padStart(2, "0")}${(currentDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}${currentDate.getFullYear()}`;

            let tujuanDigi = vzoneid ? `${userid}${vzoneid}` : userid; // Jika vzoneid ada, gunakan userid+vzoneid, jika tidak, gunakan hanya userid
            const harga = JSON.parse(
              fs.readFileSync("./src/database/digiflazz.json")
            );

            // Temukan entri dengan sku_code yang sesuai
            const product = harga.find(
              (product) => product.buyer_sku_code === sku_code
            );

            if (product) {
              // Jika sku_code ditemukan, ambil harga
              let price = product.price;
              let nickname = ""; // Default nickname kosong

              // Memeriksa apakah SKU code mengandung kata kunci
              if (sku_code.includes("ML")) {
                // Jika mengandung ML, gunakan getUsernamerMl
                nickname = await getUsernamerMl(userid, vzoneid);
              } else if (sku_code.includes("FF")) {
                // Jika mengandung FF, gunakan getUserFreeFire
                nickname = await getUserFreeFire(userid, vzoneid);
              } else if (sku_code.includes("GI")) {
                // Jika mengandung GI, gunakan getUserGenshin
                nickname = await getUserGenshin(userid, vzoneid);
              } else if (sku_code.includes("VALO")) {
                // Jika mengandung VALO, gunakan getUserValo
                nickname = await getUserValo(userid, vzoneid);
              } else {
                // Jika tidak mengandung kata kunci, nickname diset menjadi string kosong
                nickname = "";
              }

              const paydis = await orderPaydisini(price, code_unique);
              const fixPayDis = { url: paydis };
              await connectToMongo(code_unique, price);
              const canvas = `*🧾 MENUNGGU PEMBAYARAN 🧾*\n\nProduk ID : ${product.buyer_sku_code}\nNickname : ${nickname}\nTujuan : ${tujuanDigi}\n\n「  DETAIL PRODUCT ✅  」\nKategori : ${product.category}\nBrand : ${product.brand}\nProduk : ${product.product_name}\nHarga : Rp ${product.price}\nWaktu : ${tanggalserver} ${waktuserver}\n\nPeriksa apakah inputan sudah benar, jika salah maka akan gagal.\n\nSilahkan scan Qris di atas dan lakukan pembayaran, jika 30 menit tidak memmbayar maka akan otomatis tercalcel.\n`;
              farhat.sendMessage(from, { image: fixPayDis, caption: canvas });

              // Menunggu hingga pembayaran selesai atau dibatalkan
              const getPay = await getCallbackFromMongo(code_unique);

              // Memeriksa hasil pembayaran
              if (getPay === "Success") {
                await sleep(1000);
                // Melakukan operasi pembayaran jika pembayaran berhasil
                const usernyaDigi = await orderDigiflazz(
                  sku_code,
                  tujuanDigi,
                  code_unique
                );
                console.log(usernyaDigi);
                m.reply(
                  `*── 「 DETAIL TRANSAKSI 」 ──*\n\n➤ *Ref ID* : ${usernyaDigi.ref_id}\n➤ *Status* : ${usernyaDigi.status}\n➤ *Brand* : ${product.brand}\n➤ *Item* : ${product.product_name}\n➤ *Nickname* : ${nickname}\n➤ *Tujuan* : ${tujuanDigi}\n➤ *Pesan* : ${usernyaDigi.message}\n➤ *Tanggal* : ${tanggalserver}\n➤ *Jam* : ${waktuserver}`
                );
              } else if (getPay === "Canceled") {
                // Memberikan tanggapan jika pembayaran dibatalkan
                reply(`Pembayaran telah dibatalkan.`);
              }
            } else {
              console.log(`SKU ${sku_code} tidak ditemukan.`);
              reply(`Kode Produk *${sku_code}* tidak ditemukan.`);
            }
          }
          break;

        case "help":
        case "menu":
          if (isBanned) return m.reply(`*You Have Been Banned*`);
          anu = `╭─❑ 「 INFO USER 」 ❑──\n│ ➤ _Name: ${
            m.pushName
          }_\n│ ➤ _Uid: ${sender.replace(
            "@s.whatsapp.net",
            ""
          )}_\n│ ➤ _Runtime: ${runtime(process.uptime())}_\n│ ➤ _User Length: ${
            signup.length
          }_\n╰❑\n\n╭─❑ 「 LIST MENU CENTER 」 ❑─\n├• 📍 ${prefix}listml (Melihat list ml)\n├• 📍 ${prefix}fag (Topup)\n╰❑\n\n*_📅 Tanggal Server : ${tanggalserver}_*\n*_🕒 Waktu Server : ${waktuserver}_*`;
          farhat.sendText(m.chat, anu, m);
          break;

        case "ownermenu":
          if (!isCreator) throw mess.owner;
          srh = `*_Owner Menu Page ${versionscript}_*\n\n╭─❑ 「 OWNER MENU PAGE 」 ❑─\n├• 📍 ${prefix}caradigi (owner only)\n├• 📍 ${prefix}addmoney 1000|62857xxxxxxxx\n├• 📍 ${prefix}addlimit 100|62857xxxxxxxx\n├• 📍 ${prefix}setapikey [option]\n├• 📍 ${prefix}cekapi\n├• 📍 ${prefix}updatelayanan\n├• 📍 ${prefix}cekatc (balance)\n├• 📍 ${prefix}cekvip (balance)\n├• 📍 ${prefix}cekdigi (balance)\n├• 📍 ${prefix}listban\n├• 📍 ${prefix}listuser\n├• 📍 ${prefix}listowner\n├• 📍 ${prefix}ban 6285xxxxxxxxx\n├• 📍 ${prefix}unban 6285xxxxxxxxx\n├• 📍 ${prefix}addowner 6285xxxxxxxxx\n├• 📍 ${prefix}delowner 6285xxxxxxxxx\n╰❑`;
          farhat.sendText(m.chat, srh, m);
          break;

        case "listuser":
          {
            if (!isCreator) throw mess.owner;
            teks = "*_List User :)_*\n\n";
            for (let pengguna of signup) {
              teks += `- ${pengguna}\n`;
            }
            teks += `\n*_Total User : ${signup.length}_*`;
            farhat.sendMessage(
              m.chat,
              { text: teks.trim() },
              "extendedTextMessage",
              { quoted: m, contextInfo: { mentionedJid: signup } }
            );
          }
          break;
        case "listowner":
          {
            if (!isCreator) throw mess.owner;
            teks = "*_List Owner 📌_*\n\n";
            for (let yoi of owner_database) {
              teks += `🌟 ${yoi}\n`;
            }
            teks += `\n*_Total Owner : ${owner_database.length}_*`;
            farhat.sendMessage(
              m.chat,
              { text: teks.trim() },
              "extendedTextMessage",
              { quoted: m, contextInfo: { mentionedJid: owner_database } }
            );
          }
          break;
        case "cek":
          {
            pulsabuy({
              type: "cek",
              trxid: q,
            });
          }
          break;

        case "caradepo":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            let ezaaja = `*─ 「 CARA DEPOSIT MANUAL」 ─*\n*_Berikut Adalah Cara Deposit Manual User!._*\n\n_For Your Information, Whats Payment Hanya Mendukung Deposit Melalui Ovo, Shopeepay, Dana, Qris Saja._\n\n_💸 Ovo : 085742632270_\n_💸 Shopeepay : 085742632270_\n_💸 Dana : 085742632270_\n_💸 Qris : wa.me/+6285742632270_\n\n*_Jika Sudah Melakukan Transfer Harap Kirim Bukti Dengan Cara Mengirim Screenshot Dengan Caption, Contoh :_*\n\n${prefix}bukti JUMLAH|CATATAN\n\n_Contoh :_\n${prefix}bukti 10000|Deposit Kak\n\n*_Untuk Cara Pengisian Limit Dapat Menggunakan Cara Reply/Kirim Bukti Pembayaran Dengan Caption Contoh :_*\n\n${prefix}buylimit JUMLAHLIMIT|CATATAN\n\n_Contoh :_\n${prefix}buylimit 100|Buy Limit Kak\n\n*_Harga 1 Limit Adalah ${profit} Berarti ${hargalimit} Rupiah Per ${limitrate} Limit_*\n\n*_Saldo/Limit Akan Masuk Ketika Owner Mengklik Tombol Setuju Yang Dikirim Bot!._*\n\nNB : *_Perhatian Untuk Minimal Deposit Adalah ${minimaldepo}!. Dan Untuk Limit Adalah ${minimallimit}!. Pastikan Anda Transfer Untuk Pembelian Limit Atau Deposit Di Atas Minimal Transaksi Terimakasih...!_*`;
            m.reply(ezaaja);
          }
          break;

        case "kirimsaldo":
          {
            let saldo = text.split("|")[0] * 1;
            let nomor = text.split("|")[1];
            if (!nomor) return m.reply(`*_Harap Isi Nominal Dan Tujuan_*`);
            if (isNaN(parseInt(saldo)))
              return m.reply("Saldo Harus Berupa Angka!");
            if (saldo < "10") return m.reply("*_Minimal Mengirim Saldo 10!_*");
            if (!addMonUser(nomor + "@s.whatsapp.net", 0))
              return m.reply(
                `*_Gagal mengirim saldo. ID penerima ${nomor.replace(
                  "08",
                  "628"
                )} tidak ditemukan di dalam daftar saldo_*`
              );
            if (getMonUser(sender) < saldo)
              return m.reply("*_Saldo Anda Kurang Untuk Melakukan Transfer_*");
            if (getMonUser(sender) > saldo) {
              moneyAdd(m.sender, saldo);
              addMonUser(nomor.replace("08", "628") + `@s.whatsapp.net`, saldo);
              let psn = `*_Kamu Telah Menerima Saldo Dari ${sender.replace(
                "@s.whatsapp.net",
                ""
              )} Sebesar : ${formatmoney(saldo)}_*`;
              let buttons = [
                {
                  buttonId: prefix + `menu`,
                  buttonText: { displayText: "OK" },
                  type: 1,
                },
              ];
              farhat.sendButtonText(
                nomor.replace("08", "628") + `@s.whatsapp.net`,
                buttons,
                psn,
                packname,
                m
              );
              setTimeout(() => {
                m.reply(
                  `*_Sukses Mengirim Saldo Ke ${nomor.replace(
                    "08",
                    "628"
                  )}_*\n*_Nominal : ${formatmoney(
                    saldo
                  )}_*\n\n*_Saldo Telah Terkirim Ke Nomor Tujuan_*`
                );
              }, 3000); // delay of 3 second
            }
          }
          break;
        case "kirimlimit":
          {
            let limit = text.split("|")[0] * 1;
            let nomor = text.split("|")[1];
            if (!nomor) return m.reply(`*_Harap Isi Limit Dan Tujuan_*`);
            if (isNaN(parseInt(limit)))
              return m.reply("Limit Harus Berupa Angka!");
            if (limit < "5") return m.reply("*_Minimal Kirim Limit 5!_*");
            if (!addLimUser(nomor + "@s.whatsapp.net", 0))
              return m.reply(
                `*_Gagal mengirim limit. ID penerima ${nomor.replace(
                  "08",
                  "628"
                )} tidak ditemukan di dalam daftar limit_*`
              );
            if (getLimUser(sender) < limit)
              return m.reply("*_Limit Anda Kurang Untuk Melakukan Transfer_*");
            if (getLimUser(sender) > limit) {
              limitAdd(m.sender, limit);
              addLimUser(nomor.replace("08", "628") + `@s.whatsapp.net`, limit);
              let psn = `*_Kamu Telah Menerima Limit Dari ${sender.replace(
                "@s.whatsapp.net",
                ""
              )} Sebesar : ${formatmoney(limit)}_*`;
              let buttons = [
                {
                  buttonId: prefix + `menu`,
                  buttonText: { displayText: "OK" },
                  type: 1,
                },
              ];
              farhat.sendButtonText(
                nomor.replace("08", "628") + `@s.whatsapp.net`,
                buttons,
                psn,
                packname,
                m
              );
              setTimeout(() => {
                m.reply(
                  `*_Sukses Mengirim Limit Ke ${nomor.replace(
                    "08",
                    "628"
                  )}_*\n*_Limit : ${formatmoney(
                    limit
                  )}_*\n\n*_Limit Telah Terkirim Ke Nomor Tujuan_*`
                );
              }, 3000); // delay of 3 seconds
            }
          }

          break;
        case "addmoney":
          {
            if (!isCreator) return m.reply(mess.owner);
            let saldo = text.split("|")[0] * 1;
            let nomor = text.split("|")[1];
            if (!nomor) return m.reply(`*_Harap Isi Nominal Dan Tujuan_*`);
            if (isNaN(parseInt(saldo)))
              return m.reply("Deposit Harus Berupa Angka!");
            if (saldo < "10") return m.reply("*_Minimal Saldo 10!_*");
            if (!addMonUser(nomor + "@s.whatsapp.net", 0))
              return m.reply(
                `*_Gagal mengirim saldo. ID penerima ${nomor.replace(
                  "08",
                  "628"
                )} tidak ditemukan di dalam daftar saldo_*`
              );
            addMonUser(nomor + `@s.whatsapp.net`, saldo);
            let psn = `*_Anda Telah Mendapatkan Tambahan Saldo Sebesar : ${formatmoney(
              saldo
            )}_*`;
            let buttons = [
              {
                buttonId: prefix + `menu`,
                buttonText: { displayText: "OK" },
                type: 1,
              },
            ];
            farhat.sendButtonText(
              nomor + `@s.whatsapp.net`,
              buttons,
              psn,
              packname,
              m
            );
            setTimeout(() => {
              m.reply(
                `*_Sukses Menambah Saldo ${nomor}_*\n*_Nominal : ${formatmoney(
                  saldo
                )}_*\n\n*_Anda Telah Mengirim Saldo Secara Manual Saldo Telah Di Tambahkan!._*`
              );
            }, 3000); // delay of 3 second
          }
          break;
        case "addlimit":
          {
            if (!isCreator) return m.reply(mess.owner);
            let limit = text.split("|")[0] * 1;
            let nomor = text.split("|")[1];
            if (!nomor) return m.reply(`*_Harap Isi Limit Dan Tujuan_*`);
            if (isNaN(parseInt(limit)))
              return m.reply("Limit Harus Berupa Angka!");
            if (limit < "5") return m.reply("*_Minimal Limit 5!_*");
            if (!addLimUser(nomor + "@s.whatsapp.net", 0))
              return m.reply(
                `*_Gagal mengirim limit. ID penerima ${nomor} tidak ditemukan di dalam daftar limit_*`
              );
            addLimUser(nomor + `@s.whatsapp.net`, limit);
            let psn = `*_Anda Telah Mendapatkan Tambahan Limit Sebesar : ${formatmoney(
              limit
            )}_*`;
            let buttons = [
              {
                buttonId: prefix + `menu`,
                buttonText: { displayText: "OK" },
                type: 1,
              },
            ];
            farhat.sendButtonText(
              nomor + `@s.whatsapp.net`,
              buttons,
              psn,
              packname,
              m
            );
            setTimeout(() => {
              m.reply(
                `*_Sukses Menambah Limit ${nomor}_*\n*_Limit : ${formatmoney(
                  limit
                )}_*\n\n*_Anda Telah Mengirim Limit Secara Manual Limit Telah Di Tambahkan!._*`
              );
            }, 3000); // delay of 3 second
          }
          break;
        // Start Bukti Pembayaran
        case "bukti":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            let depo = text.split("|")[0];
            let catatnya = text.split("|")[1];
            if (!catatnya) return m.reply(`*_Harap Isi Nominal Dan Catatan_*`);
            let depos = `${formatmoney(depo)}`;
            if (depo < minimaldepo)
              return m.reply(
                `*_Minimal Deposit Adalah ${minimaldepo}!. Silahkan Ulangi Transaksi_*`
              );
            if (isNaN(parseInt(depo)))
              return m.reply("Deposit Harus Berupa Angka!");
            let bukti = `*─ 「 DEPOSIT USER 」 ─*\n*_User Deposite Request_*\n_📍 Balance Before : ${formatmoney(
              getMonUser(sender) ? getMonUser(sender) : "Rp 0,00"
            )}_\n_📍 Deposit : ${depos}_\n_📍 Uid : ${sender.replace(
              "@s.whatsapp.net",
              ""
            )}_\n_📍 Catatan : ${catatnya}_\n\n*_Identifikasi Bukti Dengan Cermat Agar Tidak Terjadi Penipuan!._*`;
            if (/image/.test(mime)) {
              let media = await quoted.download();
              let count = owner_database.length;
              let sentCount = 0;
              m.reply("```Sedang Mengirim Permintaan```");
              for (let i = 0; i < owner_database.length; i++) {
                setTimeout(function () {
                  farhat.sendImage(
                    owner_database[i] + "@s.whatsapp.net",
                    media,
                    `Request From: ${sender.replace("@s.whatsapp.net", "")}`,
                    m
                  );
                  let buttons = [
                    {
                      buttonId: prefix + `deposetuju ${depo}|${m.sender}`,
                      buttonText: { displayText: "Setuju" },
                      type: 1,
                    },
                    {
                      buttonId: prefix + `depotidak ${m.sender}`,
                      buttonText: { displayText: "Tidak Setuju" },
                      type: 1,
                    },
                  ];
                  farhat.sendButtonText(
                    owner_database[i] + `@s.whatsapp.net`,
                    buttons,
                    `${bukti}`,
                    `${packname}`,
                    m
                  );
                  count--;
                  sentCount++;
                  if (count === 0) {
                    m.reply("```Permintaan Terkirim:```" + sentCount);
                  }
                }, i * 2000);
              }
            }
          }
          break;
        case "deposetuju":
          {
            if (!isCreator) return m.reply(mess.owner);
            let jumbelah = text.split("|")[0] * 1;
            let siapah = text.split("|")[1];
            addMonUser(siapah, jumbelah);
            m.reply("*_Sukses Deposit_*");
            let buttons = [
              {
                buttonId: prefix + `menu`,
                buttonText: { displayText: "Dashboard" },
                type: 1,
              },
              {
                buttonId: prefix + `topup`,
                buttonText: { displayText: "Top Up" },
                type: 1,
              },
            ];
            farhat.sendButtonText(
              `${siapah}`,
              buttons,
              `*_Topup Anda Berhasil Di Setujui, Silahkan Melakukan TopUp Dengan Mudah Hanya Di Whats Payment!_*`,
              `@FarhatDevv`,
              m
            );
          }
          break;
        case "depotidak":
          {
            if (!isCreator) return m.reply(mess.owner);
            m.reply("*_Deposit Tidak Akan Dilanjutkan_*");
            farhat.sendMessage(`${text}`, {
              text: `*_Topup Anda Ditolak!, Mungkin Anda Melakukan Fake Topup Atau Kekeliruan Lain, Silahkan Chat Owner Jika Ada Masalah!._*`,
            });
          }
          break;
        // End Bukti Pembayaran
        // Start Buy limit
        case "buylimit":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            let limitnya = text.split("|")[0];
            let noted = text.split("|")[1];
            if (!limitnya) return m.reply(`*Harap Isi Nominal Dan Catatan*`);
            let limits = `${formatmoney(limitnya)}`;
            if (limitnya < minimallimit)
              return m.reply(
                `*_Minimal Pengisian Limit Adalah ${minimallimit}!. Silahkan Ulangi Transaksi_*`
              );
            if (isNaN(parseInt(limitnya)))
              return m.reply("Limit Harus Berupa Angka!");
            let buktipembayaran = `*─ 「 BUY LIMIT USER 」 ─*\n*_User Limit Request_*\n_📍 Limit Before : ${formatmoney(
              getLimUser(sender) ? getLimUser(sender) : "0,00"
            )}_\n_📍 Limit : ${limits}_\n_📍 Uid : ${sender.replace(
              "@s.whatsapp.net",
              ""
            )}_\n_📍 Catatan : ${noted}_\n\n*_Identifikasi Bukti Dengan Cermat Agar Tidak Terjadi Penipuan!._*`;
            if (/image/.test(mime)) {
              let media = await quoted.download();
              let count = owner_database.length;
              let sentCount = 0;
              m.reply("```Sedang Mengirim Permintaan```");
              for (let i = 0; i < owner_database.length; i++) {
                setTimeout(function () {
                  farhat.sendImage(
                    owner_database[i] + "@s.whatsapp.net",
                    media,
                    `Request From: ${sender.replace("@s.whatsapp.net", "")}`,
                    m
                  );
                  let buttons = [
                    {
                      buttonId: prefix + `limitsetuju ${limitnya}|${m.sender}`,
                      buttonText: { displayText: "Setuju" },
                      type: 1,
                    },
                    {
                      buttonId: prefix + `limittolak ${m.sender}`,
                      buttonText: { displayText: "Tidak Setuju" },
                      type: 1,
                    },
                  ];
                  farhat.sendButtonText(
                    owner_database[i] + `@s.whatsapp.net`,
                    buttons,
                    `${buktipembayaran}`,
                    `${packname}`,
                    m
                  );
                  count--;
                  sentCount++;
                  if (count === 0) {
                    m.reply("```Permintaan Terkirim:```" + sentCount);
                  }
                }, i * 2000);
              }
            }
          }
          break;
        case "limitsetuju":
          {
            if (!isCreator) return m.reply(mess.owner);
            let jmlhlimit = text.split("|")[0] * 1;
            let userreq = text.split("|")[1];
            addLimUser(userreq, jmlhlimit);
            m.reply("*_Sukses Buy Limit_*");
            let buttons = [
              {
                buttonId: prefix + `menu`,
                buttonText: { displayText: "Dashboard" },
                type: 1,
              },
              {
                buttonId: prefix + `topup`,
                buttonText: { displayText: "Top Up" },
                type: 1,
              },
            ];
            farhat.sendButtonText(
              `${userreq}`,
              buttons,
              `*_Buy Limit Anda Berhasil Di Setujui, Silahkan Melakukan TopUp Dengan Mudah Hanya Di Whats Payment!_*`,
              `${packname}`,
              m
            );
          }
          break;
        case "limittolak":
          {
            if (!isCreator) return m.reply(mess.owner);
            m.reply("*_Buy Limit Tidak Akan Dilanjutkan_*");
            farhat.sendMessage(`${text}`, {
              text: `*_Buy Limit Anda Ditolak!, Mungkin Anda Melakukan Fake Topup Atau Kekeliruan Lain, Silahkan Chat Owner Jika Ada Masalah!._*`,
            });
          }
          break;

        // Cek koneksi
        case "cekvip":
          {
            if (!isCreator) return m.reply(mess.owner);
            let md5 = require("md5");
            let sign = md5(reseleridkey + reselerkey);
            let axios = require("axios");
            axios("https://vip-reseller.co.id/api/profile", {
              method: "POST",
              data: new URLSearchParams(
                Object.entries({ key: reselerkey, sign: sign })
              ),
            }).then((res) => {
              if (res.data.result == false) {
                m.reply(`*_${res.data.message}_*`);
              }
              if (
                res.data.message == "Successfully got your account details."
              ) {
                anjay = `*── 「 Balance Vip Reseller 」 ──*\n\n*_Name : ${
                  res.data.data.full_name
                }_*\n*_Username : ${
                  res.data.data.username
                }_*\n*_Balance : ${formatmoney(
                  res.data.data.balance
                )}_*\n*_Point : ${res.data.data.point}_*\n*_Level : ${
                  res.data.data.level
                }_*\n*_Register : ${res.data.data.registered}_*`;
                farhat.sendText(m.chat, anjay, m);
              }
            });
          }
          break;
        case "cekatc":
          {
            if (!isCreator) return m.reply(mess.owner);
            let axios = require("axios");
            axios("https://atlantic-pedia.co.id/api/profile", {
              method: "POST",
              data: new URLSearchParams(
                Object.entries({
                  key: atlantickey,
                })
              ),
            }).then((res) => {
              if (res.data.result == false) {
                m.reply(`*_${res.data.data}_*`);
              }
              if (res.data.result == true) {
                anjoy = `*── 「 Balance Vip Atlantic 」 ──*\n\n*_Name : ${
                  res.data.data.full_name
                }_*\n*_Username : ${
                  res.data.data.username
                }_*\n*_Balance : ${formatmoney(
                  res.data.data.balance
                )}_*\n*_Order : ${res.data.data.order}_*\n*_Spent : ${
                  res.data.data.spent
                }_*`;
                farhat.sendText(m.chat, anjoy, m);
              }
            });
          }
          break;
        case "cekdigi":
          {
            if (!isCreator) return m.reply(mess.owner);
            let md5 = require("md5");
            let fetch = (...args) =>
              import("node-fetch").then(({ default: fetch }) => fetch(...args));
            let signa = md5(usernamekey + productionkey + `depo`);
            let data = {
              cmd: `deposit`,
              username: usernamekey,
              sign: signa,
            };
            fetch(`https://api.digiflazz.com/v1/cek-saldo`, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((response) => response.json())
              .then((data) => {
                anjir = `*── 「 Balance DigiFlazz 」 ──*\n\n*_Balance : ${formatmoney(
                  data.data.deposit
                )}_*`;
                farhat.sendText(m.chat, anjir, m);
              });
          }
          break;

        case "cekid":
          {
            let gameid = text.split(" ")[0];
            let id = text.split(" ")[1];
            let zone = text.split(" ")[2];
            const usernamenya = await farhatcekallid(gameid, id, zone);
            const uservip = usernamenya.msg;
            if (usernamenya.status === 404) {
              m.reply("*「 TOPUP GAGAL 」*\n\n*ID Tidak Ditemukan*");
              return;
            }
            m.reply(`${uservip}`);
          }
          break;

        case "gethargaml":
          {
            if (!isCreator) return m.reply(mess.owner);
            m.reply(mess.wait).then(() => {
              // Memanggil fungsi scrapHarga()
              scrapHarga()
                .then((response) => {
                  if (response.status === 200) {
                    m.reply(response.msg);
                  } else {
                    m.reply(response.msg);
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  m.reply("Terjadi kesalahan saat mengambil harga ML.");
                });
            });
          }
          break;

        case "gethargapubg":
          {
            if (!isCreator) return m.reply(mess.owner);
            m.reply(mess.wait).then(() => {
              // Memanggil fungsi scrapHarga()
              scrapHargaPubg()
                .then((response) => {
                  if (response.status === 200) {
                    m.reply(response.msg);
                  } else {
                    m.reply(response.msg);
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                  m.reply("Terjadi kesalahan saat mengambil harga PUBG.");
                });
            });
          }
          break;

        case "getremove":
          {
            if (!isCreator) return m.reply(mess.owner);
            try {
              m.reply(mess.wait);
              const resremove = await scrapRemoveItem();
              const fixremove = resremove.msg;
              m.reply(fixremove);
            } catch (error) {
              console.log("Terjadi perang dunia");
              m.reply("Terjadi kesalahan..Gagal remove Item");
              farhat.sendMessage(
                nomorku,
                { text: ` Error : ${error.msg}` },
                { quoted: m }
              );
            }
          }
          break;

        case "fagtopup":
          {
            if (!isCreator) return reply(mess.owner);
            let skuid = text.split(".")[0];
            let userid = text.split(".")[1];
            let zoneid = text.split(".")[2];
            if (!skuid || !userid || !zoneid)
              return reply(
                `*Example* :\n${
                  prefix + command
                } skuid.user_id.Zone_id\n\n*Contoh* :\n${
                  prefix + command
                } ML5.583716368.8327\n`
              );
            if (skuid === "5") {
              skuid = "5 Diamonds";
            } else if (skuid === "12") {
              skuid = "12 Diamonds";
            } else if (skuid === "19") {
              skuid = "17 + 2 Diamonds";
            } else if (skuid === "28") {
              skuid = "25 + 3 Diamonds";
            } else if (skuid === "44") {
              skuid = "40 + 4 Diamonds";
            } else if (skuid === "59") {
              skuid = "53 + 6 Diamonds";
            } else if (skuid === "85") {
              skuid = "77 + 8 Diamonds";
            } else if (skuid === "86") {
              skuid = "78 + 8 Diamonds";
            } else if (skuid === "170") {
              skuid = "154 + 16 Diamonds";
            } else if (skuid === "172") {
              skuid = "156 + 16 Diamonds";
            } else if (skuid === "240") {
              skuid = "217 + 23 Diamonds";
            } else if (skuid === "257") {
              skuid = "234 + 23 Diamonds";
            } else if (skuid === "296") {
              skuid = "256 + 40 Diamonds";
            } else if (skuid === "408") {
              skuid = "367 + 41 Diamonds";
            } else if (skuid === "568") {
              skuid = "503 + 65 Diamonds";
            } else if (skuid === "706") {
              skuid = "625 + 81 Diamonds";
            } else if (skuid === "875") {
              skuid = "774 + 101 Diamonds";
            } else if (skuid === "2010") {
              skuid = "1708 + 302 Diamonds";
            } else if (skuid === "2195") {
              skuid = "1860 + 335 Diamonds";
            } else if (skuid === "3688") {
              skuid = "3099 + 589 Diamonds";
            } else if (skuid === "4830") {
              skuid = "4003 + 827 Diamonds";
            } else if (skuid === "5532") {
              skuid = "4649 + 883 Diamonds";
            } else if (skuid === "9288") {
              skuid = "7740 + 1548 Diamonds";
            } else if (skuid === "TPASS") {
              skuid = "Twilight Pass";
            } else if (skuid === "WDP") {
              skuid = "Weekly Pass";
            }
            m.reply(mess.wait);
            try {
              const restopup = await scrapTopupMl(skuid, userid, zoneid);
              const fixtopup = restopup.msg;
              m.reply(fixtopup);
            } catch (error) {
              console.error("Error parsing JSON:", error);
              m.reply("Terjadi kesalahan saat topup.");
              farhat.sendMessage(
                nomorKu,
                { text: `ERROR CODE : ${error.msg} ` },
                { Quoted: m }
              );
            }
          }
          break;

        case "getml":
          let priceml = text.split(" ")[0];
          if (!priceml) return reply(`${prefix + command} <masukkan rate>\n`);
          let listratemla = "*── 「 LIST DIAMOND ML A/C 」 ──*\n\n";

          fs.readFile("./produk/mobile-legends.json", "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return reply("Terjadi kesalahan saat membaca file.");
            }
            try {
              const productList = JSON.parse(data);
              productList.forEach((item) => {
                const hargaMl = Math.ceil(
                  item.harga * priceml
                ).toLocaleString();
                listratemla += `${item.produk} : Rp ${hargaMl}\n`;
              });
              m.reply(listratemla);
            } catch (error) {
              console.error("Error parsing JSON:", error);
              return reply("Terjadi kesalahan saat memproses data JSON.");
            }
          });
          break;

        case "getpubg":
          let pricePubg = text.split(" ")[0];
          if (!pricePubg) return reply(`${prefix + command} <masukkan rate>\n`);
          let listRatePubg = "*── 「 LIST UC PUBG INDO 」 ──*\n\n";

          // Membaca data dari file pubg.json
          fs.readFile("./produk/pubg.json", "utf8", (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return reply("Terjadi kesalahan saat membaca file.");
            }

            try {
              const productList = JSON.parse(data);

              // Menambahkan setiap item ke dalam listRatePubg
              productList.forEach((item) => {
                const hargaPubg = Math.ceil(
                  item.harga * pricePubg
                ).toLocaleString();
                listRatePubg += `${item.produk} : Rp ${hargaPubg}\n`;
              });

              // Menampilkan listRatePubg
              m.reply(listRatePubg);
            } catch (error) {
              console.error("Error parsing JSON:", error);
              return reply("Terjadi kesalahan saat memproses data JSON.");
            }
          });
          break;

        case "owner":
        case "creator":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            farhat.sendContact(m.chat, owner_database, m);
          }
          break;

        // setting list
        case "store":
        case "list":
          {
            if (!isGroup) return m.reply(mess.group);
            if (db_respon_list.length === 0)
              return m.reply("```Belum Ada List```");
            if (!isAlreadyResponListGroup(from, db_respon_list))
              return m.reply("```Belum Ada List Terdaftar Di Group Ini```");

            // Mengonversi daftar respons menjadi pesan tanpa format khusus
            var message = `Hi Kak *${
              pushname ? pushname : "Anon"
            }*\n\n🛒 _List From ${groupName}_\n📅 ${tglserver}\n🕰️ ${wktserver}\n\n`;
            db_respon_list.forEach((item) => {
              if (item.id === from) {
                message += `⭔ ${item.key}\n`;
              }
            });
            message +=
              "\n*Catatan :* \n_Untuk melihat detail produk, silahkan_\n_kirim nama produk yang ada pada list_\n_di atas. Misalnya kamu ingin melihat_\n_detail produk dari *PUBG*, maka kirim_\n_pesan *PUBG* kepada bot_ \n";

            // Mengirim pesan dengan membalas pesan pengirim
            farhat.sendMessage(from, { text: message }, { quoted: m });
          }
          break;

        case "addlist":
          {
            if (!isGroup) return m.reply(mess.group);
            if (!isBotAdmins) return m.reply(mess.botAdmin);
            if (!isAdmins) return m.reply(mess.admin);
            if (!isCreator) return m.reply(mess.owner);
            let text1 = text.split("|")[0];
            let text2 = text.split("|")[1];
            if (!text.includes("|"))
              return m.reply(
                `Gunakan dengan cara ${prefix + command} *_key|response_*`
              );
            if (isAlreadyResponList(from, text1, db_respon_list))
              return m.reply(
                `List Response Dengan Key *${text1}* Telah Tersedia Di Group Ini`
              );
            addResponList(from, text1, text2, false, "-", db_respon_list);
            m.reply(`*_Berhasil Menambah List ${text1}_*`);
          }
          break;
        case "dellist":
          {
            if (!isGroup) return m.reply(mess.group);
            if (!isBotAdmins) return m.reply(mess.botAdmin);
            if (!isAdmins) return m.reply(mess.admin);
            if (!isCreator) return m.reply(mess.owner);
            if (db_respon_list.length === 0)
              return m.reply("```Belum Ada List Di Database```");
            if (!text) return m.reply(`Example: ${prefix + command} *_key_*`);
            if (!isAlreadyResponList(from, text, db_respon_list))
              return m.reply(
                `List Response Dengan Key *_${text}_* Tidak Di Temukan`
              );
            delResponList(from, text, db_respon_list);
            m.reply(`*_Sukses Delete List Dengan Key ${text}_*`);
          }
          break;
        case "update":
          {
            if (!isGroup) return m.reply(mess.group);
            if (!isBotAdmins) return m.reply(mess.botAdmin);
            if (!isAdmins) return m.reply(mess.admin);
            if (!isCreator) return m.reply(mess.owner);
            var text1 = text.split("|")[0];
            var text2 = text.split("|")[1];
            if (!text.includes("|"))
              return m.reply(
                `Gunakan dengan cara ${prefix + command} *_key|response_*`
              );
            if (!isAlreadyResponListGroup(from, db_respon_list))
              return m.reply(`Maaf, Untuk Key *${text1}* Belum Terdaftar`);
            updateResponList(from, text1, text2, false, "-", db_respon_list);
            m.reply(`*_Berhasil Update List ${text1}_*`);
          }
          break;

        case "restart":
          {
            if (!isCreator) return m.reply(mess.owner);
            await m.reply(`_Restarting ${packname}_`);
            try {
              await farhat.sendMessage(from, { text: "*_Succes_*" });
              await sleep(3000);
              exec(`npm start`);
            } catch (err) {
              exec(`node index.js`);
              await sleep(4000);
              m.reply("*_Sukses_*");
            }
          }
          break;
        case "whoisip":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!text) throw `Example : ${prefix + command} 192.168.152.24`;
            m.reply(mess.wait);
            let anu = await fetchJson(
              api("lol", "/api/ipaddress/" + text, {}, "apikey")
            );
            farhat.sendMessage(
              m.chat,
              {
                image: {
                  url: "https://telegra.ph/file/94b5d3acb51c1eea47b22.png",
                },
                caption: `⭔ Country : ${anu.result.country}\n⭔ Country Code : ${anu.result.countryCode}\n⭔ Region : ${anu.result.region}\n⭔ Region Name : ${anu.result.regionName}\n⭔ City : ${anu.result.city}\n⭔ Zip : ${anu.result.zip}\n⭔ Lat : ${anu.result.lat}\n⭔ Lon : ${anu.result.lon}\n⭔ Time Zone : ${anu.result.timezone}\n⭔ Isp : ${anu.result.isp}\n⭔ Org : ${anu.result.org}\n⭔ As : ${anu.result.as}\n⭔ Query : ${anu.result.query}`,
              },
              { quoted: m }
            );
          }
          break;
        case "listonline":
        case "liston":
          {
            let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat;
            let online = [...Object.keys(store.presences[id]), botNumber];
            farhat.sendText(
              m.chat,
              "List Online:\n\n" +
                online.map((v) => "⭔ @" + v.replace(/@.+/, "")).join`\n`,
              m,
              { mentions: online }
            );
          }
          break;
        case "tourl":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            m.reply(mess.wait);
            let {
              UploadFileUgu,
              webp2mp4File,
              TelegraPh,
            } = require("./uploader");
            let media = await farhat.downloadAndSaveMediaMessage(qmsg);
            if (/image/.test(mime)) {
              let anu = await TelegraPh(media);
              m.reply(util.format(anu));
            } else if (!/image/.test(mime)) {
              let anu = await UploadFileUgu(media);
              m.reply(util.format(anu));
            }
            await fs.unlinkSync(media);
          }
          break;
        case "toaudio":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!text) throw `Example : ${prefix + command} Hallo semua`;
            m.reply(mess.wait);
            farhat.sendMessage(
              m.chat,
              {
                audio: {
                  url: `https://api.lolhuman.xyz/api/gtts/id?apikey=${lolkey}&text=${text}`,
                },
                mimetype: "audio/mpeg",
              },
              { quoted: m }
            );
          }

          break;
        case "alquran":
          {
            if (!args[0])
              throw `Contoh penggunaan:\n${
                prefix + command
              } 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`;
            if (!args[1])
              throw `Contoh penggunaan:\n${
                prefix + command
              } 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 beserta audionya, dan ayatnya 1 aja`;
            let res = await fetchJson(
              `https://api.zahwazein.xyz/islami/quran/${args[0]}/${args[1]}?apikey=${zenzkey}`
            );
            if (res.status == false) return m.reply(res.result.message);
            let txt = `*Arab* : ${res.result.text.arab}\n\n*English* : ${res.result.translation.en}\n\n*Indonesia* : ${res.result.translation.id}\n\n( Q.S ${res.result.surah.name.transliteration.id} : ${res.result.number.inSurah} )`;
            m.reply(txt);
            farhat.sendMessage(
              m.chat,
              {
                audio: { url: res.result.audio.primary },
                mimetype: "audio/mpeg",
              },
              { quoted: m }
            );
          }
          break;
        case "ayatkursi":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            m.reply(mess.wait);
            let eza = await fetchJson(
              `https://saipulanuar.ga/api/muslim/ayatkursi`
            );
            farhat.sendMessage(
              m.chat,
              {
                image: {
                  url: "https://telegra.ph/file/94b5d3acb51c1eea47b22.png",
                },
                caption: `⭔ Nama : *Ayat Kursi*\n\n⭔ Arab : ${eza.result.arabic}\n\n⭔ Latin : ${eza.result.latin}\n\n⭔ Artinya : ${eza.result.translation}`,
              },
              { quoted: m }
            );
          }
          break;

        case "anime":
        case "waifu":
        case "husbu":
        case "neko":
        case "shinobu":
        case "megumin":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            m.reply(mess.wait);
            farhat.sendMessage(
              m.chat,
              {
                image: {
                  url: api("zenz", "/randomanime/" + command, {}, "apikey"),
                },
                caption: "Generate Random " + command,
              },
              { quoted: m }
            );
          }
          break;
        case "join":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!isCreator) throw mess.owner;
            if (!text) throw "Masukkan Link Group!";
            if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
              throw "Link Invalid!";
            m.reply(mess.wait);
            let result = args[0].split("https://chat.whatsapp.com/")[1];
            await farhat
              .groupAcceptInvite(result)
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          }
          break;
        case "block":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!isCreator) throw mess.owner;
            let users = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await farhat
              .updateBlockStatus(users, "block")
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          }
          break;
        case "unblock":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!isCreator) throw mess.owner;
            let users = m.mentionedJid[0]
              ? m.mentionedJid[0]
              : m.quoted
              ? m.quoted.sender
              : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            await farhat
              .updateBlockStatus(users, "unblock")
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          }
          break;
        case "kick":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!m.isGroup) throw mess.group;
            if (!isBotAdmins) throw mess.botAdmin;
            if (!isAdmins) throw mess.admin;
            let users = m.mentionedJid[0]
              ? m.mentionedJid
              : m.quoted
              ? [m.quoted.sender]
              : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
            await farhat
              .groupParticipantsUpdate(m.chat, users, "remove")
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          }
          break;
        case "add":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!m.isGroup) throw mess.group;
            if (!isBotAdmins) throw mess.botAdmin;
            if (!isAdmins) throw mess.admin;
            let users = m.mentionedJid[0]
              ? m.mentionedJid
              : m.quoted
              ? [m.quoted.sender]
              : [text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"];
            await farhat
              .groupParticipantsUpdate(m.chat, users, "add")
              .then((res) => m.reply(jsonformat(res)))
              .catch((err) => m.reply(jsonformat(err)));
          }
          break;
        case "tagall":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!m.isGroup) throw mess.group;
            if (!isBotAdmins) throw mess.botAdmin;
            if (!isAdmins) throw mess.admin;
            let teks = `══✪〘 *👥 Tag All* 〙✪══

➲ *Pesan : ${q ? q : "kosong"}*\n\n`;
            for (let mem of participants) {
              teks += `⭔ @${mem.id.split("@")[0]}\n`;
            }
            farhat.sendMessage(
              m.chat,
              { text: teks, mentions: participants.map((a) => a.id) },
              { quoted: m }
            );
          }
          break;

        case "sticker":
        case "s":
        case "stickergif":
          if (isBanned) return m.reply(`*You Have Been Banned*`);
          {
            if (/image/.test(mime)) {
              m.reply(mess.wait);
              let media = await farhat.downloadMediaMessage(qmsg);
              let encmedia = await farhat.sendImageAsSticker(m.chat, media, m, {
                packname: global.packname,
                author: global.author,
              });
              await fs.unlinkSync(encmedia);
            } else if (/video/.test(mime)) {
              m.reply(mess.wait);
              if (qmsg.seconds > 11) return m.reply("Maksimal 10 detik!");
              let media = await farhat.downloadMediaMessage(qmsg);
              let encmedia = await farhat.sendVideoAsSticker(m.chat, media, m, {
                packname: global.packname,
                author: global.author,
              });
              await fs.unlinkSync(encmedia);
            } else {
              m.reply(
                `Kirim/reply gambar/video/gif dengan caption ${
                  prefix + command
                }\nDurasi Video/Gif 1-9 Detik`
              );
            }
          }
          break;
        case "getip":
          {
            if (!isCreator) throw mess.owner;
            m.reply("My public IP address is: " + ipserver);
          }
          break;
        case "ping":
        case "botstatus":
        case "statusbot":
          {
            if (!isCreator) throw mess.owner;
            const used = process.memoryUsage();
            const cpus = os.cpus().map((cpu) => {
              cpu.total = Object.keys(cpu.times).reduce(
                (last, type) => last + cpu.times[type],
                0
              );
              return cpu;
            });
            const cpu = cpus.reduce(
              (last, cpu, _, { length }) => {
                last.total += cpu.total;
                last.speed += cpu.speed / length;
                last.times.user += cpu.times.user;
                last.times.nice += cpu.times.nice;
                last.times.sys += cpu.times.sys;
                last.times.idle += cpu.times.idle;
                last.times.irq += cpu.times.irq;
                return last;
              },
              {
                speed: 0,
                total: 0,
                times: {
                  user: 0,
                  nice: 0,
                  sys: 0,
                  idle: 0,
                  irq: 0,
                },
              }
            );
            let timestamp = speed();
            let latensi = speed() - timestamp;
            neww = performance.now();
            oldd = performance.now();
            respon = `
Kecepatan Respon ${latensi.toFixed(4)} _Second_ \n ${
              oldd - neww
            } _miliseconds_\n\nRuntime : ${runtime(process.uptime())}
💻 Info Server
RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
_NodeJS Memory Usaage_
${Object.keys(used)
  .map(
    (key, _, arr) =>
      `${key.padEnd(Math.max(...arr.map((v) => v.length)), " ")}: ${formatp(
        used[key]
      )}`
  )
  .join("\n")}
${
  cpus[0]
    ? `_Total CPU Usage_
${cpus[0].model.trim()} (${cpu.speed} MHZ)\n${Object.keys(cpu.times)
        .map(
          (type) =>
            `- *${(type + "*").padEnd(6)}: ${(
              (100 * cpu.times[type]) /
              cpu.total
            ).toFixed(2)}%`
        )
        .join("\n")}
_CPU Core(s) Usage (${cpus.length} Core CPU)_
${cpus
  .map(
    (cpu, i) =>
      `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\n${Object.keys(
        cpu.times
      )
        .map(
          (type) =>
            `- *${(type + "*").padEnd(6)}: ${(
              (100 * cpu.times[type]) /
              cpu.total
            ).toFixed(2)}%`
        )
        .join("\n")}`
  )
  .join("\n\n")}`
    : ""
}
            `.trim();
            m.reply(respon);
          }
          break;
        case "gempa":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            m.reply(mess.waitdata);
            let anu = await fetchJson(
              api("zenz", "/information/bmkg/gempa", {}, "apikey")
            );
            if (anu.status == false) return m.reply(anu.result.message);
            farhat.sendMessage(
              m.chat,
              {
                image: { url: anu.result.shakemap },
                caption: `⭔ Tanggal : ${anu.result.tanggal}\n⭔ Jam : ${anu.result.jam}\n⭔ Date Time : ${anu.result.datetime}\n⭔ Coordinate : ${anu.result.coordinates}\n⭔ Lintang : ${anu.result.lintang}\n⭔ Bujur : ${anu.result.bujur}\n⭔ Magnitude : ${anu.result.magnitude}\n⭔ Kedalaman : ${anu.result.kedalaman}\n⭔ Wilayah : ${anu.result.wilayah}\n⭔ Potensi : ${anu.result.potensi}\n⭔ Dirasakan : ${anu.result.dirasakan}`,
              },
              { quoted: m }
            );
          }
          break;
        case "jadwalsholat":
          {
            m.reply(mess.wait + `${text}`);
            if (!text) throw `Example : ${prefix + command} banjar`;
            let fetch = await fetchJson(
              api("zenz", "/islami/jadwalshalat", { kota: text }, "apikey")
            );
            if (fetch.status == false) return m.reply(fetch.result.message);
            let i = fetch.result;
            let teks = `Jadwal Sholat Kota : ${text}\n\n`;
            teks += `⭔ Tanggal : ${i.tanggal}\n`;
            teks += `⭔ Subuh : ${i.subuh}\n`;
            teks += `⭔ Duha : ${i.duha}\n`;
            teks += `⭔ Dzuhur : ${i.zuhur}\n`;
            teks += `⭔ Ashar : ${i.asar}\n`;
            teks += `⭔ Maghrib : ${i.magrib}\n`;
            teks += `⭔ Isya : ${i.isya}\n`;
            farhat.sendText(m.chat, teks, m);
          }
          break;
        case "asmaulhusna":
          {
            m.reply(mess.wait);
            let fetch = await fetchJson(
              `https://raw.githubusercontent.com/BochilTeam/database/master/religi/asmaulhusna.json`
            );
            let caption = `*Asmaul Husna*\n\n`;
            for (let i of fetch) {
              caption += `⭔ No : ${i.index}\n`;
              caption += `⭔ Arab : ${i.arabic}\n`;
              caption += `⭔ Latin : ${i.latin}\n`;
              caption += `⭔ Indonesia : ${i.translation_id}\n`;
              caption += `⭔ English : ${i.translation_en}\n\n`;
            }
            farhat.sendText(m.chat, caption, m);
          }
          break;

        case "shortlink":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!text) throw `Example : ${prefix + command} https://google.com`;
            m.reply(mess.wait);
            let anu = await fetchJson(
              `https://api.lolhuman.xyz/api/shortlink?apikey=${lolkey}&url=${text}`
            );
            farhat.sendMessage(
              m.chat,
              {
                image: {
                  url: "https://telegra.ph/file/94b5d3acb51c1eea47b22.png",
                },
                caption: `*Success ✔*\n⭔ Url : ${anu.result}`,
              },
              { quoted: m }
            );
          }
          break;
        case "ytshorts":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!text) throw "Masukkan Query Link!";
            m.reply(mess.wait);
            let anu = await fetchJson(
              `https://api.zahwazein.xyz/downloader/ytshorts?apikey=${zenzkey}&url=${text}`
            );
            if (anu.status == false) return m.reply(anu.result.message);
            let buttons = [
              {
                buttonId: `${prefix}menu`,
                buttonText: { displayText: "► Menu" },
                type: 1,
              },
            ];
            let buttonMessage = {
              video: { url: anu.result.getVideo },
              caption: `Download From ${text}`,
              footer: "Press Button For Menu",
              buttons: buttons,
              headerType: 5,
            };
            farhat.sendMessage(m.chat, buttonMessage, { quoted: m });
          }
          break;
        case "ytmp4":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!text) throw "Masukkan Query Link!";
            m.reply(mess.wait);
            let anu = await fetchJson(
              `https://api.zahwazein.xyz/downloader/youtube?apikey=${zenzkey}&url=${text}`
            );
            if (anu.status == false) return m.reply(anu.result.message);
            let buttons = [
              {
                buttonId: `${prefix}menu`,
                buttonText: { displayText: "► Menu" },
                type: 1,
              },
            ];
            let buttonMessage = {
              video: { url: anu.result.getVideo },
              caption: `Download From ${text}`,
              footer: "Press Button For Menu",
              buttons: buttons,
              headerType: 5,
            };
            farhat.sendMessage(m.chat, buttonMessage, { quoted: m });
          }
          break;
        case "tiktok":
        case "tiktoknowm":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!text) throw "Masukkan Query Link!";
            m.reply(mess.wait);
            let anu = await fetchJson(
              api("zenz", "/downloader/tiktok", { url: text }, "apikey")
            );
            if (anu.status == false) return m.reply(anu.result.message);
            let buttons = [
              {
                buttonId: `${prefix}menu`,
                buttonText: { displayText: "► Menu" },
                type: 1,
              },
            ];
            let buttonMessage = {
              video: { url: anu.result.video.noWatermark },
              caption: `Download From ${text}`,
              footer: "Press Button For Menu",
              buttons: buttons,
              headerType: 5,
            };
            farhat.sendMessage(m.chat, buttonMessage, { quoted: m });
          }
          break;
        case "tiktokmp3":
        case "tiktokaudio":
          {
            if (isBanned) return m.reply(`*You Have Been Banned*`);
            if (!text) throw "Masukkan Query Link!";
            m.reply(mess.wait);
            let anu = await fetchJson(
              `https://api.zahwazein.xyz/downloader/tiktok?apikey=${zenzkey}&url=${text}`
            );
            if (anu.status == false) return m.reply(anu.result.message);
            let buttons = [
              {
                buttonId: `${prefix}menu`,
                buttonText: { displayText: "► Menu" },
                type: 1,
              },
            ];
            let buttonMessage = {
              text: `Download From ${text}`,
              footer: "Press Button For Menu",
              buttons: buttons,
              headerType: 2,
            };
            let msg = await farhat.sendMessage(m.chat, buttonMessage, {
              quoted: m,
            });
            farhat.sendMessage(
              m.chat,
              {
                audio: { url: anu.result.music.play_url },
                mimetype: "audio/mpeg",
              },
              { quoted: msg }
            );
          }
          break;
        case "cekapi":
          {
            if (!isCreator) throw mess.owner;
            if (isGroup) throw mess.private;
            message = `L i s t A p i K e y\n\n_Digiflazz:_\n- ${usernamekey}\n- ${productionkey}\n\n_Atlantic Pedia:_\n- ${atlantickey}\n\n_Vip-Reseller_\n- ${reselerkey}\n- ${reseleridkey}\n\n_Api Games:_\n- ${merchantapigames}\n- ${secretapigames}\n- ${signatureapigames}`;
            farhat.sendMessage(m.chat, { text: message });
          }
          break;
        case "setapikey":
          {
            if (!isCreator) throw mess.owner;
            if (isGroup) throw mess.private;
            let provider_0 = text.split("|")[0];
            let key_1 = text.split("|")[1];
            let key_2 = text.split("|")[2];
            let key_3 = text.split("|")[3];
            if (!provider_0)
              return m.reply(
                "```Masukkan Provider```\n```Provider Yang Tersedia```\n\n```📍 digiflazz```\n```📍 atlanticpedia```\n```📍 vip_reseller```\n```📍 apigames```\n\n```Jadi, contoh:```\n```.setapikey digiflazz|user|product```"
              );
            if (provider_0 === "atlanticpedia") {
              if (!key_1)
                return m.reply(`${prefix + command} atlaticpedia|api_key`);
              let atlanticpedia = {
                atlantickey: key_1,
              };
              let data = fs.readFileSync("./src/api_key.json");
              let jsonData = JSON.parse(data);
              if (jsonData.atlanticpedia.atlantickey === key_1) {
                m.reply("```Data yang sama telah dimasukkan```");
              } else {
                jsonData.atlanticpedia = atlanticpedia;
                fs.writeFileSync(
                  "./src/api_key.json",
                  JSON.stringify(jsonData, null, 2)
                );
                let message = "```Berhasil Update Api Atc```";
                let buttons = [
                  {
                    buttonId: prefix + `cekapi`,
                    buttonText: { displayText: "Cek Api" },
                    type: 1,
                  },
                ];
                farhat.sendButtonText(
                  from,
                  buttons,
                  message,
                  "Cek api For view changes",
                  m
                );
              }
            } else if (provider_0 === "digiflazz") {
              if (!key_1 && !key_2)
                return m.reply(
                  `${prefix + command} digiflazz|username_key|production_key`
                );
              let digiflazz = {
                usernamekey: key_1,
                productionkey: key_2,
              };
              let data = fs.readFileSync("./src/api_key.json");
              let jsonData = JSON.parse(data);
              if (
                jsonData.digiflazz.usernamekey === key_1 &&
                jsonData.digiflazz.productionkey === key_2
              ) {
                m.reply("```Data yang sama telah dimasukkan```");
              } else {
                jsonData.digiflazz = digiflazz;
                fs.writeFileSync(
                  "./src/api_key.json",
                  JSON.stringify(jsonData, null, 2)
                );
                let message = "```Berhasil Update Api Digi```";
                let buttons = [
                  {
                    buttonId: prefix + `cekapi`,
                    buttonText: { displayText: "Cek Api" },
                    type: 1,
                  },
                ];
                farhat.sendButtonText(
                  from,
                  buttons,
                  message,
                  "Cek api For view changes",
                  m
                );
              }
            } else if (provider_0 === "vip_reseller") {
              if (!key_1 && !key_2)
                return m.reply(
                  `${prefix + command} vip_reseller|resellerkey|reselleridkey`
                );
              let vip_reseller = {
                resellerkey: key_1,
                reselleridkey: key_2,
              };
              let data = fs.readFileSync("./src/api_key.json");
              let jsonData = JSON.parse(data);
              if (
                jsonData.vip_reseller.reselerkey === key_1 &&
                jsonData.vip_reseller.reselleridkey === key_2
              ) {
                m.reply("```Data yang sama telah dimasukkan```");
              } else {
                jsonData.vip_reseller = vip_reseller;
                fs.writeFileSync(
                  "./src/api_key.json",
                  JSON.stringify(jsonData, null, 2)
                );
                let message = "```Berhasil Update Api Vip```";
                let buttons = [
                  {
                    buttonId: prefix + `cekapi`,
                    buttonText: { displayText: "Cek Api" },
                    type: 1,
                  },
                ];
                farhat.sendButtonText(
                  from,
                  buttons,
                  message,
                  "Cek api For view changes",
                  m
                );
              }
            } else if (provider_0 === "apigames") {
              if (!key_1 && !key_2 && !key_3)
                return m.reply(
                  `${prefix + command} apigames|merchant|secret|sign`
                );
              let apigames = {
                merchantapigames: key_1,
                secretapigames: key_2,
                signatureapigames: key_3,
              };
              let data = fs.readFileSync("./src/api_key.json");
              let jsonData = JSON.parse(data);
              if (
                jsonData.apigames.merchantapigames === key_1 &&
                jsonData.apigames.secretapigames === key_2 &&
                jsonData.apigames.signatureapigames === key_3
              ) {
                m.reply("```Data yang sama telah dimasukkan```");
              } else {
                jsonData.apigames = apigames;
                fs.writeFileSync(
                  "./src/api_key.json",
                  JSON.stringify(jsonData, null, 2)
                );
                let message = "```Berhasil Update Api Games```";
                let buttons = [
                  {
                    buttonId: prefix + `cekapi`,
                    buttonText: { displayText: "Cek Api" },
                    type: 1,
                  },
                ];
                farhat.sendButtonText(
                  from,
                  buttons,
                  message,
                  "Retart For Apply Changes",
                  m
                );
              }
            } else {
              m.reply("```Provider Tidak Di Temukan```");
            }
          }
          break;
        case "addowner":
          {
            if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`;
            if (!isCreator) throw mess.owner;
            let own = text.replace(/[^0-9]/g, "");
            let own_ = [];
            if (fs.existsSync("./src/owner.json")) {
              own_ = JSON.parse(fs.readFileSync("./src/owner.json"));
            }
            if (own_.includes(own)) {
              m.reply("*_Nomor Telah Terdaftar Sebelumnya_*");
            } else {
              owner_database.push(own);
              fs.writeFileSync(
                "./src/owner.json",
                JSON.stringify(owner_database)
              );
              m.reply(`*_Berhasil Menambahkan ${own} Sebagai Owner_*`);
            }
          }
          break;
        case "delowner":
          {
            if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`;
            if (!isCreator) throw mess.owner;
            let own = text.replace(/[^0-9]/g, "");
            let own_ = JSON.parse(fs.readFileSync("./src/owner.json"));
            let ownp = own_.indexOf(own);
            if (ownp !== -1) {
              owner_database.splice(ownp, 1);
              fs.writeFileSync(
                "./src/owner.json",
                JSON.stringify(owner_database)
              );
              m.reply(`*_Berhasil Menghapus ${own} Sebagai Owner_*`);
            } else {
              m.reply("*_Nomor Tidak Di Temukan_*");
            }
          }
          break;
        case "ban":
          {
            if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`;
            if (!isCreator) throw mess.owner;
            let bnnd = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            let ban_ = [];
            if (fs.existsSync("./src/banned.json")) {
              ban_ = JSON.parse(fs.readFileSync("./src/banned.json"));
            }
            if (ban_.includes(bnnd)) {
              m.reply("*_Nomor Telah Terbanned_*");
            } else {
              ban.push(bnnd);
              fs.writeFileSync("./src/banned.json", JSON.stringify(ban));
              m.reply(bnnd);
            }
          }
          break;
        case "unban":
          {
            if (!text) throw `Example : ${prefix + command} 62xxxxxxxxxxx`;
            if (!isCreator) throw mess.owner;
            let bnnd = text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
            let ban_ = JSON.parse(fs.readFileSync("./src/banned.json"));
            let unp = ban_.indexOf(bnnd);
            if (unp !== -1) {
              ban.splice(unp, 1);
              fs.writeFileSync("./src/banned.json", JSON.stringify(ban));
              m.reply(bnnd);
            } else {
              m.reply("*_Nomor Tidak Ditemukan_*");
            }
          }
          break;
        case "listban":
        case "lisbanned":
          {
            if (!isCreator) throw mess.owner;
            teks = "*List Banned*\n\n";
            for (let medog of ban) {
              teks += `- ${medog}\n`;
            }
            teks += `\n*Total Banned : ${ban.length}*`;
            farhat.sendMessage(
              m.chat,
              { text: teks.trim() },
              "extendedTextMessage",
              { quoted: m, contextInfo: { mentionedJid: ban } }
            );
          }
          break;
        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // farhat.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(
                chalk.black(chalk.bgRed("[ ERROR ]")),
                color("command", "turquoise"),
                color(`${prefix}${command}`, "turquoise"),
                color("tidak tersedia", "turquoise")
              );
              farhat.sendMessage(m.chat, {
                text: "*_Command Tidak Tersedia Silahkan Ketik .menu Untuk Menampilkan Menu Yang Tersedia Terimakasih!..._*",
              });
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // farhat.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(
                chalk.black(chalk.bgRed("[ ERROR ]")),
                color("command", "turquoise"),
                color(`${prefix}${command}`, "turquoise"),
                color("tidak tersedia", "turquoise")
              );
              farhat.sendMessage(m.chat, {
                text: "*_Command Tidak Tersedia Silahkan Ketik .menu Untuk Menampilkan Menu Yang Tersedia Terimakasih!..._*",
              });
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
