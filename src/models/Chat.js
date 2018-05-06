const mongoose = require('mongoose');
const { Schema } = mongoose; // Importamos un Schema de MongoDB (mongoose).

const ChatSchema = new Schema({
  nick: String,
  msg: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Schema reutilizable.
module.exports = mongoose.model('Chat', ChatSchema);
