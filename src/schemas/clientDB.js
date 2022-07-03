const mongoose = require("mongoose");

// Generate Premium Code
const client = mongoose.Schema({
  Client: {
    type: mongoose.SchemaTypes.Boolean,
    default: null,
  },

  Memory: {
    type: mongoose.SchemaTypes.Array,
    default: null,
  },
});

module.exports = mongoose.model("client", client);