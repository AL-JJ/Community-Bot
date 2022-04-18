Command = require('../BaseClasses/Command');
const { API } = require("nhentai-api");
const nHentai = new API();

module.exports = new Command(
    "nhentai",
    ["nh"],
    5,
    "Searches nHentai for a random book. Can only be used in designated NSFW channels (Terms of Service).",
    async (message, args) => {
        if (!message.channel.nsfw) {
            message.reply("This channel isn't NSFW.");
            return;
        }

        const embed = {
            color: 0x2F3136,
            footer: { text: "This was made possible by the nhentai-api npm package, created by @Zekfad on Github." },
            fields: [],
        };

        let bookObject = {};

        await nHentai.getRandomBook().then(book => {
            let title = book.title;
            let bookID = book.id;
            let pages = book.pages.length;
            let cover = nHentai.getImageURL(book.cover);
            let uploadDate = book.uploaded;

            bookObject = {
                title,
                bookID,
                pages,
                cover,
                uploadDate,
            };
        });

        embed.title = "Randomly Generated Book";
        embed.fields = {
            name: `Result: ${bookObject.title.english}`,
            value: `https://nhentai.net/g/${bookObject.bookID} (${bookObject.pages} Pages)\nUploaded: **${bookObject.uploadDate.getDate()}-${bookObject.uploadDate.getMonth()}-${bookObject.uploadDate.getFullYear()}**`,
        };
        embed.image = { url: bookObject.cover };

        message.reply({ embeds: [embed] });
    }
);