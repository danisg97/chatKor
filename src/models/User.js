const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  user: String,
  password: String,
  role: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
