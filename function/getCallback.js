const fs = require("fs");
const { MongoClient } = require("mongodb");

const url = JSON.parse(fs.readFileSync("./src/api_key.json")).mongodb
  .url_mongodb;
const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const client = new MongoClient(url);
const dbName = "api-callback";

async function getCallbackFromMongo(code_unique) {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("api-callbacks");
  try {
    let status = "Pending";
    while (status !== "Success") {
      const filteredDocs = await collection
        .find({ unique_code: code_unique })
        .toArray();

      for (const doc of filteredDocs) {
        const status = doc.status;
        console.log(status);

        if (status === "Canceled" || status === "Success") {
          await client.close(); // Menutup koneksi menggunakan client sebelum mengembalikan nilai
          return status;
        }
      }

      await sleep(5000);
    }
  } finally {
    await client.close();
  }
}
module.exports = { getCallbackFromMongo };
