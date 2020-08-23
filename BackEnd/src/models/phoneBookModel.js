const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhoneBook = new Schema({
  name: String,
  mobileNumber: String,
});

module.exports = mongoose.model("phoneBook", PhoneBook);
