Command = require('../BaseClasses/Command');
const profileModel = require("../Database/Models/profileSchema");

module.exports = new Command(
    "stats",
    [],
    5,
    "Displays the user's stats.",
    async (message, args) => {
        let profile;

        if (args.length === 1) {
            if (!message.mentions.users.first()) return message.reply("Please mention a user.");
            console.log('more than 1');
            profile = await profileModel.findOne({ userID: message.mentions.users.first().id });
        }
        else profile = await profileModel.findOne({ userID: message.author.id });
        console.log(profile);

        const embed = {
            color: 0x2F3136,
            fields: [
                { name: "Current XP", value: `${profile.xp} (${((Math.ceil(4.5 * profile.level) + 80) + 3 * (profile.level ** 3) - profile.xp)} left for next level)` },
                { name: "N-words", value: `${profile.softRs + profile.hardRs}, of which ${profile.hardRs} were hard-r's.`}
            ]
        }

        if (args.length === 1) embed.title = `Stats for ${ message.mentions.users.first().username } (Lv. ${profile.level})`;
        else embed.title = `Stats for ${ message.author.username } (Lv. ${profile.level})`;

        message.reply({ embeds: [embed] });
    }
)