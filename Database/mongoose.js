const mongoose = require('mongoose');

module.exports = {
    init: () => {

        mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            connectTimeoutMS: 10000,
            family: 4,
        }, () => {});
        mongoose.Promise = global.Promise;

        const conn = mongoose.connection;

        conn.on('connected', () => console.log('Database link established.'));

        conn.on('disconnected', () => console.log('Database link broken.'));

        conn.on('err', (err) => console.log('Database error:\n' + err));

    }
}