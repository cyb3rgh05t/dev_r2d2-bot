const client = require("../index");
const mongoose = require("mongoose");

const commands = mongoose.Schema({
  GuildID: {
    type: String,
  },

  cmds: {
    type: Array,
  },
});

module.exports = mongoose.model("commands", commands);