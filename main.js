const express = require("express");
require("dotenv").config();
const app = express();
const WebHookHandler = require("./WebHookHandler");
const NotificationRequest = require("./NotificationRequest");

app.use(express.json());
const port = process.env.PORT;

app.post("/", async (req, res) => {
    console.log(req.body);

    let newNotification, message;
    try {
        newNotification = new NotificationRequest(req.body);
        message = newNotification.getFormattedMessage();
    } catch (err) {
        console.log(err);
        return res.status(400).send("Invalid request body.");
    }

    try {
        let webHookResponse = await WebHookHandler.sendMessage(message);
        if (webHookResponse.status >= 200 && webHookResponse.status <= 202) {
            console.log(message);
        } else {
            throw "Unknown error.";
        }
    } catch (err) {
        console.log(`Error sending message to webhook: ${err}`);
        return res.status(500).send(`WebHook unavailable (${err.response.status}). Try again later.`);
    }

    return res.status(200).send("Notification accepted.");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
