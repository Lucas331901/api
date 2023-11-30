const mongoose = require('mongoose');

const TelephoneSchema = mongoose.Schema({
  numero: { type: String },
  ddd: { type: String },
});

module.exports = TelephoneSchema;