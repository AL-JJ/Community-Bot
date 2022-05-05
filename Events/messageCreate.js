const { Collection } = require('discord.js');

const { CommandValidator, GetCommands } = require("../handlers");
const ClientEvent = require('../BaseClasses/Event');
const profileModel = require('../Database/Models/profileSchema');

const commandCooldowns = new Map();
const xpCooldowns = new Map();

module.exports = new ClientEvent("messageCreate", async (message) => {
    if (message.author.bot) return;

    // Instantiate new user in db
    let profile;

    try {
        profile = await profileModel.findOne({ userID: message.author.id });
        if (!profile) {
            let userProfile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                xp: 0,
                level: 0,
                softRs: 0,
                hardRs: 0,
            });
            userProfile.save();
            profile = userProfile;
        }
    } catch (err) {
        console.log(err);
    }

    // Adds a pseudo-random amount of XP to the user
    const levelUpReq = (Math.ceil(4.5 * profile.level) + 80) + 3 * (profile.level ** 3);
    const randomXP = (Math.floor(Math.random() * 9.3) + 10) * 2;
    let mayGainXP = true;

    // Cooldown Enforcer
    if (!xpCooldowns.has("xpBlock")) {
        xpCooldowns.set("xpBlock", new Collection());
    }

    let currentTime = Date.now();
    const xpTimestamps = xpCooldowns.get("xpBlock");
    const xpCooldown = 45000;

    if (xpTimestamps.has(message.author.id)) {
        const expires = xpTimestamps.get(message.author.id) + xpCooldown;

        if (currentTime < expires) mayGainXP = false;
    }


    if (mayGainXP) {
        xpTimestamps.set(message.author.id, currentTime);
        await profileModel.findOneAndUpdate({ userID: message.author.id },
            {
                $inc: {
                    xp: randomXP,
                }
            });
    }

    // Add a level upon reaching enough XP
    if (profile.xp > levelUpReq) {
        await profileModel.findOneAndUpdate({userID: message.author.id},
            {
                $inc: {
                    level: 1,
                },
                $set: {
                    xp: 0,
                }
            });
        profile = await profileModel.findOne({ userID: message.author.id });
        message.channel.send(`<@${message.author.id}> has reached level ${profile.level}!`);
    }


    // Adds 1 to the N-word counter
    if (message.content.toLowerCase().includes('nigga')){
        const count = (message.content.toLowerCase().match(/nigga/g) || []).length;
        await profileModel.findOneAndUpdate({ userID: message.author.id },
            {
                $inc: {
                    softRs: count,
                }
        });
    } else if (message.content.toLowerCase().includes('nigger')){
        const count = (message.content.toLowerCase().match(/nigger/g) || []).length;
        await profileModel.findOneAndUpdate({ userID: message.author.id },
            {
                $inc: {
                    hardRs: count,
                }
        });
    } else if (message.content.toLowerCase().includes('neger')){
        const count = (message.content.toLowerCase().match(/neger/g) || []).length;
        await profileModel.findOneAndUpdate({ userID: message.author.id },
            {
                $inc: {
                    hardRs: count,
                }
        });
    }

    // Command Handler
    if (!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const { command, valid } = CommandValidator(commandName, GetCommands());

    if (valid){

        // Cooldown Enforcer
        if (!commandCooldowns.has(command.name)) {
            commandCooldowns.set(command.name, new Collection());
        }

        currentTime = Date.now();
        const commandTimestamps = commandCooldowns.get(command.name);
        const commandCooldown = (command.cooldown) * 1000;

        if (commandTimestamps.has(message.author.id)) {
            const expires = commandTimestamps.get(message.author.id) + commandCooldown;

            if (currentTime < expires) {
                const timeLeft = (expires - currentTime) / 1000;

                return message.reply(`Too fast! Please wait for ${timeLeft.toFixed(1)} more seconds.`);
            }
        }

        commandTimestamps.set(message.author.id, currentTime);

        command.Callback(message, args);
    }
    else message.reply(`Please use an actual command (${process.env.PREFIX}help might help you out).`);
});