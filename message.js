let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MessageSchema = new Schema({
  name: String,
  message: String,
});

let Message = mongoose.model('Message', MessageSchema);

module.exports = Message;