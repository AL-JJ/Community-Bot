const Command = require('../BaseClasses/Command');
const profileModel = require("../Database/Models/profileSchema");

module.exports = new Command(
    "stats",
    [],
    5,
    "Displays the user's stats.",
    async (message, args) => {
        let profile;
        profile = await profileModel.findOne({ userID: message.author.id });
        console.log(profile);

        const embed = {
            color: 0x2F3136,
            title: `Stats for ${message.author.tag}`,
            fields: [
                { name: "Level", value: `${profile.level}` },
                { name: "Current XP", value: `${profile.xp} (${((Math.ceil(4.5 * profile.level) + 80) + 3 * (profile.level ** 3) - profile.xp)} left for next level)` },
                { name: "N-words", value: `${profile.softRs + profile.hardRs}, of which ${profile.hardRs} were hard-r's.`}
            ]
        }

        message.reply({ embeds: [embed] });
    }
)