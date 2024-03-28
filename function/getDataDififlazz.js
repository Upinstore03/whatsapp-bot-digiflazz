const fs = require("fs");
const axios = require("axios");
const crypto = require("crypto");

const usernamekey = JSON.parse(fs.readFileSync("./src/api_key.json")).digiflazz
  .usernamekey;
const productionkey = JSON.parse(fs.readFileSync("./src/api_key.json"))
  .digiflazz.productionkey;

async function fetchDataAndUpdate(rate) {
  try {
    // Data default jika file tidak ditemukan atau tidak dapat dibaca
    const defaultData = [];

    // Membaca data yang sudah ada dari file
    let existingData;
    try {
      existingData = JSON.parse(
        fs.readFileSync("./src/database/digiflazz.json")
      );
    } catch (error) {
      console.log("Data file not found or invalid, using default data.");
      existingData = defaultData;
    }

    // Konfigurasi untuk mengambil data dari Digiflazz
    const digiuser = usernamekey;
    const digiapi = productionkey;
    const codeunGames = "pricelist";
    const hashounGames = crypto
      .createHash("md5")
      .update(digiuser + digiapi + codeunGames)
      .digest("hex");

    const config = {
      method: "POST",
      url: "https://api.digiflazz.com/v1/price-list",
      data: {
        cmd: "prepaid",
        username: digiuser,
        sign: hashounGames,
      },
    };

    // Mengambil data dari Digiflazz
    const response = await axios(config);
    const data = response.data.data;

    // Filter data hanya untuk kategori "Games"
    const gamesData = data.filter((entry) => entry.category === "Games");

    // Memeriksa apakah ada pembaruan pada data baru
    const isUpdated =
      JSON.stringify(existingData) !== JSON.stringify(gamesData);

    if (isUpdated) {
      // Memperbarui product price dengan menambahkan persentase dari rate
      const updatedGamesData = gamesData.map((entry) => ({
        ...entry,
        product_price: entry.product_price + (entry.product_price * rate) / 100,
      }));

      // Simpan data yang diperoleh ke dalam file
      fs.writeFileSync(
        "./src/database/digiflazz.json",
        JSON.stringify(updatedGamesData)
      );
      console.log("Data Games telah diperbarui.");
      return "Data Games telah diperbarui.";
    } else {
      console.log("Tidak ada pembaruan yang diperlukan untuk data Games.");
      return "Tidak ada pembaruan yang diperlukan untuk data Games.";
    }
  } catch (error) {
    return "Gagal: " + error.message;
  }
}
module.exports = { fetchDataAndUpdate };
