const profileModel = require('../Database/Models/profileSchema');
const ClientEvent = require('../BaseClasses/Event');

module.exports = new ClientEvent("guildMemberAdd", async member => {
    let userProfile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        xp: 0,
        level: 0,
        softRs: 0,
        hardRs: 0,
    });
    userProfile.save();
});