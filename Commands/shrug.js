Command = require("../BaseClasses/Command");

module.exports = new Command(
    "shrug",
    [],
    2,
    "Shrugs.",
    async (message, args) => {
        message.reply("¯\\_(ツ)_/¯");
    }
);