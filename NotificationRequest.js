module.exports = class NotificationRequest {
    constructor(notification) {
        if (!this.#isValidObject(notification)) throw "Invalid notification.";

        this.evt = notification.evt;
        this.execution = notification.execution;
        this.owner = notification.owner;
        this.bot = notification.bot;
    }

    #isValidObject(notification) {
        return notification.hasOwnProperty("evt", "execution", "owner", "bot") && typeof notification == "object";
    }

    getFormattedMessage() {
        return `[${this.evt} - ${this.bot} a execução ${this.execution} terminou com sucesso.]`;
    }
};
