const axios = require("axios").default;
require("dotenv").config();
const webHookAdress = process.env.WEBHOOK;

module.exports = class WebHookHandler {
    adress = webHookAdress;

    static async sendMessage(message) {
        return await axios.post(webHookAdress, { data: message });
    }
};
