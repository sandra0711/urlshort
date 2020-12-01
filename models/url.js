const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const urlSchema = new Schema({
  urlLong: String,
  urlShort: String,
  count: Number,

});

const Url = mongoose.model('Url', urlSchema);

module.exports = model("Url", urlSchema);
