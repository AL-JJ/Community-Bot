const { SplitMessage } = require("../functions");
const { CommandValidator, GetCommands } = require("../handlers");
const ClientEvent = require('../BaseClasses/Event');

module.exports = new ClientEvent("messageCreate", (message) => {
    if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;
    let { commandName, args } = SplitMessage(message.content);

    const { command, valid} = CommandValidator(commandName, GetCommands());
    if (valid) command.Callback(message, args);
    else message.reply(`Please use an actual command (${process.env.PREFIX}help might help you out).`);
});