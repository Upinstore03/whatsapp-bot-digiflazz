const fs = require("fs");
const axios = require("axios");
const crypto = require("crypto");
const api_paydisini = JSON.parse(fs.readFileSync("./src/api_key.json"))
  .paydisini.apikeypaydisini;
const url_paydisini = JSON.parse(fs.readFileSync("./src/api_key.json"))
  .paydisini.url_paydisini;

async function orderPaydisini(price, code_unique) {
  try {
    const sign = crypto
      .createHash("md5")
      .update(
        api_paydisini + code_unique + "11" + price + "1800" + "NewTransaction"
      )
      .digest("hex");
    const config = {
      method: "POST",
      url: url_paydisini,
      data: {
        key: api_paydisini,
        request: "new",
        unique_code: code_unique,
        service: "11",
        amount: price,
        note: "Gada",
        valid_time: "1800",
        type_fee: "1",
        callback_count: "2",
        signature: sign,
      },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    };

    // Menjalankan panggilan Axios
    const response = await axios(config);
    const respaydisini = response.data.data.qrcode_url;
    // Mengembalikan data dari respons
    return respaydisini;
  } catch (error) {
    console.log("Gagal:", error.message);
    throw error; // Melanjutkan penanganan kesalahan ke tingkat yang lebih tinggi
  }
}
module.exports = { orderPaydisini };
