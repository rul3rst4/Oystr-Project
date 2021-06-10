module.exports = class NotificationRequest {
    constructor(notification) {
        if (!this.#isValidObject(notification)) throw "Invalid notification.";

        this.evt = notification.evt;
        this.execution = notification.execution;
        this.owner = notification.owner;
        this.bot = notification.bot;

        this.events = {
            ExecutionFinishedWithError: "erros",
            ReportGenerated: "sucesso",
        };
    }

    #isValidObject(notification) {
        let valid = notification.hasOwnProperty("evt", "execution", "owner", "bot") && typeof notification == "object";

        if (!valid) return valid;

        if (!(typeof notification.evt == "string")) return false;
        if (!(typeof notification.execution == "string")) return false;
        if (!(typeof notification.owner == "number")) return false;
        if (!(typeof notification.bot == "string")) return false;

        return true;
    }

    getFormattedMessage() {
        return `[${this.evt} - ${this.bot}] a execução ${this.execution} terminou com ${this.events[this.evt]}.`;
    }
};
