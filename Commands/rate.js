Command = require('../BaseClasses/Command');

module.exports = new Command(
    'rate',
    [],
    3,
    "Replies with 1-10 under the message.",
    async (message, args) => {

        await message.react('0️⃣');
        await message.react('1️⃣');
        await message.react('2️⃣');
        await message.react('3️⃣');
        await message.react('4️⃣');
        await message.react('5️⃣');
        await message.react('6️⃣');
        await message.react('7️⃣');
        await message.react('8️⃣');
        await message.react('9️⃣');
        await message.react('🔟');
    }
)