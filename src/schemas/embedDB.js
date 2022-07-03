const mongoose = require("mongoose");

const embed = mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },
  channel: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },
  message: {
    type: mongoose.SchemaTypes.String,
    default: null,
  },
});

module.exports = mongoose.model("embed", embed);