Command = require("../BaseClasses/Command");

module.exports = new Command(
    "avatar",
    ["a", "av"],
    2,
    "Displays the tagged user's avatar.",
    async (message, args) => {
        if (args.length > 1) return message.reply("You can't mention that many people.");

        const embed = {
            color: 0x2F3136,
            description: "Isn't it just beautiful?",
        };

        if (args.length === 1) {

            const mentionedUser = message.mentions.users.first();
            if (!mentionedUser) return;

            embed.title = `${mentionedUser.username}'s Profile Picture`;
            embed.image = {
                url: mentionedUser.displayAvatarURL({ dynamic: true, size: 256 })
            }
        }
        else {

            embed.title = `${ message.author.username}'s Profile Picture`;
            embed.image = {
                url: message.author.displayAvatarURL({ dynamic: true, size: 256 })
            }
        }

        message.reply({ embeds: [embed] });
    }
);