const axios = require("axios");

const url_coda = "https://order-sg.codashop.com/initPayment.action";
const headers_coda = { "Content-Type": "application/json" };
const method_coda = "POST";

async function getUsernamerMl(userId, zoneid) {
  try {
    const config = {
      method: method_coda,
      url: url_coda,
      headers: headers_coda,
      data: {
        "voucherPricePoint.id": "395917",
        "voucherPricePoint.price": "30581.0",
        "voucherPricePoint.variablePrice": "0",
        n: "3/19/2024-2056",
        email: "",
        userVariablePrice: "0",
        "order.data.profile":
          "eyJuYW1lIjoiICIsImRhdGVvZmJpcnRoIjoiIiwiaWRfbm8iOiIifQ==",
        "user.userId": userId,
        "user.zoneId": zoneid,
        msisdn: "",
        voucherTypeName: "MOBILE_LEGENDS",
        voucherTypeId: "5",
        gvtId: "19",
        shopLang: "id_ID",
        checkoutId: "d241f7fa-48dd-4729-900e-51c2bc127df6",
        affiliateTrackingId: "",
        impactClickId: "",
        anonymousId: "",
      },
    };

    const response = await axios(config);
    const usernamenya = response.data.confirmationFields.username;
    return usernamenya;
  } catch (err) {
    console.log(err);
    return "User Id Tidak Ditemukan";
  }
}
async function getUserFreeFire(user_id) {
  try {
    const config = {
      method: method_coda,
      url: url_coda,
      headers: headers_coda,
      data: {
        "voucherPricePoint.id": "8050",
        "voucherPricePoint.price": "1000.0",
        "voucherPricePoint.variablePrice": "0",
        n: "3/27/2024-1923",
        email: "",
        userVariablePrice: "0",
        "order.data.profile":
          "eyJuYW1lIjoiICIsImRhdGVvZmJpcnRoIjoiIiwiaWRfbm8iOiIifQ==",
        "user.userId": user_id,
        "user.zoneId": "",
        msisdn: "",
        voucherTypeName: "FREEFIRE",
        voucherTypeId: "17",
        gvtId: "33",
        shopLang: "id_ID",
        checkoutId: "718d25eb-4c28-468e-8cf9-cdac1e472b90",
        affiliateTrackingId: "",
        impactClickId: "",
        anonymousId: "",
      },
    };

    const response = await axios(config)
    const usernamenya = response.data["confirmationFields"]["roles"][0]["role"];
    return usernamenya;
  } catch (err) {
    console.log(err);
    return "User Id Tidak Ditemukan";
  }
}

async function getUserGenshin(user_id, zoneId) {
  try {
    const config = {
      method: method_coda,
      url: url_coda,
      headers: headers_coda,
      data: {
        "voucherPricePoint.id": "116054",
        "voucherPricePoint.price": "16500.0",
        "voucherPricePoint.variablePrice": "0",
        n: "3/27/2024-1945",
        email: "",
        userVariablePrice: "0",
        "order.data.profile":
          "eyJuYW1lIjoiICIsImRhdGVvZmJpcnRoIjoiIiwiaWRfbm8iOiIifQ==",
        "user.userId": user_id,
        "user.zoneId": zoneId,
        msisdn: "",
        voucherTypeName: "GENSHIN_IMPACT",
        voucherTypeId: "149",
        gvtId: "183",
        shopLang: "id_ID",
        checkoutId: "665a14f8-09dd-4c8f-9a9a-44ef45495cf1",
        affiliateTrackingId: "",
        impactClickId: "",
        anonymousId: "",
      },
    };
    const response = await axios(config);
    const usernamenya = response.data.confirmationFields.username;
    return usernamenya;
  } catch (err) {
    console.log(err);
    return "User Id Tidak Ditemukan";
  }
}

async function getUserValo(user_id) {
  try {
    const config = {
      method: method_coda,
      url: url_coda,
      headers: headers_coda,
      data: {
        "voucherPricePoint.id": "115691",
        "voucherPricePoint.price": "15000.0",
        "voucherPricePoint.variablePrice": "0",
        n: "3/27/2024-1949",
        email: "",
        userVariablePrice: "0",
        "order.data.profile":
          "eyJuYW1lIjoiICIsImRhdGVvZmJpcnRoIjoiIiwiaWRfbm8iOiIifQ==",
        "user.userId": user_id,
        "user.zoneId": "",
        msisdn: "",
        voucherTypeName: "VALORANT",
        voucherTypeId: "109",
        gvtId: "139",
        shopLang: "id_ID",
        checkoutId: "10057cba-d067-4c16-9a40-3d14bb9d05ce",
        affiliateTrackingId: "",
        impactClickId: "",
        anonymousId: "",
      },
    };
    const response = await axios(config);
    const usernamenya = response.data.user.userId;
    return usernamenya;
  } catch (err) {
    console.log(err);
    return "User Id Tidak Ditemukan";
  }
}
module.exports = {
  getUsernamerMl,
  getUserFreeFire,
  getUserGenshin,
  getUserValo,
};
