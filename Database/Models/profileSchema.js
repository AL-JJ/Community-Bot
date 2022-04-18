const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: { type: String, require: true, unique: true },
    serverID: { type: String, require: true },
    xp: { type: Number },
    level: { type: Number },
    softRs: { type: Number },
    hardRs: { type: Number },
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;