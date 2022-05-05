Command = require('../BaseClasses/Command');
const profileModel = require("../Database/Models/profileSchema");

module.exports = new Command(
    "top",
    ['t'],
    2,
    "Shows the top (x) people on the leaderboard, based on XP (Limit of 12 people at once)",
    async (message, args) => {
        let profiles;

        if (args.length === 1) {
            profiles = await profileModel.find();
        }
    }
)