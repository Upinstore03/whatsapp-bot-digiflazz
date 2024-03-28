const fs = require("fs");
const axios = require("axios");
const crypto = require("crypto");

const usernamekey = JSON.parse(fs.readFileSync("./src/api_key.json")).digiflazz
  .usernamekey;
const productionkey = JSON.parse(fs.readFileSync("./src/api_key.json"))
  .digiflazz.productionkey;

// Fungsi untuk mengatur jeda waktu
const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Fungsi untuk melakukan pesanan ke API Digiflazz
async function orderDigiflazz(skucode, customerno, refid) {
  const sign = crypto
    .createHash("md5")
    .update(usernamekey + productionkey + refid)
    .digest("hex");

  try {
    let currentStatus = "";
    let response;

    // Menunggu hingga status menjadi "Sukses" atau "Gagal"
    while (currentStatus !== "Sukses" && currentStatus !== "Gagal") {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const requestBody = {
        username: usernamekey,
        buyer_sku_code: skucode,
        customer_no: customerno,
        ref_id: refid,
        sign: sign,
      };

      response = await axios.post(
        "https://api.digiflazz.com/v1/transaction",
        requestBody,
        config
      );

      currentStatus = response.data.data.status; // Memperbarui status dari respons terbaru
      console.log(currentStatus);

      await sleep(5000);
    }

    // Mengembalikan data dari respons
    return response.data.data;
  } catch (error) {
    console.log("Gagal:", error.message);
    return { error: error.message }; // Mengembalikan pesan kesalahan jika terjadi kesalahan
  }
}

module.exports = { orderDigiflazz };
