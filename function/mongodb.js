const fs = require("fs");
const { MongoClient } = require("mongodb");

const url = JSON.parse(fs.readFileSync("./src/api_key.json")).mongodb
  .url_mongodb;
const client = new MongoClient(url);
const dbName = "api-callback";

async function connectToMongo(unique_code, amount) {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("api-callbacks");
    await collection.insertMany([
      { unique_code: unique_code, amount: amount, status: "Pending" }
    ]);
  } finally {
    await client.close(); // Menutup koneksi menggunakan client
  }
}
module.exports = { connectToMongo };
