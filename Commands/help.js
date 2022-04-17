const {GetCommands, CommandValidator} = require("../handlers");
Command = require("../BaseClasses/Command");

module.exports = new Command(
    "help",
    ["h"],
    2,
    "Shows a list of commands.",
    (message, args) => {

        const embed = {
            color: '0x36393F',
            title: "Help!",
            fields: [],
            footer: { text: `Tip: use ${process.env.PREFIX}help <command name> for more information.`},
        };

        if (args.length === 1) {
            const { command, valid } = CommandValidator(args[0], GetCommands());

            if (valid) {
                embed.description = `Tooltip for command **${command.name}**.`;
                embed.fields.push({
                    name: `${command.name} (${command.aliases})`,
                    value: command.description + ` (${command.cooldown}s cooldown)`,
                });
            } else message.reply(`Please enter an existing command (${process.env.PREFIX}help might help you out).`)
        } else {
            const commands = GetCommands();

            embed.description = "A list of all commands.";
            commands.forEach(commandName => {

                const command = require(`./${commandName}`);

                embed.fields.push({
                    name: command.name,
                    value: command.description,
                });
            });

        }
        message.reply({ embeds: [embed] });
    }
)