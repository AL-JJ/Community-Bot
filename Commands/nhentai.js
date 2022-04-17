Command = require('../BaseClasses/Command');
const { API } = require("nhentai-api");
const nHentai = new API();

module.exports = new Command(
    "nhentai",
    ["nh"],
    5,
    "Searches nHentai for a random book.",
    async (message, args) => {
        const embed = {
            footer: { text: "This was made possible by @Zekfad on Github" },
            fields: [],
        };

        let bookObject = {};
        let bookID;
        let pages;
        let cover;

        await nHentai.getRandomBook().then(book => {
            bookID = book.id;
            pages = book.pages.length;
            cover = nHentai.getImageURL(book.cover);

            bookObject = {
                bookID,
                pages,
                cover,
            };
        });

        embed.title = "Randomly Generated Book";
        embed.fields = {
            name: "Randomized Result:",
            value: `https://nhentai.net/g/${bookObject.bookID} (Pages: ${bookObject.pages})`,
        };
        embed.image = { url: bookObject.cover };

        message.reply({ embeds: [embed] });
    }
);