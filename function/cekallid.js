const axios = require("axios");
const md5 = require('md5');

async function farhatcekallid(code_idgames, user_idgames, zone_idgames) {
    const apiId = 'z8iM3ahI';
    const apiKey = 'BA4PQPSh8Xkc1wGna8YOJ3iZLOYH0pv7wHTr2Pq6amC8WtvpVYeQtWRFhMO3S0ml';
    const secret = apiId + apiKey;
    const signaturevipcekid = md5(secret);

    try {
        const params = {
            key: apiKey,
            sign: signaturevipcekid,
            type: 'get-nickname',
            code: code_idgames,
            target: user_idgames,
            additional_target: zone_idgames
        };

        const response = await axios.post('https://vip-reseller.co.id/api/game-feature', new URLSearchParams(params));

        if (response.data) {
            return {
                status: 200,
                msg: response.data.data
            };
        } else {
            return {
                status: 404,
                msg: 'User Id or ZoneId Not Found'
            };
        }
    } catch (error) {
        return {
            status: 404,
            msg: 'User Id or ZoneId Not Found'
        };
    }
}
module.exports = { farhatcekallid };