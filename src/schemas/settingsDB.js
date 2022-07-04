const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../config/.env`)});
const { Schema, model } = require("mongoose");

const schema = new Schema({
  GuildID: {
    type: String,
  },
  Prefix: {
    type: String,
    default: process.env.PREFIX,
  },
});

module.exports = model("guild_settings", schema);